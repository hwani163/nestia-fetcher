"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
/**
 * HTTP Error.
 *
 * `HttpError` is a type of error class who've been thrown by the remote HTTP server.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
var HttpError = /** @class */ (function (_super) {
    __extends(HttpError, _super);
    /**
     * Initializer Constructor.
     *
     * @param method Method of the HTTP request.
     * @param path Path of the HTTP request.
     * @param status Status code from the remote HTTP server.
     * @param message Error message from the remote HTTP server.
     */
    function HttpError(method, path, status, message) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        _this.method = method;
        _this.path = path;
        _this.status = status;
        // INHERITANCE POLYFILL
        var proto = _newTarget.prototype;
        if (Object.setPrototypeOf)
            Object.setPrototypeOf(_this, proto);
        else
            _this.__proto__ = proto;
        return _this;
    }
    return HttpError;
}(Error));
exports.HttpError = HttpError;
//# sourceMappingURL=HttpError.js.map