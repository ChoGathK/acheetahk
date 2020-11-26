"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FastCrypto = void 0;
const crypto_1 = require("crypto");
/**
 * 封装 crypto 的常用方法
 *
 * key: `string` 秘钥
 *
 * iv: `string` 向量（偏移量）
 */
class FastCrypto {
    constructor(key, iv) {
        this.key = key;
        this.iv = iv;
    }
    /**
     * 将字符串进行 MD5 编码
     *
     * data `string` 需要 MD5 编码的字符串
     */
    md5(data) {
        return crypto_1.createHash('md5').update(data).digest('hex');
    }
    /**
     * aes 加密
     *
     * data `string` 需要加密的数据
     *
     * type `aesType` aes 算法类型
     */
    aesEncrypt(data, type) {
        const cipher = crypto_1.createCipheriv(type, this.key, this.iv);
        let crypted = cipher.update(data, 'utf8', 'hex');
        crypted += cipher.final('hex');
        crypted = Buffer.from(crypted, 'hex').toString('base64');
        return crypted;
    }
    /**
     * aes 解密
     *
     * crypted `string` 需要解密的字符串
     *
     * type `aesType` aes 算法类型
     */
    aesDecrypt(crypted, type) {
        const uni = Buffer.from(crypted, 'base64').toString('hex');
        const decipher = crypto_1.createDecipheriv(type, this.key, this.iv);
        let decoded = decipher.update(uni, 'hex', 'utf8');
        decoded += decipher.final('utf8');
        return decoded;
    }
    /**
     * rsa 加密
     *
     * publicKey `string` 公钥
     *
     * data `string` 需要加密的数据
     */
    rsaEncrypt(publicKey, data) {
        const dataBuffer = Buffer.from(data);
        const encrypted = crypto_1.publicEncrypt(publicKey, dataBuffer);
        return encrypted.toString('base64');
    }
    /**
     * rsa 解密
     *
     * privateKey `string` 私钥
     *
     * data `string` 需要解密的数据
     */
    rsaDecrypt(privateKey, data) {
        const dataBuffer = Buffer.from(data);
        const decrypted = crypto_1.privateDecrypt(privateKey, dataBuffer);
        return decrypted.toString('utf8');
    }
}
exports.FastCrypto = FastCrypto;
//# sourceMappingURL=index.js.map