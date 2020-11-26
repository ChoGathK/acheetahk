import * as fs from 'fs';
import axios from 'axios';
import * as http from 'http';
import * as https from 'https';

import { BufferEncoding } from './types';

/**
 * Acquisition mode
 *
 * url `string` Resource address
 */

export const getHttpMod = (url: string) => {
  return url.indexOf('https') !== -1 ? https : http;
};

/**
 * Convert web files to Buffer
 *
 * url `string` Resource address
 */

export const fileToBuffer = async (url: string): Promise<Buffer> => {
  if (!url) throw new Error('Incomplete arameters !');

  const httpMod = getHttpMod(url);

  const result: any = await new Promise((resolved, rejected) => {
    httpMod.get(url, (res) => {
      let size = 0;
      const chunks: any[] = [];

      res.on('data', (chunk) => {
        chunks.push(chunk);
        size += chunk.length;
      });

      res.on('end', (err: any) => {
        const data = Buffer.concat(chunks, size);
        err ? rejected(err) : resolved(data);
      });
    });
  });

  return result;
};

/**
 * Convert the network file into a string of the specified encoding
 *
 * url `string` Resource address
 *
 * type `BufferEncoding` Encoding type, the default is `base64`
 */

export const fileToStr = async (url: string, type: BufferEncoding = 'base64'): Promise<string> => {
  if (!url) throw new Error('Incomplete arameters !');

  const httpMod = getHttpMod(url);

  const result: any = await new Promise((resolved, rejected) => {
    httpMod.get(url, (res) => {
      let size = 0;
      const chunks: any[] = [];

      res.on('data', (chunk) => {
        chunks.push(chunk);
        size += chunk.length;
      });

      res.on('end', (err: any) => {
        const data = Buffer.concat(chunks, size);
        const str = data.toString(type);
        err ? rejected(err) : resolved(str);
      });
    });
  });

  return result;
};

/**
 * Download the file and return to the local file path
 *
 * url `string` Resource address
 *
 * path `string` Download path
 */

export const fileDownload = async (url: string, path: string): Promise<string> => {
  if (!url || !path) throw new Error('Incomplete arameters !');

  const fileName = url.split('/').pop();
  const localPath = `${path}/${fileName}`;

  if (!fs.existsSync(path)) throw new Error('Path doesn\'t exist !');

  const response = await axios({ url, responseType: 'stream' });
  await response.data.pipe(fs.createWriteStream(localPath));
  return localPath;
};
