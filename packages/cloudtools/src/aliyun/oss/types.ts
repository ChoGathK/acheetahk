import { Options, PutObjectResult, NormalSuccessResponse } from 'ali-oss';

interface SuccessStreamResponse {
  name?: string;
  res?: NormalSuccessResponse;
}

interface DeleteResponse {
  res?: NormalSuccessResponse;
  // response status
  status?: number;
  // response headers
  headers?: object; // todo the object in detail
  // response size
  size?: number;
  //  request total use time (ms)
  rt?: number;
}

export { Options, PutObjectResult, NormalSuccessResponse, DeleteResponse, SuccessStreamResponse };
