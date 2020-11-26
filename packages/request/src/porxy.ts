import * as http from 'http';
import { fastRequest } from './base';
import { ProxyOptions, Request, Response, Method } from './types';

const forwarder = async (req: Request, res: Response, options: ProxyOptions) => {
  try {
    await new Promise((resolved, rejected) => {
      fastRequest(
        {
          data: options.body || {},
          headers: options.headers || {},
          method: (req.method as Method),
          timeout: options.timeout || 15000,
          url: `http://${options.host}:${options.port}${options.path}`,
        }
      ).then((response) => res.send(response.data)).catch((err) => rejected(err));
    });

  } catch (error) {
    throw new Error(error);
  }
};

const proxyer = async (req: Request, res: Response, options: ProxyOptions) => {
  try {
    await new Promise((resolved, rejected) => {
      const proxy = http.request(
        { ...options, method: req.method },
        (proxyReq) => {
          res.writeHead(proxyReq.statusCode, proxyReq.headers);
          proxyReq.pipe(res);
        }
      );
      req.pipe(proxy);
      proxy.once('error', (err) => rejected(err));
    });

  } catch (error) {
    throw new Error(error);
  }
};

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

export const fastProxy = async (req: Request, res: Response, options: ProxyOptions): Promise<void> => {
  if (!req || !res || !options) throw new Error('Incomplete arameters !');
  if (!options.host || !options.port) throw new Error('port or host doesn\'t exist !');

  const { isRewrite, rewrite, path } = options;
  if (isRewrite && rewrite && path) options.path = path.replace(rewrite, '/');

  req.readable ? await proxyer(req, res, options) : await forwarder(req, res, options);
};
