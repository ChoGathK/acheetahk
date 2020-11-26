#

[![@](https://img.shields.io/badge/Github-@acheetahk/cloudtools-brightgreen.svg)](https://github.com/A-CheetahK/acheetahk/actions?query=workflow%3A%22Node.js+CI%22)
[![npm](https://img.shields.io/npm/v/@acheetahk/cloudtools)](https://www.npmjs.com/package/@acheetahk/cloudtools)
![](https://badgen.net/npm/dt/@acheetahk/cloudtools)
[![codecov](https://codecov.io/gh/A-CheetahK/acheetahk/branch/master/graph/badge.svg)](https://codecov.io/gh/A-CheetahK/acheetahk)
![](https://img.shields.io/npm/l/@acheetahk/cloudtools.svg)

> Please use version greater than 2.0.0

## Support List

* aliyun

## Installation

```shell
npm install @acheetahk/cloudtools

cnpm install @acheetahk/cloudtools

yarn add @acheetahk/cloudtools
```

## Usage

```ts
import { SLS, OSS } from '@acheetahk/cloudtools';
```

### SLS

```ts
import { SLS } from '@acheetahk/cloudtools';

const logger = new SLS.SLSLogger('TOPIC', options);
```

#### SLS.SLSLogger args

|param|type|require|
|:-:|:-:|:-:|
|`topic`|`string`|true|
|`options`|`SLSOptions`|true|

##### SLS.SLSLogger SLSOptions

> see: [aliyun doc](https://help.aliyun.com/document_detail/29008.html?spm=a2c4g.11186623.6.1158.48033560za06qo)

```ts
accessKeyId: string; // access secret you create
accessKeySecret: string; // access secret you create
endpoint?: string; // oss region domain. It takes priority over region.
apiVersion?: string; // 2015-06-01
project: string;
logStore: string;
```

### SLS.SLSLogger method (logger level)

```ts
// log put =====> aliyun sls
logger.info('simple logger', 'info');
logger.error('simple logger');
logger.debug('simple logger');
logger.fatal('simple logger');
logger.trace('simple logger');
logger.fatal('simple logger');
logger.warn('simple logger');
```

#### SLS.SLSLogger method args

|param|type|require|
|:-:|:-:|:-:|
|`value`|`string`|true|
|`source`|`string`|true|

### OSS

```ts
import { OSS } from '@acheetahk/cloudtools';
import { fileToBuffer } from '@acheetahk/request';

const storage = new OSS.BaseOSS(options);

const buffer = await fileToBuffer('http://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png');

// const buffer = fs.readFileSync(<path>);
```

#### OSS.BaseOSS options

```ts
accessKeyId: string; // access secret you create
accessKeySecret: string; // access secret you create
stsToken?: string; // used by temporary authorization
bucket?: string; //  the default bucket you want to access If you don't have any bucket, please use putBucket() create one first.
endpoint?: string; // oss region domain. It takes priority over region.
region?: string; // the bucket data region location, please see Data Regions, default is oss-cn-hangzhou.
internal?: boolean; //  access OSS with aliyun internal network or not, default is false. If your servers are running on aliyun too, you can set true to save lot of money.
secure?: boolean; // instruct OSS client to use HTTPS (secure: true) or HTTP (secure: false) protocol.
timeout?: string | number; // instance level timeout for all operations, default is 60s
cname?: boolean; // use custom domain name
```

### OSS.BaseOSS upload

```ts
// upload
const result = await storage.upload('/test/test.png', buffer);
const result1 = await storage.upload('/test/test1.png', buffer, 'put');
const result2 = await storage.upload('/test/test2.png', buffer, 'putStream');
```

#### OSS.BaseOSS upload args

|param|type|require|
|:-:|:-:|:-:|
|`path`|`string`|true|
|`fileBuffer`|`Buffer`|true|
|`type`|`type: 'put' | 'putStream'`|true|

### OSS.BaseOSS delete

```ts
// delete
await storage.delete('/test/test.png');
```

#### OSS.BaseOSS delete args

|param|type|require|
|:-:|:-:|:-:|
|`path`|`string`|true|
