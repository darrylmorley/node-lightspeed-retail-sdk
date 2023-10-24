class Category {
  constructor(apiService) {
    this.apiService = apiService;
  }

  // Get all categories
  async getAll(relations) {
    const options = {
      url: `${this.apiService.baseUrl}/${this.apiService.accountID}/Category.json`,
      method: "GET",
    };

    if (relations) options.url += `?load_relations=${relations}`;

    try {
      const response = await this.apiService.getAllData(options);
      return response;
    } catch (error) {
      return this.apiService.handleError("GET CATEGORY ERROR [getAll]:", error);
    }
  }

  // Get category by ID
  async getById(id, relations) {
    const options = {
      url: `${this.apiService.baseUrl}/${this.apiService.accountID}/Category/${id}.json`,
      method: "GET",
    };

    if (!id) return this.handleError("You need to provide a categoryID");

    if (relations) options.url = options.url + `?load_relations=${relations}`;

    try {
      const response = await this.apiService.getAllData(options);
      return response;
    } catch (error) {
      return this.apiService.handleError("GET CATEGORY ERROR [getById]:", error);
    }
  }
}

export default Category;
