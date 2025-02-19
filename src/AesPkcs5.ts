import CryptoJS from "crypto-js";

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
export namespace AesPkcs5 {
    /**
     * Encrypt data
     *
     * @param data Target data
     * @param key Key value of the encryption.
     * @param iv Initializer Vector for the encryption
     * @return Encrypted data
     */
    export function encrypt(data: string, key: string, iv: string): string {
        const cipher = CryptoJS.AES.encrypt(
            data,
            CryptoJS.enc.Utf8.parse(key),
            {
                iv: CryptoJS.enc.Utf8.parse(iv),
                padding: CryptoJS.pad.Pkcs7,
                mode: CryptoJS.mode.CBC,
            },
        );
        return cipher.toString();

        // const bytes: number = key.length * 8;
        // const cipher: crypto.Cipher = crypto.createCipheriv(
        //     `AES-${bytes}-CBC`,
        //     key,
        //     iv,
        // );

        // return cipher.update(data, "utf8", "base64") + cipher.final("base64");
    }

    /**
     * Decrypt data.
     *
     * @param data Target data
     * @param key Key value of the decryption.
     * @param iv Initializer Vector for the decryption
     * @return Decrypted data.
     */
    export function decrypt(data: string, key: string, iv: string): string {
        const cipher = CryptoJS.AES.decrypt(
            data,
            CryptoJS.enc.Utf8.parse(key),
            {
                iv: CryptoJS.enc.Utf8.parse(iv),
                padding: CryptoJS.pad.Pkcs7,
                mode: CryptoJS.mode.CBC,
            },
        );
        return cipher.toString(CryptoJS.enc.Utf8);
    }
}
