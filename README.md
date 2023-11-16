# node-lightspeed-retail-sdk

This SDK provides a convenient interface to interact with the Lightspeed Retail API using Node.js. It abstracts the complexities of API requests behind a simple and easy-to-use interface.

## Features

- **Token Management**: Automatic handling of fetching and refreshing access tokens.
- **Rate Limiting**: Intelligent handling of rate limits, delaying requests as needed to comply with Lightspeed's API rate limits.
- **Resource Models**: Includes models for various Lightspeed Retail resources such as Categories, Customers, Manufacturers, Products, Sales, and Vendors, simplifying interactions with the API.

## Installation

Install the SDK using npm:

```bash
npm install node-lightspeed-retail-sdk
```

## Usage
## Initialize the SDK

JavaScript
```bash
import LightspeedRetailSDK from 'node-lightspeed-retail-sdk';

const sdk = new LightspeedRetailSDK({
  clientID: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  refreshToken: 'YOUR_REFRESH_TOKEN',
  accountID: 'YOUR_ACCOUNT_ID'
});
```

TypeScript
```bash
import LightspeedRetailSDK from 'node-lightspeed-retail-sdk';
import { ILightspeedRetailSDKOptions } from 'node-lightspeed-retail-sdk/dist/types';

const config: ILightspeedRetailSDKOptions = {
  clientID: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  refreshToken: 'YOUR_REFRESH_TOKEN',
  accountID: 'YOUR_ACCOUNT_ID'
};

const sdk = new LightspeedRetailSDK(config);
```

## Examples
Fetching All Categories

```bash
import Category from 'node-lightspeed-retail-sdk/dist/models/Category';

const categoryModel = new Category(sdk);
const categories = await categoryModel.getAll();
console.log(categories);
```

Fetching a Specific Customer
```bash
import Customer from 'node-lightspeed-retail-sdk/dist/models/Customer';

const customerModel = new Customer(sdk);
const customer = await customerModel.getById('CUSTOMER_ID');
console.log(customer);
```

## Contributing

Contributions are welcome and appreciated. If you'd like to contribute, please:

- Fork the repository.
- Create a feature branch (git checkout -b feature/my-new-feature).
- Make your changes and commit (git commit -am 'Add some feature').
- Push to the branch (git push origin feature/my-new-feature).
- Create a new Pull Request.