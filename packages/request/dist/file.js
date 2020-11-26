"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileDownload = exports.fileToStr = exports.fileToBuffer = exports.getHttpMod = void 0;
const fs = require("fs");
const axios_1 = require("axios");
const http = require("http");
const https = require("https");
/**
 * Acquisition mode
 *
 * url `string` Resource address
 */
const getHttpMod = (url) => {
    return url.indexOf('https') !== -1 ? https : http;
};
exports.getHttpMod = getHttpMod;
/**
 * Convert web files to Buffer
 *
 * url `string` Resource address
 */
const fileToBuffer = async (url) => {
    if (!url)
        throw new Error('Incomplete arameters !');
    const httpMod = exports.getHttpMod(url);
    const result = await new Promise((resolved, rejected) => {
        httpMod.get(url, (res) => {
            let size = 0;
            const chunks = [];
            res.on('data', (chunk) => {
                chunks.push(chunk);
                size += chunk.length;
            });
            res.on('end', (err) => {
                const data = Buffer.concat(chunks, size);
                err ? rejected(err) : resolved(data);
            });
        });
    });
    return result;
};
exports.fileToBuffer = fileToBuffer;
/**
 * Convert the network file into a string of the specified encoding
 *
 * url `string` Resource address
 *
 * type `BufferEncoding` Encoding type, the default is `base64`
 */
const fileToStr = async (url, type = 'base64') => {
    if (!url)
        throw new Error('Incomplete arameters !');
    const httpMod = exports.getHttpMod(url);
    const result = await new Promise((resolved, rejected) => {
        httpMod.get(url, (res) => {
            let size = 0;
            const chunks = [];
            res.on('data', (chunk) => {
                chunks.push(chunk);
                size += chunk.length;
            });
            res.on('end', (err) => {
                const data = Buffer.concat(chunks, size);
                const str = data.toString(type);
                err ? rejected(err) : resolved(str);
            });
        });
    });
    return result;
};
exports.fileToStr = fileToStr;
/**
 * Download the file and return to the local file path
 *
 * url `string` Resource address
 *
 * path `string` Download path
 */
const fileDownload = async (url, path) => {
    if (!url || !path)
        throw new Error('Incomplete arameters !');
    const fileName = url.split('/').pop();
    const localPath = `${path}/${fileName}`;
    if (!fs.existsSync(path))
        throw new Error('Path doesn\'t exist !');
    const response = await axios_1.default({ url, responseType: 'stream' });
    await response.data.pipe(fs.createWriteStream(localPath));
    return localPath;
};
exports.fileDownload = fileDownload;
