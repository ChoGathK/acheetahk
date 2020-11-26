import { resolve } from 'path';
import { readFileSync } from 'fs';
import { expect, test } from '@jest/globals';

import { OSS } from '../src';
import { fileToBuffer } from '../../request/src';

const { oss } = JSON.parse(
  readFileSync(resolve(__dirname, '../../../settings/settings.json')).toString(),
);

const storage = new OSS.BaseOSS(oss);

/**
 * test oss
 */

test(
  'upload web file',
  async () => {
    const buffer = await fileToBuffer('http://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png');
    const result = await storage.upload('/test/test.png', buffer);
    const result1 = await storage.upload('/test/test1.png', buffer, 'put');
    const result2 = await storage.upload('/test/test2.png', buffer, 'putStream');
    expect(result.url).toBe('http://bobbyenoss.oss-cn-beijing.aliyuncs.com/test/test.png');
    expect(result1.url).toBe('http://bobbyenoss.oss-cn-beijing.aliyuncs.com/test/test1.png');
    expect(result2.url).toBe('http://bobbyenoss.oss-cn-beijing.aliyuncs.com/test/test2.png');
  },
);

test(
  'delete web file',
  async () => {
    const result = await storage.delete('/test/test.png');
    const result1 = await storage.delete('/test/test1.png');
    const result2 = await storage.delete('/test/test2.png');
    expect(result.res.status).toBe(204);
    expect(result1.res.status).toBe(204);
    expect(result2.res.status).toBe(204);
  },
);
