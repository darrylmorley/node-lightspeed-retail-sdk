"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Sale {
    constructor(apiService) {
        this.apiService = apiService;
    }
    getDayRange() {
        const formatDateToUTC = (date) => {
            const year = date.getUTCFullYear();
            const month = String(date.getUTCMonth() + 1).padStart(2, "0");
            const day = String(date.getUTCDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        };
        const startOfDay = new Date();
        startOfDay.setUTCHours(0, 0, 0, 0);
        const startTime = formatDateToUTC(startOfDay);
        const endOfDay = new Date();
        endOfDay.setUTCHours(23, 59, 59, 999);
        const endTime = formatDateToUTC(endOfDay);
        return { startTime, endTime };
    }
    async getAll(relations, startDate = this.getDayRange().startTime + "T00:00:00.000Z", endDate = this.getDayRange().endTime + "T23:59:59.999Z") {
        const options = {
            url: `${this.apiService.baseUrl}/${this.apiService.accountID}/Sale.json?timeStamp=%3E%3C%2C${startDate}%2C${endDate}&sort=timeStamp`,
            method: "GET",
        };
        if (relations)
            options.url = options.url + `&load_relations=${relations}`;
        try {
            const response = await this.apiService.getAllData(options);
            return response;
        }
        catch (error) {
            if (error instanceof Error) {
                return this.apiService.handleError("GET SALE ERROR [getAll]:", error);
            }
            else {
                console.error("An unknown error occurred: ", error);
                throw error;
            }
        }
    }
    async getById(id, relations) {
        const options = {
            url: `${this.apiService.baseUrl}/${this.apiService.accountID}/Sale/${id}.json`,
            method: "GET",
        };
        if (!id) {
            const error = new Error("You need to provide a saleID");
            return this.apiService.handleError("GET SALE ERROR [getById]:", error);
        }
        if (relations)
            options.url = options.url + `?load_relations=${relations}`;
        try {
            const response = await this.apiService.getAllData(options);
            return response;
        }
        catch (error) {
            if (error instanceof Error) {
                return this.apiService.handleError("GET SALE ERROR [getById]:", error);
            }
            else {
                console.error("An unknown error occurred: ", error);
                throw error;
            }
        }
    }
    async getByItemId(itemID, relations) {
        const options = {
            url: `${this.apiService.baseUrl}/${this.apiService.accountID}/SaleLine.json?itemID=${itemID}`,
            method: "GET",
        };
        if (relations)
            options.url = options.url + `&load_relations=${relations}`;
        try {
            const response = await this.apiService.getAllData(options);
            return response;
        }
        catch (error) {
            if (error instanceof Error) {
                return this.apiService.handleError("GET SALE ERROR [getByItemId]:", error);
            }
            else {
                console.error("An unknown error occurred: ", error);
                throw error;
            }
        }
    }
}
exports.default = Sale;
