import { IResourceOptions, IApiService } from "../types";

class Category {
  private apiService: IApiService;

  constructor(apiService: IApiService) {
    this.apiService = apiService;
  }

  // Get all categories
  async getAll(relations?: string): Promise<any> {
    const options: IResourceOptions = {
      url: `${this.apiService.baseUrl}/${this.apiService.accountID}/Category.json`,
      method: "GET",
    };

    if (relations) options.url += `?load_relations=${relations}`;

    try {
      const response = await this.apiService.getAllData(options);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return this.apiService.handleError("GET CATEGORY ERROR [getAll]:", error);
      } else {
        console.error("An unknown error occurred: ", error);
        throw error;
      }
    }
  }

  // Get category by ID
  async getById(id: string, relations?: string): Promise<any> {
    const options = {
      url: `${this.apiService.baseUrl}/${this.apiService.accountID}/Category/${id}.json`,
      method: "GET",
    };

    if (!id) {
      const error = new Error("You need to provide a categoryID");
      return this.apiService.handleError("GET CATEGORY ERROR [getById]:", error);
    }

    if (relations) options.url = options.url + `?load_relations=${relations}`;

    try {
      const response = await this.apiService.getAllData(options);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return this.apiService.handleError("GET CATEGORY ERROR [getById]:", error);
      } else {
        console.error("An unknown error occurred: ", error);
        throw error;
      }
    }
  }
}

export default Category;
