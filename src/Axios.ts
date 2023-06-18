import axios from "axios";
import type { AxiosInstance } from "axios";

export class Axios {
    private static _instance: Axios;
    public instance: AxiosInstance;

    public static getInstance() {
        return this._instance || (this._instance = new this());
    }
    private constructor() {
        const axiosInstance = axios.create();
        // axiosInstance.interceptors.request.use(
        //     (config: InternalAxiosRequestConfig) => {
        //         const { headers: configHeader, ...restConfig } = config;
        //         return {
        //             withCredentials: true,
        //             headers: configHeader,
        //             ...restConfig,
        //         };
        //     },
        // );

        this.instance = axiosInstance;
    }
}
