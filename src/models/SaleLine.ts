import { IResourceOptions, IApiService } from "../types";

class SaleLine {
  private apiService: IApiService;

  constructor(apiService: IApiService) {
    this.apiService = apiService;
  }

  private getDayRange() {
    const formatDateToUTC = (date: Date) => {
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
      const day = String(date.getUTCDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    // Start of the day
    const startOfDay = new Date();
    startOfDay.setUTCHours(0, 0, 0, 0);
    const startTime = formatDateToUTC(startOfDay);

    // End of the day
    const endOfDay = new Date();
    endOfDay.setUTCHours(23, 59, 59, 999);
    const endTime = formatDateToUTC(endOfDay);

    return { startTime, endTime };
  }

  // Get all sales in date range, default today. Dates should be formatted as YYYY-MM-DD
  async getAll(
    relations?: string,
    startDate = this.getDayRange().startTime + "T00:00:00.000Z",
    endDate = this.getDayRange().endTime + "T23:59:59.999Z"
  ) {
    const options: IResourceOptions = {
      url: `${this.apiService.baseUrl}/${this.apiService.accountID}/SaleLine.json?timeStamp=%3E%3C%2C${startDate}%2C${endDate}&sort=timeStamp`,
      method: "GET",
    };

    if (relations) options.url = options.url + `&load_relations=${relations}`;

    try {
      const response = await this.apiService.getAllData(options);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return this.apiService.handleError("GET SALELINE ERROR [getAll]:", error);
      } else {
        console.error("An unknown error occurred: ", error);
        throw error;
      }
    }
  }

  // Get saleline by ID
  async getById(id: string, relations?: string) {
    const options = {
      url: `${this.apiService.baseUrl}/${this.apiService.accountID}/SaleLine/${id}.json`,
      method: "GET",
    };

    if (!id) {
      const error = new Error("You need to provide a saleID");
      return this.apiService.handleError("GET SALELINE ERROR [getById]:", error);
    }

    if (relations) options.url = options.url + `?load_relations=${relations}`;

    try {
      const response = await this.apiService.getAllData(options);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return this.apiService.handleError("GET SALELINE ERROR [getById]:", error);
      } else {
        console.error("An unknown error occurred: ", error);
        throw error;
      }
    }
  }

  async getByItemId(itemID: string, relations?: string) {
    const options = {
      url: `${this.apiService.baseUrl}/${this.apiService.accountID}/SaleLine.json?load_relations=["Item"]&itemID=${itemID}`,
      method: "GET",
    };

    if (relations) options.url = options.url + `&load_relations=${relations}`;

    try {
      const response = await this.apiService.getAllData(options);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return this.apiService.handleError("GET SALELINE ERROR [getByItemId]:", error);
      } else {
        console.error("An unknown error occurred: ", error);
        throw error;
      }
    }
  }

  async getByVendorId(vendorID: string, relations?: string) {
    const options = {
      url: `${this.apiService.baseUrl}/${this.apiService.accountID}/SaleLine.json?load_relations=["Item"]&Item.defaultVendorID=${vendorID}`,
      method: "GET",
    };

    if (relations) options.url = options.url + `&load_relations=${relations}`;

    try {
      const response = await this.apiService.getAllData(options);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return this.apiService.handleError("GET SALELINE ERROR [getByVendorId]:", error);
      } else {
        console.error("An unknown error occurred: ", error);
        throw error;
      }
    }
  }
}

export default SaleLine;
