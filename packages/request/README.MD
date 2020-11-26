#

[![@](https://img.shields.io/badge/Github-@acheetahk/request-brightgreen.svg)](https://github.com/A-CheetahK/acheetahk/actions?query=workflow%3A%22Node.js+CI%22)
[![npm](https://img.shields.io/npm/v/@acheetahk/request)](https://www.npmjs.com/package/@acheetahk/request)
![](https://badgen.net/npm/dt/@acheetahk/request)
[![codecov](https://codecov.io/gh/A-CheetahK/acheetahk/branch/master/graph/badge.svg)](https://codecov.io/gh/A-CheetahK/acheetahk)
![](https://img.shields.io/npm/l/@acheetahk/request.svg)

> Please use version greater than 2.0.0

## Installation

```shell
npm install @acheetahk/request

cnpm install @acheetahk/request

yarn add @acheetahk/request
```

## Usage

```ts
//  example of fastRequest
import { fastRequest } from '@acheetahk/request';
```

### fastRequest

#### get

```ts
  import { fastRequest } from '@acheetahk/request';

  const response = await fastRequest({
    url,
    method: 'GET',
  });
```

#### post

```ts
  import { fastRequest } from '@acheetahk/request';

  const response = await fastRequest({
    url,
    method: 'POST',
    data: { value: 'test post' },
  });
```

#### put

```ts
  import { fastRequest } from '@acheetahk/request';

  const response = await fastRequest({
    url,
    method: 'PUT',
    data: { value: 'test put' },
  });
```

#### RequestOptions

|param|type|explain|require|
|:-:|:-:|:-:|:-:|
|`url`|string|Resources to address|true|
|`method`|`GET` `DELETE` `HEAD` `OPTIONS` `POST` `PUT` `PATCH` `PURGE` `LINK` `UNLINK`|The request method|true|
|`headers`|any|The request header|false|
|`query`|any|Concatenate parameters in the URL|false|
|`data`|any|`data` Apply only to these request methods 'PUT', 'POST', and 'PATCH'|false|
|`timeout`|number|timeout Units are seconds|false|
|`withCredentials`|boolean|allows cookie information to be carried across domains|false|
|`responseType`|`arraybuffer` `blob` `document` `json` `text` `stream`|response-type|false|
|`onUploadProgress`|(progressEvent: any) => void|Configure the progress on upload|false|
|`onDownloadProgress`|(progressEvent: any) => void|Configure the progress on download|false|
|`proxy`|{ `host`: string, `port`: number, `auth`: {  `username`: string, `password`: string } }| Configure proxy |false|
|`decompress`|boolean| indicates whether or not the response body should be decompressed |false|

<br>

### fastFormData

```ts
  import * as fs from 'fs';
  import { fastFormData } from '@acheetahk/request';

  const response = await fastFormData(
    {
      url,
      data: {
        name: 'test formData',
        file: fs.createReadStream(resolve(__dirname, './xx.xx')),
      },
    },
  );
```

#### FormDataOptions

|param|type|explain|require|
|:-:|:-:|:-:|:-:|
|`url`|string|Resources to address|true|
|`data`|any|`form-data body`|true|
|`configs`|`RequestOptions`| ⬇️  👀 |true|

#### FormDataOptions·configs

|param|type|explain|require|
|:-:|:-:|:-:|:-:|
|`headers`|any|The request header|false|
|`timeout`|number|timeout Units are seconds|false|
|`withCredentials`|boolean|allows cookie information to be carried across domains|false|
|`responseType`|`arraybuffer` `blob` `document` `json` `text` `stream`|response-type|false|
|`onUploadProgress`|(progressEvent: any) => void|Configure the progress on upload|false|
|`onDownloadProgress`|(progressEvent: any) => void|Configure the progress on download|false|
|`proxy`|{ `host`: string, `port`: number, `auth`: {  `username`: string, `password`: string } }| Configure proxy |false|
|`decompress`|boolean| indicates whether or not the response body should be decompressed |false|

<br>

### fastProxy

> Delegate to the specified express.js / nest.js service

#### example of express

```ts
import * as express from 'express';
import { fastProxy } from '@acheetahk/request';

const app = express();

const router = express.Router();

app.use('/express', router);

router.all('*', async (requset: Request, response: Response) => {
  await fastProxy(
    requset,
    response,
    {
      host: '<The server host that requires a proxy>',
      port: '<The server port that requires a proxy>',
      isRewrite: true,
      rewrite: '/express/',
      body: requset.body,
      path: requset.originalUrl,
      headers: requset.headers,
    },
  );
});

const server = app.listen(8000);
```

#### fastProxy - Options

|param|type|explain|require|
|:-:|:-:|:-:|:-:|
|`req`|`express.request`|The bottom layer is HTTP.IncomingMessage|true|
|`res`|`express.response`|The bottom layer is HTTP.ServerResponse|true|
|`options`|`ProxyOptions`| ⬇️  👀 |true|

##### ProxyOptions

|param|type|explain|require|
|:-:|:-:|:-:|:-:|
|`host`| string |The server host that requires a proxy|true|
|`port`| number |The server port that requires a proxy|true|
|`path`|string|The routing address|true|
|`headers`|any|The request header|true|
|`body`| any |The request body|false|
|`timeout`|number|timeout Units are seconds|false|
|`isRewrite`|boolean|Whether to override the routing address|false|
|`rewrite`|string|example of rewrite rule: `'/express/' ==> '/'`|false|

<br>

### fileDownload

> Download the file and return to the local file path

```ts
import { resolve } from 'path';

const path = resolve(__dirname, './fileDownload');
const url = 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png';

// result -> The full path of the downloaded file
const result = await fileDownload(url, path);
```

#### fileDownload [args]

|param|type|require|
|:-:|:-:|:-:|
|url|string|true|
|path|string|true|

<br>

### fileToStr

> Convert the network file into a string of the specified encoding

```ts
const url = 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png';
const result = await fileToStr(url);
```

#### fileToStr [args]

|param|type|explain|require|
|:-:|:-:|:-:|:-:|
|url|string|url|true|
|type|string|Encoding type, the default is `base64`|true|

<br>

### fileToBuffer

> Convert web files to Buffer

```ts
const url = 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png';
const result = await fileToBuffer(url, path);
```

#### fileToBuffer [args]

|param|type|require|
|:-:|:-:|:-:|
|url|string|true|

---

[LICENSE](https://github.com/A-CheetahK/acheetahk/blob/master/LICENSE)
