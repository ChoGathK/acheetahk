import { expect, test } from '@jest/globals';

import { autoMd5, BaseRedis, getCache, getHashCache, toLock } from '../src';

const doSomeThings = async () => {
  const result = await new Promise(
    (resolved) => setTimeout(() => resolved('success'), 200)
  );
  return result;
};

test('baseRedis - onLock', async () => {
  const base = new BaseRedis();
  await base.onLock('onLockTest');
  const result = await base.onLock('onLockTest');
  expect(result).toBe(false);
  base.redis.disconnect();
});

test('baseRedis - freedLock', async () => {
  const base = new BaseRedis();
  const result = await base.freedLock('onLockTest');
  expect(result).toBe(true);
  base.redis.disconnect();
});

test('baseRedis - lock', async () => {
  const base = new BaseRedis();

  // 声明需要执行的类方法
  class Demo {
    info = '!'
    @base.lock('processLock', 5, true, 'test')
    async getResult() { return await doSomeThings() + this.info }

    @base.lock('processLock2')
    async getResult2() { return await doSomeThings() + this.info }
  }

  const demo = new Demo();

  const result1 = await demo.getResult();
  expect(result1).toBe('success!');
  try {
    await Promise.all([demo.getResult(), demo.getResult()]);
  } catch (error) {
    expect(error.message).toBe('Error: test');
  }

  try {
    await Promise.all([demo.getResult2(), demo.getResult2()]);
  } catch (error) {
    expect(error.message).toBe('Error: Frequent operation');
  }
  base.redis.disconnect();
});

test('baseRedis - cache', async () => {
  const base = new BaseRedis();
  class Demo {
    info: string;
    constructor() {
      this.info = 'before ';
    }
    @base.cache('resultCache', 10000, true)
    async getResult(num, num2) {
      const result = await doSomeThings();
      const value = this.info + result + num + num2;
      return value;
    }

    @base.cache('resultCache2')
    async getResult2(num, num2) {
      const result = await doSomeThings();
      const value = this.info + result + num + num2;
      return value;
    }
  }

  const demo = new Demo();
  const result = await demo.getResult2(123, 234);
  expect(result).toBe('before success123234');

  const result1 = await demo.getResult(123, 234);
  expect(result1).toBe('before success123234');

  demo.info = 'now ';
  const result2 = await demo.getResult(123, 234);
  expect(result2).toBe('before success123234');

  await base.redis.del('resultCache');
  const result3 = await demo.getResult(123, 234);
  expect(result3).toBe('before success123234');

  await base.redis.del('resultCache:CACHEBY:' + autoMd5([123, 234]));
  const result4 = await demo.getResult(123, 234);
  expect(result4).toBe('now success123234');

  await base.redis.del('resultCache:CACHEBY:' + autoMd5([123, 234]));
  await base.redis.del('resultCache2');
  base.redis.disconnect();
});

test('baseRedis - hash cache', async () => {
  const base = new BaseRedis();
  class Demo {
    info: string;
    constructor() {
      this.info = 'before ';
    }
    @base.hashCache('hashCache')
    async getResult(num, num2) {
      const result = await doSomeThings();
      const value = this.info + result + num + num2;
      return value;
    }
  }

  const demo = new Demo();
  const result1 = await demo.getResult(123, 234);
  expect(result1).toBe('before success123234');

  demo.info = 'now ';
  const result2 = await demo.getResult(123, 234);
  expect(result2).toBe('before success123234');

  await base.redis.hdel('hashCache', autoMd5([123, 234]));
  const result4 = await demo.getResult(123, 234);
  expect(result4).toBe('now success123234');

  await base.redis.del('hashCache');
  base.redis.disconnect();
});

test('decorator - toLock', async () => {
  const base = new BaseRedis();

  // 声明需要执行的类方法
  const info = '!';
  const getResult = async () => { return await doSomeThings() + info };

  const result1 = await toLock(base, 'toLock', getResult, 5)(123);
  expect(result1).toBe('success!');
  try {
    await Promise.all([toLock(base, 'toLock', getResult, 5)(), toLock(base, 'toLock', getResult, 5)()]);
  } catch (error) {
    expect(error.message).toBe('Error: Frequent operation');
  }

  try {
    await Promise.all([toLock(base, 'toLock', getResult)(), toLock(base, 'toLock', getResult)()]);
  } catch (error) {
    expect(error.message).toBe('Error: Frequent operation');
  }
  base.redis.disconnect();
});

test('decorator - getCache', async () => {
  let info = 'before ';

  const base = new BaseRedis();

  const getResult = async (num, num2) => {
    const result = await doSomeThings();
    const value = info + result + num + num2;
    return value;
  };

  const getNull = () => null;

  const result = await getCache(base, 'getCache', getNull)();
  expect(result).toBe(null);

  const result1 = await getCache(base, 'getCache', getResult, 10000)(123, 234);
  expect(result1).toBe('before success123234');

  info = 'now ';
  const result2 = await getCache(base, 'getCache', getResult, 10000)(123, 234);
  expect(result2).toBe('before success123234');

  await base.redis.del('getCache');
  const result3 = await getCache(base, 'getCache', getResult, 10000)(123, 234);
  expect(result3).toBe('now success123234');

  await base.redis.del('getCache');
  base.redis.disconnect();
});

test('decorator - getHashCache', async () => {
  let info = 'before ';
  const base = new BaseRedis();
  const getResult = async (num, num2) => {
    const result = await doSomeThings();
    const value = info + result + num + num2;
    return value;
  };

  const getNull = () => null;

  const result = await getHashCache(base, 'getHashCache', 'key', getNull)();
  expect(result).toBe(null);

  const result1 = await getHashCache(base, 'getHashCache', 'key', getResult)(123, 234);
  expect(result1).toBe('before success123234');

  info = 'now ';
  const result2 = await getHashCache(base, 'getHashCache', 'key', getResult)(123, 234);
  expect(result2).toBe('before success123234');

  await base.redis.hdel('getHashCache', 'key');
  const result4 = await getHashCache(base, 'getHashCache', 'key', getResult)(123, 234);
  expect(result4).toBe('now success123234');

  await base.redis.del('getHashCache');
  base.redis.disconnect();
});
