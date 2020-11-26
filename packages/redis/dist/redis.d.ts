import * as IORedis from 'ioredis';
/**
 * Redis Common Method Package - BaseRedis
 */
export declare class BaseRedis {
    private readonly baseLock;
    private readonly baseCache;
    redis: IORedis.Redis;
    constructor(options?: IORedis.RedisOptions, baseLock?: string, baseCache?: string);
    /**
     * Verify if there is on lock
     */
    onLock(key: string, ttl?: number): Promise<boolean>;
    /**
     * Release lock
     */
    freedLock(key: string): Promise<boolean>;
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
    lock(key: string, ttl?: number, isAuto?: boolean, message?: string): Function;
    /**
     * Cache decorator
     *
     * key `string` Cache key
     *
     * ttl `number` Cache Expiration time, in seconds
     *
     * isAuto `boolean` Whether to automatically splice the lock key value according to the bound function parameters, the default is `false`
     *
     */
    cache(key: string, ttl?: number, isAuto?: boolean): Function;
    /**
     * HASH Cache decorator
     *
     * hkey `string` HASH Cache key
     */
    hashCache(hkey: string): Function;
}
