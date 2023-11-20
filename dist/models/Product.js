"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
    constructor(apiService) {
        this.apiService = apiService;
    }
    async getAll(relations) {
        const options = {
            url: `${this.apiService.baseUrl}/${this.apiService.accountID}/Item.json`,
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
                return this.apiService.handleError("GET PRODUCT ERROR [getAll]:", error);
            }
            else {
                console.error("An unknown error occurred: ", error);
                throw error;
            }
        }
    }
    async getById(id, relations) {
        const options = {
            url: `${this.apiService.baseUrl}/${this.apiService.accountID}/Item/${id}.json`,
            method: "GET",
        };
        if (!id) {
            const error = new Error("You need to provide a itemID");
            return this.apiService.handleError("GET PRODUCT ERROR [getById]:", error);
        }
        if (relations)
            options.url = options.url + `?load_relations=${relations}`;
        try {
            const response = await this.apiService.getAllData(options);
            return response;
        }
        catch (error) {
            if (error instanceof Error) {
                return this.apiService.handleError("GET PRODUCT ERROR [getById]:", error);
            }
            else {
                console.error("An unknown error occurred: ", error);
                throw error;
            }
        }
    }
    async getByMultipleId(ids, relations) {
        const options = {
            url: `${this.apiService.baseUrl}/${this.apiService.accountID}/Item.json`,
            method: "GET",
        };
        if (!ids) {
            const error = new Error("You need to provide itemIDs");
            return this.apiService.handleError("GET PRODUCT ERROR [getById]:", error);
        }
        if (ids)
            options.url = options.url + `?itemID=IN,${ids}`;
        if (relations)
            options.url = options.url + `&load_relations=${relations}`;
        try {
            const response = await this.apiService.getAllData(options);
            return response;
        }
        catch (error) {
            if (error instanceof Error) {
                return this.apiService.handleError("GET PRODUCT ERROR [getByMultipleId]:", error);
            }
            else {
                console.error("An unknown error occurred: ", error);
                throw error;
            }
        }
    }
    async getByVendorId(vendorId, relations) {
        const options = {
            url: `${this.apiService.baseUrl}/${this.apiService.accountID}/Item.json?defaultVendorID=${vendorId}`,
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
                return this.apiService.handleError("GET PRODUCT ERROR [getByVendorId]:", error);
            }
            else {
                console.error("An unknown error occurred: ", error);
                throw error;
            }
        }
    }
}
exports.default = Product;
