import { IApiService } from "../types";
declare class Manufacturer {
    private apiService;
    constructor(apiService: IApiService);
    getAll(relations?: any): Promise<any>;
    getById(id: string, relations?: string): Promise<any>;
}
export default Manufacturer;
