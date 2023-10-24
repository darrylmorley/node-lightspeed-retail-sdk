class Order {
  constructor(apiService) {
    this.apiService = apiService;
  }

  // Get all orders
  async getAll(relations) {
    const options = {
      url: `${this.apiService.baseUrl}/${this.apiService.accountID}/Order.json`,
      method: "GET",
    };

    if (relations) options.url = options.url + `?load_relations=${relations}`;

    try {
      const response = await this.apiService.getAllData(options);
      return response;
    } catch (error) {
      return this.apiService.handleError("GET ORDER ERROR [getAll]:", error);
    }
  }

  // Get order by ID
  async getById(id, relations) {
    const options = {
      url: `${this.apiService.baseUrl}/${this.apiService.accountID}/Order/${id}.json?load_relations=["Vendor", "OrderLines"]`,
      method: "GET",
    };

    if (!id) return this.apiService.handleError("You need to provide a vendorID");

    if (relations) options.url = options.url + `?load_relations=${relations}`;

    try {
      const response = await this.apiService.getAllData(options);
      return response;
    } catch (error) {
      return this.apiService.handleError("GET ORDER ERROR [getById]:", error);
    }
  }

  async getByVendorId(id, relations) {
    const options = {
      url: `${this.apiService.baseUrl}/${this.apiService.accountID}/Order.json?load_relations=["Vendor"]&vendorID=${id}`,
      method: "GET",
    };

    if (!id) return this.apiService.handleError("You need to provide a vendorID");

    if (relations) options.url = options.url + `?load_relations=${relations}`;

    try {
      const response = await this.apiService.getAllData(options);
      return response;
    } catch (error) {
      return this.apiService.handleError("GET ORDER ERROR [getByVendorId]:", error);
    }
  }
}

export default Order;
