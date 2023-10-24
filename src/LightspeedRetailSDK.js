import axios from "axios";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class LightspeedRetailSDK {
  constructor(opts) {
    const { clientID, clientSecret, refreshToken, accountID } = opts;

    this.clientID = clientID;
    this.clientSecret = clientSecret;
    this.refreshToken = refreshToken;
    this.accountID = accountID;
    this.baseUrl = "https://api.lightspeedapp.com/API/V3/Account";
    this.maxRetries = 3;
    this.lastResponse = null;
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  async fetchToken() {
    const body = {
      grant_type: "refresh_token",
      client_id: this.clientID,
      client_secret: this.clientSecret,
      refresh_token: this.refreshToken,
    };

    const response = await axios({
      url: "https://cloud.lightspeedapp.com/oauth/access_token.php",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(body),
    }).catch((error) => {
      console.error("There was an error [fetchToken]:", error);
      throw error;
    });

    const tokenData = await response.data;
    this.accessToken = tokenData.access_token;

    this.tokenExpiry = Date.now() + tokenData.expires_in * 1000;

    return this.accessToken;
  }

  async ensureToken() {
    // If we don't have a token or it's expired, fetch a new one
    if (!this.accessToken || Date.now() >= this.tokenExpiry) {
      await this.fetchToken();
    }
  }

  handleError(msg, err) {
    console.error(`${msg} - ${err}`);
    throw err;
  }

  setLastResponse = (response) => (this.lastResponse = response);

  getRequestUnits = (operation) => {
    const operationCosts = {
      GET: 1,
      POST: 10,
      PUT: 10,
    };

    return operationCosts[operation] || 10;
  };

  handleRateLimit = async (options) => {
    if (!this.lastResponse) return null;

    const { method } = options;
    const requestUnits = this.getRequestUnits(method);
    const rateHeader = this.lastResponse.headers["x-ls-api-bucket-level"];

    if (!rateHeader) return null;

    const [used, available] = rateHeader.split("/").map(Number); // Convert to numbers
    const availableUnits = available - used;

    let delay;
    if (availableUnits <= 0) {
      delay = 10000;
    } else if (requestUnits > availableUnits) {
      const dripRate = this.lastResponse.headers["x-ls-api-drip-rate"];
      const unitWait = requestUnits - availableUnits;
      delay = Math.ceil((unitWait / dripRate) * 1000);
    } else {
      return 0; // If there's enough available units, no delay is needed
    }

    await sleep(delay);
    return delay;
  };

  async getResource(options, retries = 0) {
    this.handleRateLimit(options);
    await this.ensureToken();

    options.headers = {
      Authorization: `Bearer ${this.accessToken}`,
      "Content-Type": "application/json",
    };

    try {
      const res = await axios(options);
      this.lastResponse = res;
      return {
        data: res.data,
        next: res.next,
        previous: res.previous,
      };
    } catch (err) {
      if (retries < this.maxRetries) {
        console.log(`Error: ${err}, retrying in 2 seconds...`);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return await this.getResource(options.url, retries + 1);
      } else {
        console.error(`Failed Request: `, err.message);
        throw err;
      }
    }
  }

  async getAllData(options) {
    let allData = [];
    while (options.url) {
      const { data } = await this.getResource(options);
      let next = data["@attributes"].next;
      let selectDataArray = Object.keys(data)[1];
      let selectedData = data[selectDataArray];
      allData = allData.concat(selectedData);
      options.url = next;
    }
    return allData;
  }
}

export default LightspeedRetailSDK;
