import { Options, PutObjectResult, NormalSuccessResponse } from 'ali-oss';
interface SuccessStreamResponse {
    name?: string;
    res?: NormalSuccessResponse;
}
interface DeleteResponse {
    res?: NormalSuccessResponse;
    status?: number;
    headers?: object;
    size?: number;
    rt?: number;
}
export { Options, PutObjectResult, NormalSuccessResponse, DeleteResponse, SuccessStreamResponse };
