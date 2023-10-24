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

    if (relations) options.url = options.url + `?load_relations=${relations}`;

    try {
      const response = await this.apiService.getAllData(options);
      return response;
    } catch (error) {
      return this.apiService.handleError("GET MATRIXPRODUCT ERROR [getAll]:", error);
    }
  }

  // Get Matrix Item by ID
  async getById(id, relations) {
    const options = {
      url: `${this.apiService.baseUrl}/${this.apiService.accountID}/ItemMatrix/${id}.json`,
      method: "GET",
    };

    if (!id) return this.apiService.handleError("You need to provide a matrixItemID");

    if (relations) options.url = options.url + `?load_relations=${relations}`;

    try {
      const response = await this.apiService.getAllData(options);
      return response;
    } catch (error) {
      return this.apiService.handleError("GET MATRIXPRODUCT ERROR [getById]:", error);
    }
  }
}

export default MatrixProduct;
