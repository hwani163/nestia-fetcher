"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AesPkcs5 = void 0;
var crypto_js_1 = __importDefault(require("crypto-js"));
/**
 * Utility class for the AES-128/256 encryption.
 *
 *   - AES-128/256
 *   - CBC mode
 *   - PKCS#5 Padding
 *   - Base64 Encoding
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
var AesPkcs5;
(function (AesPkcs5) {
    /**
     * Encrypt data
     *
     * @param data Target data
     * @param key Key value of the encryption.
     * @param iv Initializer Vector for the encryption
     * @return Encrypted data
     */
    function encrypt(data, key, iv) {
        var cipher = crypto_js_1.default.AES.encrypt(data, crypto_js_1.default.enc.Utf8.parse(key), {
            iv: crypto_js_1.default.enc.Utf8.parse(iv),
            padding: crypto_js_1.default.pad.Pkcs7,
            mode: crypto_js_1.default.mode.CBC,
        });
        return cipher.toString();
        // const bytes: number = key.length * 8;
        // const cipher: crypto.Cipher = crypto.createCipheriv(
        //     `AES-${bytes}-CBC`,
        //     key,
        //     iv,
        // );
        // return cipher.update(data, "utf8", "base64") + cipher.final("base64");
    }
    AesPkcs5.encrypt = encrypt;
    /**
     * Decrypt data.
     *
     * @param data Target data
     * @param key Key value of the decryption.
     * @param iv Initializer Vector for the decryption
     * @return Decrypted data.
     */
    function decrypt(data, key, iv) {
        var cipher = crypto_js_1.default.AES.decrypt(data, crypto_js_1.default.enc.Utf8.parse(key), {
            iv: crypto_js_1.default.enc.Utf8.parse(iv),
            padding: crypto_js_1.default.pad.Pkcs7,
            mode: crypto_js_1.default.mode.CBC,
        });
        return cipher.toString(crypto_js_1.default.enc.Utf8);
    }
    AesPkcs5.decrypt = decrypt;
})(AesPkcs5 = exports.AesPkcs5 || (exports.AesPkcs5 = {}));
//# sourceMappingURL=AesPkcs5.js.map