#

[![@](https://img.shields.io/badge/Github-@acheetahk/redis-brightgreen.svg)](https://github.com/A-CheetahK/acheetahk/actions?query=workflow%3A%22Node.js+CI%22)
[![npm](https://img.shields.io/npm/v/@acheetahk/redis)](https://www.npmjs.com/package/@acheetahk/redis)
![](https://badgen.net/npm/dt/@acheetahk/redis)
[![codecov](https://codecov.io/gh/A-CheetahK/acheetahk/branch/master/graph/badge.svg)](https://codecov.io/gh/A-CheetahK/acheetahk)
![](https://img.shields.io/npm/l/@acheetahk/redis.svg)

> Please use version greater than 2.0.0

## Installation

```shell
npm install @acheetahk/redis

cnpm install @acheetahk/redis

yarn add @acheetahk/redis
```

## Usage

```ts
import { BaseRedis } from '@acheetahk/redis';
```

### baseRedis

```ts
import { BaseRedis } from '@acheetahk/redis';

const base = new BaseRedis(`<YOUR OPTIONS>`);

```

#### options

```js
port?: number;
host?: string;
/**
 * 4 (IPv4) or 6 (IPv6), Defaults to 4.
 */
family?: number;
/**
 * Local domain socket path. If set the port, host and family will be ignored.
 */
path?: string;
/**
 * TCP KeepAlive on the socket with a X ms delay before start. Set to a non-number value to disable keepAlive.
 */
keepAlive?: number;
connectionName?: string;
/**
 * If set, client will send AUTH command with the value of this option as the first argument when connected. The `password` option must be set too. Username should only be set for Redis >=6.
 */
username?: string;
/**
 * If set, client will send AUTH command with the value of this option when connected.
 */
password?: string;
/**
 * Database index to use.
 */
db?: number;
/**
 * When a connection is established to the Redis server, the server might still be loading
 * the database from disk. While loading, the server not respond to any commands.
 * To work around this, when this option is true, ioredis will check the status of the Redis server,
 * and when the Redis server is able to process commands, a ready event will be emitted.
 */
enableReadyCheck?: boolean;
keyPrefix?: string;
/**
 * When the return value isn't a number, ioredis will stop trying to reconnect.
 * Fixed in: https://github.com/DefinitelyTyped/DefinitelyTyped/pull/15858
 */
retryStrategy?(times: number): number | void | null;
/**
 * By default, all pending commands will be flushed with an error every
 * 20 retry attempts. That makes sure commands won't wait forever when
 * the connection is down. You can change this behavior by setting
 * `maxRetriesPerRequest`.
 *
 * Set maxRetriesPerRequest to `null` to disable this behavior, and
 * every command will wait forever until the connection is alive again
 * (which is the default behavior before ioredis v4).
 */
maxRetriesPerRequest?: number | null;
/**
 * 1/true means reconnect, 2 means reconnect and resend failed command. Returning false will ignore
 * the error and do nothing.
 */
reconnectOnError?(error: Error): boolean | 1 | 2;
/**
 * By default, if there is no active connection to the Redis server, commands are added to a queue
 * and are executed once the connection is "ready" (when enableReadyCheck is true, "ready" means
 * the Redis server has loaded the database from disk, otherwise means the connection to the Redis
 * server has been established). If this option is false, when execute the command when the connection
 * isn't ready, an error will be returned.
 */
enableOfflineQueue?: boolean;
/**
 * The milliseconds before a timeout occurs during the initial connection to the Redis server.
 * default: 10000.
 */
connectTimeout?: number;
/**
 * After reconnected, if the previous connection was in the subscriber mode, client will auto re-subscribe these channels.
 * default: true.
 */
autoResubscribe?: boolean;
/**
 * If true, client will resend unfulfilled commands(e.g. block commands) in the previous connection when reconnected.
 * default: true.
 */
autoResendUnfulfilledCommands?: boolean;
lazyConnect?: boolean;
tls?: ConnectionOptions;
/**
 * default: "master".
 */
role?: 'master' | 'slave';
/**
 * default: null.
 */
name?: string;
sentinelUsername?: string;
sentinelPassword?: string;
sentinels?: Array<{ host: string; port: number }>;
/**
 * If `sentinelRetryStrategy` returns a valid delay time, ioredis will try to reconnect from scratch.
 * default: function(times) { return Math.min(times * 10, 1000); }
 */
sentinelRetryStrategy?(times: number): number | void | null;
/**
 * Can be used to prefer a particular slave or set of slaves based on priority.
 */
preferredSlaves?: PreferredSlaves;
/**
 * Whether to support the `tls` option when connecting to Redis via sentinel mode.
 * default: false.
 */
enableTLSForSentinelMode?: boolean;
sentinelTLS?: SecureContextOptions;
/**
 * NAT map for sentinel connector.
 * default: null.
 */
natMap?: NatMap;
/**
 * Update the given `sentinels` list with new IP addresses when communicating with existing sentinels.
 * default: true.
 */
updateSentinels?: boolean;
/**
 * Enable READONLY mode for the connection. Only available for cluster mode.
 * default: false.
 */
readOnly?: boolean;
/**
 * If you are using the hiredis parser, it's highly recommended to enable this option.
 * Create another instance with dropBufferSupport disabled for other commands that you want to return binary instead of string
 */
dropBufferSupport?: boolean;
/**
 * Whether to show a friendly error stack. Will decrease the performance significantly.
 */
showFriendlyErrorStack?: boolean;
```

### lock

```ts
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
import { BaseRedis } from '@acheetahk/redis';

const base = new BaseRedis(`<YOUR OPTIONS>`);

class Demo {
  @base.lock('lockKey', 5, true)
  async doSomeThings(args: any) {
    const result = await `<YOUR PROMISE FUNCTION>`(args);
    return result;
  }
}

const demo = new Demo();

// success
try {
  const result = await demo.doSomeThings({ key: 'value'});
catch (error) {
  // console.log(error);
}

// error
try {
  await Promise.all([
    demo.doSomeThings({ key: 'value'}),
    demo.doSomeThings({ key: 'value'})
  ]);
} catch (error) {
  // Error: Frequent operation'
}

```

### cache

```ts
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
import { BaseRedis } from '@acheetahk/redis';

let count = 0;

const base = new BaseRedis(`<YOUR OPTIONS>`);

class Demo {
  @base.cache('cacheKey', 3600, true) // 1h
  doSomeThings(num: number) {
    return num + count;
  }
}

const demo = new Demo();

// 1
const result = await demo.doSomeThings(1);

// 1
const result1 = await demo.doSomeThings(2);

await base.redis.del('cacheKey');

// 2
const result2 = await demo.doSomeThings(2);

```

### hash cache

```ts
/**
 * HASH Cache decorator
 *
 * hkey `string` HASH Cache key
 */

import { BaseRedis } from '@acheetahk/redis';

let count = 0;

const base = new BaseRedis(`<YOUR OPTIONS>`);

class Demo {
  @base.hashCache('hkey') // 1h
  doSomeThings(num: number) {
    return num + count;
  }
}

const demo = new Demo();

// 1
const result = await demo.doSomeThings(1);

// 1
const result1 = await demo.doSomeThings(2);

// 2
await base.redis.hdel('hkey', autoMd5([1]));
const result2 = await demo.doSomeThings(2);

```
