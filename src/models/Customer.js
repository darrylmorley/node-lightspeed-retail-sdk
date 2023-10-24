class Customer {
  constructor(apiService) {
    this.apiService = apiService;
  }

  // GET all customers
  async getAll(relations) {
    const options = {
      url: `${this.apiService.baseUrl}/${this.apiService.accountID}/Customer.json`,
      method: "GET",
    };

    if (relations) options.url = options.url + `?load_relations=${relations}`;

    try {
      const response = await this.apiService.getAllData(options);
      return response;
    } catch (error) {
      return this.apiService.handleError("GET CUSTOMER ERROR [getAll]:", error);
    }
  }

  // GET customer by ID
  async getById(id, relations) {
    const options = {
      url: `${this.apiService.baseUrl}/${this.apiService.accountID}/Customer/${id}.json`,
      method: "GET",
    };

    if (!id) return this.apiService.handleError("You need to provide a customerID");

    if (relations) options.url = options.url + `?load_relations=${relations}`;

    try {
      const response = await this.apiService.getAllData(options);
      return response;
    } catch (error) {
      return this.apiService.handleError("GET CUSTOMER ERROR [getById]:", error);
    }
  }
}

export default Customer;
