import { BaseRedis } from './base';

/**
 * Mutex Function decorator
 *
 * baseRedis `BaseRedis` Instance By BaseRedis
 *
 * key `string` Lock key
 *
 * ttl `number` Lock Expiration time, in seconds
 *
 * isAuto `boolean` Whether to automatically splice the lock key value according to the bound function parameters, the default is `false`
 *
 * next `Function`  Function to be executed
 *
 * message `string` Failure information, the default is `Frequent operation`
 */

export const toLock = (baseRedis: BaseRedis, key: string, next: Function, ttl?: number, message = 'Frequent operation') => {
  return async (...arg) => {
    try {
      const time = ttl || 5;
      if (!(await baseRedis.onLock(key, time))) throw new Error(message);
      const result = await next(...arg);
      await baseRedis.freedLock(key);
      return result;
    } catch (err) {
      await baseRedis.freedLock(key);
      throw new Error(err);
    }
  };
};

/**
 * Cache Function decorator
 *
 * baseRedis `BaseRedis` Instance By BaseRedis
 *
 * key `string` Cache key
 *
 * ttl `number` Cache Expiration time, in seconds
 *
 * next `Function`  Function to be executed
 *
 */

export const getCache = (baseRedis: BaseRedis, key: string, next: Function, ttl = 5) => {
  return async (...arg) => {
    let result = null;
    const cacheResult = await baseRedis.redis.get(key);
    if (!cacheResult) {
      result = await next(...arg);
      if (!result) return result;
      await baseRedis.redis.set(key, JSON.stringify(result), 'EX', ttl);
      return result;
    }

    else {
      result = JSON.parse(cacheResult);
    }

    return result;
  };
};

/**
 * Cache HASH Function decorator
 *
 * baseRedis `BaseRedis` Instance By BaseRedis
 *
 * hkey `string` HASH Cache key
 *
 * key `string` HASH Table key
 *
 * next `Function`  Function to be executed
 *
 */

export const getHashCache = (baseRedis: BaseRedis, hkey: string, key: string, next: Function) => {
  return async (...arg) => {
    let result = null;
    const cacheResult = await baseRedis.redis.hget(hkey, key);
    if (!cacheResult) {
      result = await next(...arg);
      if (!result) return result;
      await baseRedis.redis.hset(hkey, key, JSON.stringify(result));
      return result;
    }

    else {
      result = JSON.parse(cacheResult);
    }

    return result;
  };
};
