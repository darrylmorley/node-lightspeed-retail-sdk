import { IApiService } from "../types";
declare class Customer {
    private apiService;
    constructor(apiService: IApiService);
    getAll(relations?: string): Promise<any>;
    getById(id: string, relations?: string): Promise<any>;
}
export default Customer;
