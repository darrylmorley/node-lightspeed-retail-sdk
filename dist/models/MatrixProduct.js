"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MatrixProduct {
    constructor(apiService) {
        this.apiService = apiService;
    }
    // Get all Matrix Items
    async getAll(relations) {
        const options = {
            url: `${this.apiService.baseUrl}/${this.apiService.accountID}/ItemMatrix.json`,
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
                return this.apiService.handleError("GET MATRIXPRODUCT ERROR [getAll]:", error);
            }
            else {
                console.error("An unknown error occurred: ", error);
                throw error;
            }
        }
    }
    // Get Matrix Item by ID
    async getById(id, relations) {
        const options = {
            url: `${this.apiService.baseUrl}/${this.apiService.accountID}/ItemMatrix/${id}.json`,
            method: "GET",
        };
        if (!id) {
            const error = new Error("You need to provide a categoryID");
            return this.apiService.handleError("GET MATRIXPRODUCT ERROR [getById]:", error);
        }
        if (relations)
            options.url = options.url + `?load_relations=${relations}`;
        try {
            const response = await this.apiService.getAllData(options);
            return response;
        }
        catch (error) {
            if (error instanceof Error) {
                return this.apiService.handleError("GET MATRIXPRODUCT ERROR [getById]:", error);
            }
            else {
                console.error("An unknown error occurred: ", error);
                throw error;
            }
        }
    }
}
exports.default = MatrixProduct;
