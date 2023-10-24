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

    if (relations) options.url += `?load_relations=${relations}`;

    try {
      const response = await this.apiService.getAllData(options);
      return response;
    } catch (error) {
      return this.apiService.handleError("GET MANUFACTURER ERROR [getAll]:", error);
    }
  }

  // Get manufacturer by ID
  async getById(id, relations) {
    const options = {
      url: `${this.apiService.baseUrl}/${this.apiService.accountID}/Manufacturer/${id}.json`,
      method: "GET",
    };

    if (!id) return this.apiService.handleError("You need to provide a manufacturerID");

    if (relations) options.url = options.url + `?load_relations=${relations}`;

    try {
      const response = await this.apiService.getAllData(options);
      return response;
    } catch (error) {
      return this.apiService.handleError("GET MANUFACTURER ERROR [getById]:", error);
    }
  }
}

export default Manufacturer;
