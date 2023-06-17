/**
 * HTTP Error.
 *
 * `HttpError` is a type of error class who've been thrown by the remote HTTP server.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class HttpError extends Error {
    readonly method: "GET" | "DELETE" | "POST" | "PUT" | "PATCH";
    readonly path: string;
    readonly status: number;
    /**
     * Initializer Constructor.
     *
     * @param method Method of the HTTP request.
     * @param path Path of the HTTP request.
     * @param status Status code from the remote HTTP server.
     * @param message Error message from the remote HTTP server.
     */
    constructor(method: "GET" | "DELETE" | "POST" | "PUT" | "PATCH", path: string, status: number, message: string);
}
