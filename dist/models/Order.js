"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Order {
    constructor(apiService) {
        this.apiService = apiService;
    }
    async getAll(relations) {
        const options = {
            url: `${this.apiService.baseUrl}/${this.apiService.accountID}/Order.json`,
            method: "GET",
        };
        if (relations)
            options.url = options.url + `?load_relations=${relations}`;
        try {
            const response = await this.apiService.getAllData(options);
            return response;
        }
        catch (error) {
            if (error instanceof Error) {
                return this.apiService.handleError("GET ORDER ERROR [getAll]:", error);
            }
            else {
                console.error("An unknown error occurred: ", error);
                throw error;
            }
        }
    }
    async getById(id, relations) {
        const options = {
            url: `${this.apiService.baseUrl}/${this.apiService.accountID}/Order/${id}.json`,
            method: "GET",
        };
        if (!id) {
            const error = new Error("You need to provide a orderID");
            return this.apiService.handleError("GET ORDER ERROR [getById]:", error);
        }
        if (relations)
            options.url = options.url + `?load_relations=${relations}`;
        try {
            const response = await this.apiService.getAllData(options);
            return response;
        }
        catch (error) {
            if (error instanceof Error) {
                return this.apiService.handleError("GET ORDER ERROR [getById]:", error);
            }
            else {
                console.error("An unknown error occurred: ", error);
                throw error;
            }
        }
    }
    async getByVendorId(id, relations) {
        const options = {
            url: `${this.apiService.baseUrl}/${this.apiService.accountID}/Order.json?load_relations=["Vendor"]&vendorID=${id}`,
            method: "GET",
        };
        if (!id) {
            const error = new Error("You need to provide a orderID");
            return this.apiService.handleError("GET ORDER ERROR [getById]:", error);
        }
        if (relations)
            options.url = options.url + `?load_relations=${relations}`;
        try {
            const response = await this.apiService.getAllData(options);
            return response;
        }
        catch (error) {
            if (error instanceof Error) {
                return this.apiService.handleError("GET ORDER ERROR [getByVendorId]:", error);
            }
            else {
                console.error("An unknown error occurred: ", error);
                throw error;
            }
        }
    }
}
exports.default = Order;
