import axios from "axios";
import { ILightspeedRetailSDKOptions, HttpOperation, IResourceOptions } from "./types";
require('dotenv').config()

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

class LightspeedRetailSDK {
  private clientID: string;
  private clientSecret: string;
  private refreshToken: string;
  public accountID: string;
  public baseUrl: string;
  private maxRetries: number;
  private lastResponse: any;
  private accessToken: string | null;
  private tokenExpiry: number | null;

  constructor(opts: ILightspeedRetailSDKOptions) {
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

  async fetchToken(): Promise<string> {
    const body = {
      grant_type: "refresh_token",
      client_id: this.clientID,
      client_secret: this.clientSecret,
      refresh_token: this.refreshToken,
    };

    const response = await axios({
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
      throw new Error("Access token is null")
    }

    return this.accessToken;
  }

  async ensureToken(): Promise<void> {
    if (!this.accessToken || this.tokenExpiry === null || Date.now() >= this.tokenExpiry) {
      await this.fetchToken();
    }
  }

  handleError(msg: string, err: Error): void {
    console.error(`${msg} - ${err}`);
    throw err;
  }

  setLastResponse = (response: any): void => (this.lastResponse = response);

  getRequestUnits = (operation: HttpOperation): number => {
    const operationCosts = {
      [HttpOperation.GET]: 1,
      [HttpOperation.POST]: 10,
      [HttpOperation.PUT]: 10,
    };

    return operationCosts[operation] || 10;
  };

  handleRateLimit = async (options: IResourceOptions) => {
    if (!this.lastResponse) return null;

    const { method } = options;
    const requestUnits = this.getRequestUnits(method as HttpOperation);
    const rateHeader = this.lastResponse.headers["x-ls-api-bucket-level"];

    if (!rateHeader) return null;

    const [used, available] = rateHeader.split("/").map(Number); // Convert to numbers
    const availableUnits = available - used;

    let delay;
    if (availableUnits <= 0) {
      delay = 10000;
    } else if (requestUnits > availableUnits) {
      const dripRate = this.lastResponse.headers["x-ls-api-drip-rate"];
      const unitWait = requestUnits - availableUnits;
      delay = Math.ceil((unitWait / dripRate) * 1000);
    } else {
      return 0; // If there's enough available units, no delay is needed
    }

    await sleep(delay);
    return delay;
  };

  async getResource(options: IResourceOptions, retries = 0): Promise<any> {
    this.handleRateLimit(options);
    await this.ensureToken();

    options.headers = {
      Authorization: `Bearer ${this.accessToken}`,
      "Content-Type": "application/json",
    };

    try {
      const res = await axios(options);
      this.lastResponse = res;
      const responseData = res.data
      return {
        data: responseData,
        next: responseData.next,
        previous: responseData.previous,
      };
    } catch (err) {
      if (retries < this.maxRetries && err instanceof Error) {
        console.log(`Error: ${err}, retrying in 2 seconds...`);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return await this.getResource({ ...options, url: options.url }, retries + 1);
      } else {
        console.error(`Failed Request: `, err);
        throw err;
      }
    }
  }

  async getAllData(options: IResourceOptions): Promise<any> {
    let allData: any = [];
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

export default LightspeedRetailSDK;
