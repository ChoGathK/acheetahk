import { expect, test } from '@jest/globals';

/**
 * test fileToStr
 */

import { fileToStr } from '../src';

const imgHttp = 'http://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png';

const imgHttps = 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png';

test(
  'fileToStr not url',
  async () => {
    try {
      await fileToStr(null);
    } catch (error) {
      expect(error.message === 'Incomplete arameters !').toBe(true);
    }
  },
);

test(
  'fileToStr https',
  async () => {
    const str = await fileToStr(imgHttps);
    expect(typeof str === 'string').toBe(true);
  },
);

test(
  'fileToStr http',
  async () => {
    const str = await fileToStr(imgHttp);
    expect(typeof str === 'string').toBe(true);
  },
);
