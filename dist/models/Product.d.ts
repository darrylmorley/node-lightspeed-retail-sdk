import { IApiService } from "../types";
declare class Product {
    private apiService;
    constructor(apiService: IApiService);
    getAll(relations?: string): Promise<any>;
    getById(id: string, relations?: string): Promise<any>;
    getByMultipleId(ids: string, relations?: string): Promise<any>;
    getByVendorId(vendorId: string, relations?: string): Promise<any>;
}
export default Product;
