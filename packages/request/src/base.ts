import axios from 'axios';
import * as FormData from 'form-data';
import { stringify } from 'querystring';

import { FormDataOptions, RequestOptions, AxiosResponse, AxiosRequestConfig } from './types';

/**
 * Fast to web request
 *
 * options `RequestOptions` request args
 *
 */
export const fastRequest = async (options: RequestOptions) => {
  if (!options) throw new Error('Incomplete arameters !');

  // query
  if (options.url && options.query) {
    options.url = `${options.url}?${stringify(options.query)}`;
  }

  const response: AxiosResponse = await axios(options);
  return response;
};

/**
 * Fast to web form-data request
 *
 * options `FormDataOptions` form-data request args
 *
 */
export const fastFormData = async (options: FormDataOptions) => {
  if (!options) throw new Error('Incomplete arameters !');

  const { url, data, configs } = options;
  if (!data || !url) throw new Error('Incomplete arameters !');

  const formData = new FormData();

  Object
    .keys(data)
    .forEach((key: string) => formData.append(key, data[key]));

  const headers = configs && configs.headers
    ? { ...configs.headers, ...formData.getHeaders() }
    : formData.getHeaders();

  const common: AxiosRequestConfig = { url, headers, method: 'POST', data: formData };

  const formDataOptions: AxiosRequestConfig = configs ? { ...configs, ...common } : common;

  const response: AxiosResponse = await axios(formDataOptions);
  return response;
};
