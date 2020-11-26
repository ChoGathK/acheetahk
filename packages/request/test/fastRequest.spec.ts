import { expect, test } from '@jest/globals';

/**
 * test fastRequest
 */
import { fastRequest } from '../src';

const server = 'http://127.0.0.1:7777';

test(
  'fastRequest not options',
  async () => {
    try {
      await fastRequest(null);
    } catch (error) {
      expect(error.message === 'Incomplete arameters !').toBe(true);
    }
  },
);

test(
  '[get]',
  async () => {
    const response = await fastRequest({
      url: server + '/get',
      method: 'GET',
    });
    expect(response.data.data === 'get').toBe(true);
  },
);

test(
  '[get] + query',
  async () => {
    const response = await fastRequest({
      url: server + '/get',
      query: { value: 'query' },
      method: 'GET',
    });
    expect(response.data.query.value === 'query').toBe(true);
  },
);

test(
  '[post]',
  async () => {
    const response = await fastRequest({
      url: server + '/post',
      data: { value: 'post' },
      method: 'POST',
    });
    expect(response.data.value === 'post').toBe(true);
  },
);

test(
  '[put]',
  async () => {
    const response = await fastRequest({
      url: server + '/put',
      data: { value: 'put' },
      method: 'PUT',
    });
    expect(response.data.value === 'put').toBe(true);
  },
);

test(
  '[delete]',
  async () => {
    const response = await fastRequest({
      url: server + '/delete',
      data: { value: 'delete' },
      method: 'DELETE',
    });
    expect(response.data.value === 'delete').toBe(true);
  },
);

test(
  '[options]',
  async () => {
    const response = await fastRequest({
      url: server + '/options',
      data: { value: 'options' },
      method: 'OPTIONS',
    });
    expect(response.status === 204).toBe(true);
  },
);
