// import import2 from "import2";

import { IConnection } from "./IConnection";
// import { IEncryptionPassword } from "./IEncryptionPassword";
import { Primitive } from "./Primitive";

// import { AesPkcs5 } from "./AesPkcs5";
// import { HttpError } from "./HttpError";
// import { Singleton } from "./internal/Singleton";
import axios, {
  // AxiosHeaders,
  AxiosRequestConfig,
  // AxiosResponseHeaders,
} from "axios";
const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((config) => {
  const { headers: configHeader, ...restConfig } = config;
  return {
    headers: configHeader,
    ...restConfig,
  };
});
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => Promise.reject(error?.response.data.description)
);

/**
 * Fetcher, utility class for the [**Nestia**](https://github.com/samchon/nestia) fetch.
 *
 * `Fetcher` is a utility class providing the {@link Fetcher.fetch} functions who're being
 * used by all of the SDK libraries, interacting with the remote HTTP servers, who are
 * generated by the [**Nestia**](https://github.com/samchon/nestia).
 *
 * As this `Fetcher` be used only by the [**Nestia**](https://github.com/samchon/nestia)
 * generated SDK libraries, you don't need to handle this class directly. It may only be
 * appeared in the source codes of the [**Nestia**](https://github.com/samchon/nestia)
 * generated SDK libraries.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export class Fetcher {
  /**
   * Fetch function for the `GET` or `DELETE` methods.
   *
   * @param connection Connection information for the remote HTTP server
   * @param encrypted Whether the request/response body be encrypted or not
   * @param method Method of the HTTP request
   * @param path Path of the HTTP request
   * @return Response body data from the remote HTTP server
   */
  public static fetch<Output>(
    connection: IConnection,
    encrypted: Fetcher.IEncrypted,
    method: "GET" | "DELETE",
    path: string
  ): Promise<Primitive<Output>>;

  /**
   * Fetch function for the `POST`, `PUT` and `PATCH` methods.
   *
   * @param connection Connection information for the remote HTTP server
   * @param encrypted Whether the request/response body be encrypted or not
   * @param method Method of the HTTP request
   * @param path Path of the HTTP request
   * @param input Request body data for the HTTP request
   * @param stringify JSON string conversion function, default is the `JSON.stringify`
   * @return Response body data from the remote HTTP server
   */
  public static fetch<Input, Output>(
    connection: IConnection,
    encrypted: Fetcher.IEncrypted,
    method: "POST" | "PUT" | "PATCH",
    path: string,
    input: Input,
    stringify?: (input: Input) => string
  ): Promise<Primitive<Output>>;

  public static async fetch<Output>(
    connection: IConnection,
    // @ts-ignore
    encrypted: Fetcher.IEncrypted,
    method: "GET" | "DELETE" | "POST" | "PUT" | "PATCH",
    _path: string,
    input?: object,
    // @ts-ignore
    stringify?: (input: any) => string
  ): Promise<Primitive<Output>> {
    //----
    // REQUEST MESSSAGE
    //----
    // METHOD & HEADERS
    // console.log(encrypted);
    // console.log(stringify);
    let path = _path;
    if (_path[0] !== "/") path = "/" + _path;

    // const url: URL = new URL(`${connection.host}${path}`);

    const init: AxiosRequestConfig = {
      baseURL: connection.baseURL,
      url: path,
      method,
      headers: {
        ...connection.headers,
        "Content-Type": "application/json",
      },
    };
    // console.log(init);
    // throw new Error(JSON.stringify(init));

    // REQUEST BODY (WITH ENCRYPTION)
    if (input !== undefined) {
      init.data = input;
    }

    //----
    // RESPONSE MESSAGE
    //----
    // URL SPECIFICATION

    // DO FETCH
    const response = await axiosInstance(init);
    let body = response.data;
    if (!body) return undefined!;
    // response.headers;
    // CHECK THE STATUS CODE
    // if (response.status !== 200 && response.status !== 201) {
    //     throw new HttpError(method, path, response.status, body);
    // }

    //----
    // OUTPUT
    //----
    let ret: { __set_headers__: Record<string, any> } & Primitive<Output> =
      body as any;
    try {
      // PARSE RESPONSE BODY
      ret = ret as any;

      // FIND __SET_HEADERS__ FIELD
      if (
        ret.__set_headers__ !== undefined &&
        typeof ret.__set_headers__ === "object"
      ) {
        if (connection.headers === undefined) connection.headers = {};
        // @ts-ignore
        Object.assign(connection.headers, ret.__set_headers__);
      }
    } catch {}

    // RETURNS
    return ret;
  }
}

export namespace Fetcher {
  /**
   * Whether be encrypted or not.
   *
   * `Fetcher.IEncrypted` is a type of interface who represents whether the HTTP request
   * and response body must be encrypted or not.
   *
   * Like the {@link Fetcher} who are being used by all of the SDK libraries that are
   * generated by the [Nestia](https://github.com/samchon/nestia), this `IEncrypted`
   * interface would be used by the [Nestia](https://github.com/samchon/nestia) generated
   * SDK libaries.
   *
   * As this `Fetcher` be used only by the [**Nestia**](https://github.com/samchon/nestia)
   * generated SDK libraries, you don't need to handle this class directly. It may only be
   * appeared in the source codes of the [**Nestia**](https://github.com/samchon/nestia)
   * generated SDK libraries.
   */
  export interface IEncrypted {
    /**
     * Whether the request body be encrypted or not.
     */
    request?: boolean;

    /**
     * Whether the response body be encrypted or not.
     */
    response: boolean;
  }
}

// const polyfill = new Singleton(async (): Promise<typeof fetch> => {
//     if (
//         typeof global === "object" &&
//         typeof global.process === "object" &&
//         typeof global.process.versions === "object" &&
//         typeof global.process.versions.node !== undefined
//     ) {
//         if (global.fetch === undefined)
//             global.fetch = ((await import2("node-fetch")) as any).default;
//         return (global as any).fetch;
//     }
//     return window.fetch;
// });

// function is_disabled(
//     password: IEncryptionPassword,
//     headers: Singleton<Record<string, string>>,
//     body: string,
//     encoded: boolean,
// ): boolean {
//     if (password.disabled === undefined) return false;
//     if (typeof password.disabled === "function")
//         return password.disabled(
//             {
//                 headers: headers.get(),
//                 body,
//             },
//             encoded,
//         );
//     return password.disabled;
// }

// function headers_to_object(
//     headers: AxiosResponseHeaders,
// ): Record<string, string> {
//     const output: Record<string, string> = {};
//     headers.forEach((value, key) => (output[key] = value));
//     return output;
// }
