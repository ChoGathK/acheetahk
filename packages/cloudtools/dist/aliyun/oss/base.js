"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseOSS = void 0;
const stream_1 = require("stream");
const AliOSS = require("ali-oss");
/**
 * Common methods of packaging aliyun OSS
 */
class BaseOSS {
    constructor(options) {
        this.options = options;
        this.storage = new AliOSS(this.options);
    }
    /**
     * Upload file Buffer to OSS
     *
     * name `string` Object storage address/path
     *
     * fileBuffer `buffer` file buffer
     *
     * type `'put' | 'putStream'` Upload method `put` one-time upload, `putStream` streaming
     */
    async upload(name, fileBuffer, type = 'put') {
        let result = null;
        if (type === 'put') {
            result = await this.storage.put(name, fileBuffer);
        }
        if (type === 'putStream') {
            const bufferStream = new stream_1.Duplex();
            bufferStream.push(fileBuffer);
            bufferStream.push(null);
            result = await this.storage.putStream(name, bufferStream);
        }
        return result;
    }
    /**
     * Delete the specified resource
     *
     * name `string` Object storage address/path (refers to the base address without source, such as global/bobby.png)
     */
    async delete(name) {
        const result = await this.storage.delete(name);
        return result;
    }
}
exports.BaseOSS = BaseOSS;
