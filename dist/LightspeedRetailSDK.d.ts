import { ILightspeedRetailSDKOptions, HttpOperation, IResourceOptions } from "./types";
declare class LightspeedRetailSDK {
    private clientID;
    private clientSecret;
    private refreshToken;
    accountID: string;
    baseUrl: string;
    private maxRetries;
    private lastResponse;
    private accessToken;
    private tokenExpiry;
    constructor(opts: ILightspeedRetailSDKOptions);
    fetchToken(): Promise<string>;
    ensureToken(): Promise<void>;
    handleError(msg: string, err: Error): void;
    setLastResponse: (response: any) => void;
    getRequestUnits: (operation: HttpOperation) => number;
    handleRateLimit: (options: IResourceOptions) => Promise<number | null>;
    getResource(options: IResourceOptions, retries?: number): Promise<any>;
    getAllData(options: IResourceOptions): Promise<any>;
}
export default LightspeedRetailSDK;
