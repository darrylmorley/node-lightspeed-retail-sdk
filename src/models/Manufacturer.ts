import { IResourceOptions, IApiService } from "../types";

class Manufacturer {
  private apiService: IApiService;

  constructor(apiService: IApiService) {
    this.apiService = apiService;
  }

  // Get all manufacturers
  async getAll(relations?: any): Promise<any> {
    const options: IResourceOptions = {
      url: `${this.apiService.baseUrl}/${this.apiService.accountID}/Manufacturer.json`,
      method: "GET",
    };

    if (relations) options.url += `?load_relations=${relations}`;

    try {
      const response = await this.apiService.getAllData(options);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return this.apiService.handleError("GET MANUFACTURER ERROR [getAll]:", error);
      } else {
        console.error("An unknown error occurred: ", error);
        throw error;
      }
    }
  }

  // Get manufacturer by ID
  async getById(id: string, relations?: string) {
    const options = {
      url: `${this.apiService.baseUrl}/${this.apiService.accountID}/Manufacturer/${id}.json`,
      method: "GET",
    };

    if (!id) {
      const error = new Error("You need to provide a manufacturerID");
      return this.apiService.handleError("GET MANUFACTURER ERROR [getById]:", error);
    }

    if (relations) options.url = options.url + `?load_relations=${relations}`;

    try {
      const response = await this.apiService.getAllData(options);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return this.apiService.handleError("GET MANUFACTURER ERROR [getById]:", error);
      } else {
        console.error("An unknown error occurred: ", error);
        throw error;
      }
    }
  }
}

export default Manufacturer;
