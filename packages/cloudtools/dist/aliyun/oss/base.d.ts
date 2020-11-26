/// <reference types="node" />
import * as AliOSS from 'ali-oss';
import * as BaseType from './types';
/**
 * Common methods of packaging aliyun OSS
 */
export declare class BaseOSS {
    private readonly options;
    storage: AliOSS;
    constructor(options: BaseType.Options);
    /**
     * Upload file Buffer to OSS
     *
     * name `string` Object storage address/path
     *
     * fileBuffer `buffer` file buffer
     *
     * type `'put' | 'putStream'` Upload method `put` one-time upload, `putStream` streaming
     */
    upload(name: string, fileBuffer: Buffer, type?: 'put' | 'putStream'): Promise<BaseType.PutObjectResult>;
    /**
     * Delete the specified resource
     *
     * name `string` Object storage address/path (refers to the base address without source, such as global/bobby.png)
     */
    delete(name: string): Promise<BaseType.DeleteResponse>;
}
