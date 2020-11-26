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
export declare const toLock: (baseRedis: BaseRedis, key: string, next: Function, ttl?: number, message?: string) => (...arg: any[]) => Promise<any>;
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
export declare const getCache: (baseRedis: BaseRedis, key: string, next: Function, ttl?: number) => (...arg: any[]) => Promise<any>;
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
export declare const getHashCache: (baseRedis: BaseRedis, hkey: string, key: string, next: Function) => (...arg: any[]) => Promise<any>;
