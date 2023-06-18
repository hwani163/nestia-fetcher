import type { AxiosInstance } from "axios";
export declare class Axios {
    private static _instance;
    instance: AxiosInstance;
    static getInstance(): Axios;
    private constructor();
}
