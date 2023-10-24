class Vendor {
  constructor(apiService) {
    this.apiService = apiService;
  }

  // GET all vendors
  async getAll(relations) {
    const options = {
      url: `${this.apiService.baseUrl}/${this.apiService.accountID}/Vendor.json`,
      method: "GET",
    };

    if (relations) options.url = options.url + `?load_relations=${relations}`;

    try {
      const response = await this.apiService.getAllData(options);
      return response;
    } catch (error) {
      return this.apiService.handleError("GET VENDOR ERROR [getAll]:", error);
    }
  }

  // GET vendor by ID
  async getById(id, relations) {
    const options = {
      url: `${this.apiService.baseUrl}/${this.apiService.accountID}/Vendor/${id}.json`,
      method: "GET",
    };

    if (!id) return this.apiService.handleError("You need to provide a vendorID");

    if (relations) options.url = options.url + `?load_relations=${relations}`;

    try {
      const response = await this.apiService.getAllData(options);
      return response;
    } catch (error) {
      return this.apiService.handleError("GET VENDOR ERROR [getById]:", error);
    }
  }
}

export default Vendor;
