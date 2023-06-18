"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Axios = void 0;
var axios_1 = __importDefault(require("axios"));
var Axios = /** @class */ (function () {
    function Axios() {
        var axiosInstance = axios_1.default.create();
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
    Axios.getInstance = function () {
        return this._instance || (this._instance = new this());
    };
    return Axios;
}());
exports.Axios = Axios;
//# sourceMappingURL=Axios.js.map