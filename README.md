# node-lightspeed-retail-sdk

This SDK provides a convenient way to interact with the Lightspeed Retail API using Node.js. It abstracts the complexities of making requests behind a simple interface.

## Features

- Token Management: Automatically fetches and refreshes access tokens.
- Rate Limiting: Handles rate limits by delaying requests as needed.
- Models: Provides models for various resources like Categories, Customers, Manufacturers, Products, Sales, and Vendors.

## Installation

```bash
npm install node-lightspeed-retail-sdk
```

## Usage

First, initialize the SDK:

```bash
import LightspeedRetailSDK from 'path-to-sdk/LightspeedRetailSDK';

const sdk = new LightspeedRetailSDK({
  clientID: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  refreshToken: 'YOUR_REFRESH_TOKEN',
  accountID: 'YOUR_ACCOUNT_ID'
});
```

## Examples

Fetching All Categories

```bash
import Category from 'path-to-sdk/models/Category';

const categoryModel = new Category(sdk);
const categories = await categoryModel.getAll();
```

Fetching a Specific Customer

```bash
import Customer from 'path-to-sdk/models/Customer';

const customerModel = new Customer(sdk);
const customer = await customerModel.getById('CUSTOMER_ID');
```

## Contributing

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.
