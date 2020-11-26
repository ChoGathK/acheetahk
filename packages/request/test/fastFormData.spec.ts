import * as fs from 'fs';
import { resolve } from 'path';
import { expect, test } from '@jest/globals';

/**
 * test fastFormData
 */
import { fastFormData } from '../src';

const server = 'http://127.0.0.1:7777';

test(
  'fastRequest not options',
  async () => {
    try {
      await fastFormData(null);
    } catch (error) {
      expect(error.message === 'Incomplete arameters !').toBe(true);
    }
  },
);

test(
  'fastRequest not options',
  async () => {
    try {
      await fastFormData({ data: null, url: null });
    } catch (error) {
      expect(error.message === 'Incomplete arameters !').toBe(true);
    }
  },
);

test(
  '[post] form-data request localhost',
  async () => {
    const response = await fastFormData(
      {
        url: server + '/form',
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
  '[post] form-data request not headers',
  async () => {
    const response = await fastFormData(
      {
        url: server + '/form',
        data: {
          name: 'form',
          file: fs.createReadStream(resolve(__dirname, '../package.json')),
        },
      },
    );
    expect(response.data.data.name === 'form').toBe(true);
  },
);
