import { ProxyOptions, Request, Response } from './types';
/**
 * Used to proxy HTTP requests, Suitable for Nest.js Express.js requests
 *
 * req `Request` The bottom layer is HTTP.IncomingMessage
 *
 * res `Response` The bottom layer is HTTP.ServerResponse
 *
 * options `ProxyOptions`
 *
 */
export declare const fastProxy: (req: Request, res: Response, options: ProxyOptions) => Promise<void>;
