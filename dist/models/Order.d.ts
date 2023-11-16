import { IApiService } from "../types";
declare class Order {
    private apiService;
    constructor(apiService: IApiService);
    getAll(relations?: string): Promise<any>;
    getById(id: string, relations?: string): Promise<any>;
    getByVendorId(id: string, relations: string): Promise<any>;
}
export default Order;
