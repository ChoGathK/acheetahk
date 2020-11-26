import { aesType } from './types';
/**
 * 封装 crypto 的常用方法
 *
 * key: `string` 秘钥
 *
 * iv: `string` 向量（偏移量）
 */
export declare class FastCrypto {
    private readonly key;
    private readonly iv;
    constructor(key: string, iv: string);
    /**
     * 将字符串进行 MD5 编码
     *
     * data `string` 需要 MD5 编码的字符串
     */
    md5(data: string): string;
    /**
     * aes 加密
     *
     * data `string` 需要加密的数据
     *
     * type `aesType` aes 算法类型
     */
    aesEncrypt(data: string, type: aesType): string;
    /**
     * aes 解密
     *
     * crypted `string` 需要解密的字符串
     *
     * type `aesType` aes 算法类型
     */
    aesDecrypt(crypted: string, type: aesType): string;
    /**
     * rsa 加密
     *
     * publicKey `string` 公钥
     *
     * data `string` 需要加密的数据
     */
    rsaEncrypt(publicKey: string, data: string): string;
    /**
     * rsa 解密
     *
     * privateKey `string` 私钥
     *
     * data `string` 需要解密的数据
     */
    rsaDecrypt(privateKey: string, data: string): string;
}
