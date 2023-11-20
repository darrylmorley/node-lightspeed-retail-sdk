import { IApiService } from "../types";
declare class SaleLine {
    private apiService;
    constructor(apiService: IApiService);
    private getDayRange;
    getAll(relations?: string, startDate?: string, endDate?: string): Promise<any>;
    getById(id: string, relations?: string): Promise<any>;
    getByItemId(itemID: string, relations?: string): Promise<any>;
    getByVendorId(vendorID: string, relations?: string): Promise<any>;
}
export default SaleLine;
