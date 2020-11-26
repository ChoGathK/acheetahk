/// <reference types="node" />
import * as http from 'http';
import { Request, Response } from 'express';
import { Method, AxiosResponse, AxiosRequestConfig } from 'axios';
export { Request, Response, Method, AxiosResponse, AxiosRequestConfig };
export declare type BufferEncoding = 'ascii' | 'utf8' | 'utf-8' | 'utf16le' | 'ucs2' | 'ucs-2' | 'base64' | 'latin1' | 'binary' | 'hex';
export interface RequestOptions extends AxiosRequestConfig {
    query?: any;
}
export interface ProxyOptions extends http.RequestOptions {
    body?: any;
    rewrite?: string;
    isRewrite?: boolean;
}
export interface FormDataOptions {
    data: any;
    url: string;
    configs?: AxiosRequestConfig;
}
