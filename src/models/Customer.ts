import { IResourceOptions, IApiService } from "../types";

class Customer {
  private apiService: IApiService;

  constructor(apiService: IApiService) {
    this.apiService = apiService;
  }

  // GET all customers
  async getAll(relations?: string): Promise<any> {
    const options: IResourceOptions = {
      url: `${this.apiService.baseUrl}/${this.apiService.accountID}/Customer.json`,
      method: "GET",
    };

    if (relations) options.url = options.url + `?load_relations=${relations}`;

    try {
      const response = await this.apiService.getAllData(options);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return this.apiService.handleError("GET CUSTOMER ERROR [getAll]:", error);
      } else {
        console.error("An unknown error occurred: ", error);
        throw error;
      }
    }
  }

  // GET customer by ID
  async getById(id: string, relations?: string) {
    const options = {
      url: `${this.apiService.baseUrl}/${this.apiService.accountID}/Customer/${id}.json`,
      method: "GET",
    };

    if (!id) {
      const error = new Error("You need to provide a customerID");
      return this.apiService.handleError("GET CUSTOMER ERROR [getById]:", error);
    }

    if (relations) options.url = options.url + `?load_relations=${relations}`;

    try {
      const response = await this.apiService.getAllData(options);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return this.apiService.handleError("GET CUSTOMER ERROR [getById]:", error);
      } else {
        console.error("An unknown error occurred: ", error);
        throw error;
      }
    }
  }
}

export default Customer;
