import { IApiService } from "../types";
declare class Vendor {
    private apiService;
    constructor(apiService: IApiService);
    getAll(relations: string): Promise<any>;
    getById(id: string, relations?: string): Promise<any>;
}
export default Vendor;
