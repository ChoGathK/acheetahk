/* eslint-disable @typescript-eslint/no-this-alias */
import * as IORedis from 'ioredis';

import { autoMd5 } from './utils';

/**
 * Redis Common Method Package - BaseRedis
 */

export class BaseRedis {

  public redis: IORedis.Redis;

  constructor(
    options?: IORedis.RedisOptions,
    private readonly baseLock: string = 'LOCKBY',
    private readonly baseCache: string = 'CACHEBY',
  ) {
    this.redis = new IORedis(options);
  }

  /**
   * Verify if there is on lock
   */
  public async onLock(key: string, ttl = 5): Promise<boolean> {
    const result = await this.redis.set(key, 1, 'EX', ttl, 'NX');
    return result === 'OK';
  }

  /**
   * Release lock
   */
  public async freedLock(key: string): Promise<boolean> {
    const delLock = await this.redis.del(key);
    return !!delLock;
  }

  /**
   * Mutex decorator
   *
   * key `string` Lock key
   *
   * ttl `number` Lock Expiration time, in seconds
   *
   * isAuto `boolean` Whether to automatically splice the lock key value according to the bound function parameters, the default is `false`
   *
   * message `string` Failure information, the default is `Frequent operation`
   */

  public lock(key: string, ttl = 5, isAuto = false, message = 'Frequent operation'): Function {
    const baseRedis = this;
    const baseKey = this.baseLock;

    return function(target: any, methodName: string, desc: PropertyDescriptor) {
      let method = target[methodName];

      desc.value = async function(...args: any[]) {
        let result = null;
        const lockKey = isAuto && args
          ? `${key}:${baseKey}:${autoMd5(args)}`
          : key;

        try {
          if (!(await baseRedis.onLock(lockKey, ttl))) {
            throw new Error(message);
          }

          method = method.bind(this);
          result = await method(...args);
          await baseRedis.freedLock(lockKey); // Release the lock after execution
        } catch (error) {
          await baseRedis.freedLock(lockKey); // Manually release the lock anyway
          throw new Error(error);
        }

        return result;
      };
    };
  }

  /**
   * Cache decorator
   *
   * key `string` Cache key
   *
   * ttl `number` Cache Expiration time, in seconds
   *
   * isAuto `boolean` Whether to automatically splice the cache key value according to the bound function parameters, the default is `false`
   *
   */

  public cache(key: string, ttl = 3600, isAuto = false): Function {
    const baseRedis = this;
    const baseKey = this.baseCache;

    return function(target: any, methodName: string, desc: PropertyDescriptor) {
      let method = target[methodName];

      desc.value = async function(...args: any[]) {
        let result = null;
        const cacheKey = isAuto && args
          ? `${key}:${baseKey}:${autoMd5(args)}`
          : key;

        const cacheValue = await baseRedis.redis.get(cacheKey);

        if (!cacheValue) {
          method = method.bind(this);
          result = await method(...args);
          if (result) {
            await baseRedis.redis.set(cacheKey, JSON.stringify(result), 'EX', ttl);
          }
        }

        else {
          result = JSON.parse(cacheValue);
        }

        return result;
      };
    };
  }

  /**
   * HASH Cache decorator
   *
   * hkey `string` HASH Cache key
   */

  public hashCache(hkey: string): Function {
    const baseRedis = this;

    return function(target: any, methodName: string, desc: PropertyDescriptor) {
      let method = target[methodName];

      desc.value = async function(...args: any[]) {
        let result = null;
        const key = autoMd5(args);
        const cacheValue = await baseRedis.redis.hget(hkey, key);

        if (!cacheValue) {
          method = method.bind(this);
          result = await method(...args);
          if (result) {
            await baseRedis.redis.hset(hkey, key, JSON.stringify(result));
          }
        }

        else {
          result = JSON.parse(cacheValue);
        }

        return result;
      };
    };
  }
}
