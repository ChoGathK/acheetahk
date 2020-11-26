import * as fs from 'fs';
import { resolve } from 'path';
import * as express from 'express';
import { expect, test } from '@jest/globals';

/**
 * test fastFormData
 */
import { fastFormData, fastProxy, fastRequest } from '../src';

const app = express();

const baseRouter = express.Router();
app.use('/express', baseRouter);
const expressUrl = 'http://127.0.0.1:7002/express';

const mockNestRouter = express.Router();
app.use('/nest', mockNestRouter);
const nestUrl = 'http://127.0.0.1:7002/nest';

const nullOptionsRouter = express.Router();
app.use('/nullOptions', nullOptionsRouter);
const nullOptionsUrl = 'http://127.0.0.1:7002/nullOptions';

const errorOptionsRouter = express.Router();
app.use('/errorOptions', errorOptionsRouter);
const errorOptionsUrl = 'http://127.0.0.1:7002/errorOptions';

const errorRouter = express.Router();
app.use('/error', errorRouter);
const errorUrl = 'http://127.0.0.1:7002/error';

const errorNestRouter = express.Router();
app.use('/errorNest', errorNestRouter);
const errorNestUrl = 'http://127.0.0.1:7002/errorNest';

app.listen(7002);

baseRouter.all('*', async (requset: express.Request, response: express.Response) => {
  await fastProxy(
    requset,
    response,
    {
      host: '127.0.0.1',
      port: 7777,
      isRewrite: true,
      rewrite: '/express/',
      path: requset.originalUrl,
      body: requset.body,
      headers: { ...requset.headers, 'x-test': 'express' },
    },
  );
});

mockNestRouter.all('*', async (requset: express.Request, response: express.Response) => {
  requset.readable = false;
  await fastProxy(
    requset,
    response,
    {
      host: '127.0.0.1',
      port: 7777,
      isRewrite: true,
      rewrite: '/nest/',
      path: requset.originalUrl,
      body: requset.body,
      // headers: { ...requset.headers, 'x-test': 'nest' },
    },
  );
});

test(
  'express [get] + query',
  async () => {
    const response = await fastRequest({
      url: expressUrl + '/get',
      query: { value: 'query' },
      method: 'GET',
    });
    expect(response.data.query.value === 'query').toBe(true);
  },
);

test(
  'express [post]',
  async () => {
    const response = await fastRequest({
      url: expressUrl + '/post',
      data: { value: 'post' },
      method: 'POST',
    });
    expect(response.data.value === 'post').toBe(true);
  },
);

test(
  'express [put]',
  async () => {
    const response = await fastRequest({
      url: expressUrl + '/put',
      data: { value: 'put' },
      method: 'PUT',
    });
    expect(response.data.value === 'put').toBe(true);
  },
);

test(
  'express [delete]',
  async () => {
    const response = await fastRequest({
      url: expressUrl + '/delete',
      data: { value: 'delete' },
      method: 'DELETE',
    });
    expect(response.data.value === 'delete').toBe(true);
  },
);

test(
  'express [options]',
  async () => {
    const response = await fastRequest({
      url: expressUrl + '/options',
      data: { value: 'options' },
      method: 'OPTIONS',
    });
    expect(response.status === 204).toBe(true);
  },
);

test(
  '[post] form-data request localhost',
  async () => {
    const response = await fastFormData(
      {
        url: expressUrl + '/form',
        data: {
          name: 'form',
          file: fs.createReadStream(resolve(__dirname, '../package.json')),
        },
        configs: {
          headers: {
            'x-api-test': 'true',
          },
        },
      },
    );
    expect(response.data.data.name === 'form').toBe(true);
  },
);

test(
  'nest [get]',
  async () => {
    const response = await fastRequest({
      url: nestUrl + '/get',
      query: { value: 'query' },
      method: 'GET',
    });
    expect(response.data.query.value === 'query').toBe(true);
  },
);

test(
  'null options [get]',
  async () => {
    nullOptionsRouter.all('*', async (requset: express.Request, response: express.Response) => {
      try {
        await fastProxy(
          null,
          null,
          null,
        );
      } catch (error) {
        response.send('null options');
      }
    });

    const response = await fastRequest({
      url: nullOptionsUrl + '/get',
      query: { value: 'query' },
      method: 'GET',
    });

    expect(response.data === 'null options').toBe(true);
  },
);

test(
  'error options [get]',
  async () => {
    errorOptionsRouter.all('*', async (requset: express.Request, response: express.Response) => {
      try {
        await fastProxy(
          requset,
          response,
          {
            port: 666,
          },
        );
      } catch (error) {
        response.send('error options');
      }
    });

    const response = await fastRequest({
      url: errorOptionsUrl + '/get',
      query: { value: 'query' },
      method: 'GET',
    });

    expect(response.data === 'error options').toBe(true);
  },
);

test(
  'error server [get]',
  async () => {
    errorRouter.all('*', async (requset: express.Request, response: express.Response) => {
      try {
        await fastProxy(
          requset,
          response,
          {
            host: '127.0.0.1',
            port: 404,
            isRewrite: true,
            rewrite: '/error/',
            path: requset.originalUrl,
            body: requset.body,
            headers: { ...requset.headers, 'x-test': 'error' },
          },
        );
      } catch (error) {
        response.send('error server');
      }
    });

    const response = await fastRequest({
      url: errorUrl + '/get',
      query: { value: 'query' },
      method: 'GET',
    });

    expect(response.data === 'error server').toBe(true);
  },
);

test(
  'error nest server [get]',
  async () => {
    errorNestRouter.all('*', async (requset: express.Request, response: express.Response) => {
      try {
        requset.readable = false;

        await fastProxy(
          requset,
          response,
          {
            host: '127.0.0.1',
            port: 404,
            isRewrite: true,
            rewrite: '/errorNest/',
            path: requset.originalUrl,
            body: requset.body,
            headers: { ...requset.headers, 'x-test': 'error' },
          },
        );
      } catch (error) {
        response.send('error server');
      }
    });

    const response = await fastRequest({
      url: errorNestUrl + '/get',
      query: { value: 'query' },
      method: 'GET',
    });

    expect(response.data === 'error server').toBe(true);
  },
);
