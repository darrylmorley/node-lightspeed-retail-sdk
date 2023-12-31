import { IApiService } from "../types";
declare class Sale {
    private apiService;
    constructor(apiService: IApiService);
    private getDayRange;
    getAll(relations?: string, startDate?: string, endDate?: string): Promise<any>;
    getById(id: string, relations?: string): Promise<any>;
    getByItemId(itemID: string, relations?: string): Promise<any>;
}
export default Sale;
