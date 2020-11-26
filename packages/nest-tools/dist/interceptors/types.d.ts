/**
 * Response Args
 *
 * code `number | string` Custom code
 *
 * timestamp `number` Server timestamp
 *
 * message `string` Response message
 *
 * data `T` Response Data
 *
 * requestId `string` Request Id
 *
 */
export interface ResponseArgs<T> {
    code?: number | string;
    requestId?: string;
    timestamp?: number;
    message?: string;
    data?: T;
}
