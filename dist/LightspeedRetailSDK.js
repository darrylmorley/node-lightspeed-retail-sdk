"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const types_1 = require("./types");
require('dotenv').config();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
class LightspeedRetailSDK {
    constructor(opts) {
        this.setLastResponse = (response) => (this.lastResponse = response);
        this.getRequestUnits = (operation) => {
            const operationCosts = {
                [types_1.HttpOperation.GET]: 1,
                [types_1.HttpOperation.POST]: 10,
                [types_1.HttpOperation.PUT]: 10,
            };
            return operationCosts[operation] || 10;
        };
        this.handleRateLimit = async (options) => {
            if (!this.lastResponse)
                return null;
            const { method } = options;
            const requestUnits = this.getRequestUnits(method);
            const rateHeader = this.lastResponse.headers["x-ls-api-bucket-level"];
            if (!rateHeader)
                return null;
            const [used, available] = rateHeader.split("/").map(Number);
            const availableUnits = available - used;
            let delay;
            if (availableUnits <= 0) {
                delay = 10000;
            }
            else if (requestUnits > availableUnits) {
                const dripRate = this.lastResponse.headers["x-ls-api-drip-rate"];
                const unitWait = requestUnits - availableUnits;
                delay = Math.ceil((unitWait / dripRate) * 1000);
            }
            else {
                return 0;
            }
            await sleep(delay);
            return delay;
        };
        const { clientID, clientSecret, refreshToken, accountID } = opts;
        this.clientID = clientID;
        this.clientSecret = clientSecret;
        this.refreshToken = refreshToken;
        this.accountID = accountID;
        this.baseUrl = "https://api.lightspeedapp.com/API/V3/Account";
        this.maxRetries = 3;
        this.lastResponse = null;
        this.accessToken = null;
        this.tokenExpiry = null;
    }
    async fetchToken() {
        const body = {
            grant_type: "refresh_token",
            client_id: this.clientID,
            client_secret: this.clientSecret,
            refresh_token: this.refreshToken,
        };
        const response = await (0, axios_1.default)({
            url: "https://cloud.lightspeedapp.com/oauth/access_token.php",
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(body),
        }).catch((error) => {
            console.error("There was an error [fetchToken]:", error);
            throw error;
        });
        const tokenData = await response.data;
        this.accessToken = tokenData.access_token;
        this.tokenExpiry = Date.now() + tokenData.expires_in * 1000;
        if (this.accessToken === null) {
            throw new Error("Access token is null");
        }
        return this.accessToken;
    }
    async ensureToken() {
        if (!this.accessToken || this.tokenExpiry === null || Date.now() >= this.tokenExpiry) {
            await this.fetchToken();
        }
    }
    handleError(msg, err) {
        console.error(`${msg} - ${err}`);
        throw err;
    }
    async getResource(options, retries = 0) {
        this.handleRateLimit(options);
        await this.ensureToken();
        options.headers = {
            Authorization: `Bearer ${this.accessToken}`,
            "Content-Type": "application/json",
        };
        try {
            const res = await (0, axios_1.default)(options);
            this.lastResponse = res;
            const responseData = res.data;
            return {
                data: responseData,
                next: responseData.next,
                previous: responseData.previous,
            };
        }
        catch (err) {
            if (retries < this.maxRetries && err instanceof Error) {
                console.log(`Error: ${err}, retrying in 2 seconds...`);
                await new Promise((resolve) => setTimeout(resolve, 2000));
                return await this.getResource({ ...options, url: options.url }, retries + 1);
            }
            else {
                console.error(`Failed Request: `, err);
                throw err;
            }
        }
    }
    async getAllData(options) {
        let allData = [];
        while (options.url) {
            const { data } = await this.getResource(options);
            let next = data["@attributes"].next;
            let selectDataArray = Object.keys(data)[1];
            let selectedData = data[selectDataArray];
            allData = allData.concat(selectedData);
            options.url = next;
        }
        return allData;
    }
}
exports.default = LightspeedRetailSDK;
