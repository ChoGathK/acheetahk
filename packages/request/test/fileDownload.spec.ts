import { resolve } from 'path';
import { existsSync } from 'fs';
import { expect, test } from '@jest/globals';

/**
 * test fileDownload
 */

import { fileDownload } from '../src';

const local = resolve(__dirname, './fileDownload');

const url = 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png';

test(
  'fileDownload not url',
  async () => {
    try {
      await fileDownload(null, local);
    } catch (error) {
      expect(error.message === 'Incomplete arameters !').toBe(true);
    }
  },
);

test(
  'fileDownload not local',
  async () => {
    try {
      await fileDownload(url, null);
    } catch (error) {
      expect(error.message === 'Incomplete arameters !').toBe(true);
    }
  },
);

test(
  'fileDownload path doesn\'t exist ',
  async () => {
    try {
      await fileDownload(url, './test/123');
    } catch (error) {
      expect(error.message === 'Path doesn\'t exist !').toBe(true);
    }
  },
);

test(
  'fileDownload default',
  async () => {
    const path = await fileDownload(url, local);
    expect(existsSync(path)).toBe(true);
  },
);
