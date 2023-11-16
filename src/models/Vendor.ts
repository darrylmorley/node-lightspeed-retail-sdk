import { IResourceOptions, IApiService } from "../types";

class Vendor {
  private apiService: IApiService;

  constructor(apiService: IApiService) {
    this.apiService = apiService;
  }

  // GET all vendors
  async getAll(relations?: string): Promise<any> {
    const options = {
      url: `${this.apiService.baseUrl}/${this.apiService.accountID}/Vendor.json`,
      method: "GET",
    };

    if (relations) options.url = options.url + `?load_relations=${relations}`;

    try {
      const response = await this.apiService.getAllData(options);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return this.apiService.handleError("GET VENDOR ERROR [getAll]:", error);
      } else {
        console.error("An unknown error occurred: ", error);
        throw error;
      }
    }
  }

  // GET vendor by ID
  async getById(id: string, relations?: string) {
    const options = {
      url: `${this.apiService.baseUrl}/${this.apiService.accountID}/Vendor/${id}.json`,
      method: "GET",
    };

    if (!id) {
      const error = new Error("You need to provide a vendorID");
      return this.apiService.handleError("GET VENDOR ERROR [getById]:", error);
    }

    if (relations) options.url = options.url + `?load_relations=${relations}`;

    try {
      const response = await this.apiService.getAllData(options);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return this.apiService.handleError("GET VENDOR ERROR [getById]:", error);
      } else {
        console.error("An unknown error occurred: ", error);
        throw error;
      }
    }
  }
}

export default Vendor;
