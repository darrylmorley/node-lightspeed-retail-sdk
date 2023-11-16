"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Manufacturer {
    constructor(apiService) {
        this.apiService = apiService;
    }
    // Get all manufacturers
    async getAll(relations) {
        const options = {
            url: `${this.apiService.baseUrl}/${this.apiService.accountID}/Manufacturer.json`,
            method: "GET",
        };
        if (relations)
            options.url += `?load_relations=${relations}`;
        try {
            const response = await this.apiService.getAllData(options);
            return response;
        }
        catch (error) {
            if (error instanceof Error) {
                return this.apiService.handleError("GET MANUFACTURER ERROR [getAll]:", error);
            }
            else {
                console.error("An unknown error occurred: ", error);
                throw error;
            }
        }
    }
    // Get manufacturer by ID
    async getById(id, relations) {
        const options = {
            url: `${this.apiService.baseUrl}/${this.apiService.accountID}/Manufacturer/${id}.json`,
            method: "GET",
        };
        if (!id) {
            const error = new Error("You need to provide a manufacturerID");
            return this.apiService.handleError("GET MANUFACTURER ERROR [getById]:", error);
        }
        if (relations)
            options.url = options.url + `?load_relations=${relations}`;
        try {
            const response = await this.apiService.getAllData(options);
            return response;
        }
        catch (error) {
            if (error instanceof Error) {
                return this.apiService.handleError("GET MANUFACTURER ERROR [getById]:", error);
            }
            else {
                console.error("An unknown error occurred: ", error);
                throw error;
            }
        }
    }
}
exports.default = Manufacturer;
