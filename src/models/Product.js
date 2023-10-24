class Product {
  constructor(apiService) {
    this.apiService = apiService;
  }

  // GET all products
  async getAll(relations) {
    const options = {
      url: `${this.apiService.baseUrl}/${this.apiService.accountID}/Item.json`,
      method: "GET",
    };

    if (relations) options.url = options.url + `?load_relations=${relations}`;

    try {
      const response = await this.apiService.getAllData(options);
      return response;
    } catch (error) {
      return this.apiService.handleError("GET PRODUCT ERROR [getAll]:", error);
    }
  }

  // GET product by ID
  async getById(id, relations) {
    const options = {
      url: `${this.apiService.baseUrl}/${this.apiService.accountID}/Item/${id}.json`,
      method: "GET",
    };

    if (!id) return this.apiService.handleError("You need to provide a itemID");

    if (relations) options.url = options.url + `?load_relations=${relations}`;

    try {
      const response = await this.apiService.getAllData(options);
      return response;
    } catch (error) {
      return this.apiService.handleError("GET PRODUCT ERROR [getById]:", error);
    }
  }

  // GET products by Multiple ID's, pass an array of ids
  async getByMultipleId(ids, relations) {
    const options = {
      url: `${this.apiService.baseUrl}/${this.apiService.accountID}/Item.json`,
      method: "GET",
    };

    if (!ids) this.apiService.handleError("You need to provide itemID's");

    if (ids) options.url = options.url + `?itemID=IN,${ids}`;

    if (relations) options.url = options.url + `&load_relations=${relations}`;

    try {
      const response = await this.apiService.getAllData(options);
      return response;
    } catch (error) {
      return this.handleError("GET PRODUCT ERROR [getByMultipleId]:", error);
    }
  }

  // GET product by Vendor ID
  async getByVendorId(vendorId, relations) {
    const options = {
      url: `${this.apiService.baseUrl}/${this.apiService.accountID}/Item.json?defaultVendorID=${vendorId}`,
      method: "GET",
    };

    if (relations) options.url = options.url + `&load_relations=${relations}`;

    try {
      const response = await this.apiService.getAllData(options);
      return response;
    } catch (error) {
      return this.apiService.handleError("GET PRODUCT ERROR [getByVendorId]:", error);
    }
  }
}

export default Product;
