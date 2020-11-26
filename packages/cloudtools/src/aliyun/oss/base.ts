import { Duplex } from 'stream';
import * as AliOSS from 'ali-oss';

import * as BaseType from './types';

/**
 * Common methods of packaging aliyun OSS
 */

export class BaseOSS {

  public storage: AliOSS = new AliOSS(this.options);

  constructor(
    private readonly options: BaseType.Options,
  ) {}

  /**
   * Upload file Buffer to OSS
   *
   * name `string` Object storage address/path
   *
   * fileBuffer `buffer` file buffer
   *
   * type `'put' | 'putStream'` Upload method `put` one-time upload, `putStream` streaming
   */

  public async upload(name: string, fileBuffer: Buffer, type: 'put' | 'putStream' = 'put'): Promise<BaseType.PutObjectResult> {
    let result = null;

    if (type === 'put') {
      result = await this.storage.put(name, fileBuffer);
    }

    if (type === 'putStream') {
      const bufferStream = new Duplex();
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

  public async delete(name: string): Promise<BaseType.DeleteResponse> {
    const result = await this.storage.delete(name);
    return result;
  }
}
