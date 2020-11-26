/// <reference types="node" />
import * as http from 'http';
import * as https from 'https';
import { BufferEncoding } from './types';
/**
 * Acquisition mode
 *
 * url `string` Resource address
 */
export declare const getHttpMod: (url: string) => typeof http | typeof https;
/**
 * Convert web files to Buffer
 *
 * url `string` Resource address
 */
export declare const fileToBuffer: (url: string) => Promise<Buffer>;
/**
 * Convert the network file into a string of the specified encoding
 *
 * url `string` Resource address
 *
 * type `BufferEncoding` Encoding type, the default is `base64`
 */
export declare const fileToStr: (url: string, type?: BufferEncoding) => Promise<string>;
/**
 * Download the file and return to the local file path
 *
 * url `string` Resource address
 *
 * path `string` Download path
 */
export declare const fileDownload: (url: string, path: string) => Promise<string>;
