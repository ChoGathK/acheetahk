import { expect, test } from '@jest/globals';

/**
 * test fileToBuffer
 */

import { fileToBuffer } from '../src';

const imgHttp = 'http://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png';

const imgHttps = 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png';

test(
  'fileToBuffer not url',
  async () => {
    try {
      await fileToBuffer(null);
    } catch (error) {
      expect(error.message === 'Incomplete arameters !').toBe(true);
    }
  },
);

test(
  'fileToBuffer https',
  async () => {
    const buffer = await fileToBuffer(imgHttps);
    expect(Buffer.isBuffer(buffer)).toBe(true);
  },
);

test(
  'fileToBuffer http',
  async () => {
    const buffer = await fileToBuffer(imgHttp);
    expect(Buffer.isBuffer(buffer)).toBe(true);
  },
);
