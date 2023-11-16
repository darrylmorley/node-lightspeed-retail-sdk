export interface ILightspeedRetailSDKOptions {
    clientID: string;
    clientSecret: string;
    refreshToken: string;
    accountID: string;
}
export interface ITokenData {
    access_token: string;
    expires_in: number;
}
export interface IResourceOptions {
    url: string;
    method: string;
    headers?: Record<string, string>;
    data?: any;
}
export interface IGetDataResponse {
    data: any;
    next?: string;
    previous?: string;
}
export declare enum HttpOperation {
    GET = "GET",
    POST = "POST",
    PUT = "PUT"
}
export interface IApiService {
    baseUrl: string;
    accountID: string;
    getAllData(options: IResourceOptions): Promise<any>;
    handleError(message: string, error: Error): void;
}
