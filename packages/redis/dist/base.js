"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRedis = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const IORedis = require("ioredis");
const utils_1 = require("./utils");
/**
 * Redis Common Method Package - BaseRedis
 */
class BaseRedis {
    constructor(options, baseLock = 'LOCKBY', baseCache = 'CACHEBY') {
        this.baseLock = baseLock;
        this.baseCache = baseCache;
        this.redis = new IORedis(options);
    }
    /**
     * Verify if there is on lock
     */
    async onLock(key, ttl = 5) {
        const result = await this.redis.set(key, 1, 'EX', ttl, 'NX');
        return result === 'OK';
    }
    /**
     * Release lock
     */
    async freedLock(key) {
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
    lock(key, ttl = 5, isAuto = false, message = 'Frequent operation') {
        const baseRedis = this;
        const baseKey = this.baseLock;
        return function (target, methodName, desc) {
            let method = target[methodName];
            desc.value = async function (...args) {
                let result = null;
                const lockKey = isAuto && args
                    ? `${key}:${baseKey}:${utils_1.autoMd5(args)}`
                    : key;
                try {
                    if (!(await baseRedis.onLock(lockKey, ttl))) {
                        throw new Error(message);
                    }
                    method = method.bind(this);
                    result = await method(...args);
                    await baseRedis.freedLock(lockKey); // Release the lock after execution
                }
                catch (error) {
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
    cache(key, ttl = 3600, isAuto = false) {
        const baseRedis = this;
        const baseKey = this.baseCache;
        return function (target, methodName, desc) {
            let method = target[methodName];
            desc.value = async function (...args) {
                let result = null;
                const cacheKey = isAuto && args
                    ? `${key}:${baseKey}:${utils_1.autoMd5(args)}`
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
    hashCache(hkey) {
        const baseRedis = this;
        return function (target, methodName, desc) {
            let method = target[methodName];
            desc.value = async function (...args) {
                let result = null;
                const key = utils_1.autoMd5(args);
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
exports.BaseRedis = BaseRedis;
