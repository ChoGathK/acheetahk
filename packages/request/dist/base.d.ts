import { FormDataOptions, RequestOptions, AxiosResponse } from './types';
/**
 * Fast to web request
 *
 * options `RequestOptions` request args
 *
 */
export declare const fastRequest: (options: RequestOptions) => Promise<AxiosResponse<any>>;
/**
 * Fast to web form-data request
 *
 * options `FormDataOptions` form-data request args
 *
 */
export declare const fastFormData: (options: FormDataOptions) => Promise<AxiosResponse<any>>;
