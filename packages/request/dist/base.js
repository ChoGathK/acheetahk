"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fastFormData = exports.fastRequest = void 0;
const axios_1 = require("axios");
const FormData = require("form-data");
const querystring_1 = require("querystring");
/**
 * Fast to web request
 *
 * options `RequestOptions` request args
 *
 */
const fastRequest = async (options) => {
    if (!options)
        throw new Error('Incomplete arameters !');
    // query
    if (options.url && options.query) {
        options.url = `${options.url}?${querystring_1.stringify(options.query)}`;
    }
    const response = await axios_1.default(options);
    return response;
};
exports.fastRequest = fastRequest;
/**
 * Fast to web form-data request
 *
 * options `FormDataOptions` form-data request args
 *
 */
const fastFormData = async (options) => {
    if (!options)
        throw new Error('Incomplete arameters !');
    const { url, data, configs } = options;
    if (!data || !url)
        throw new Error('Incomplete arameters !');
    const formData = new FormData();
    Object
        .keys(data)
        .forEach((key) => formData.append(key, data[key]));
    const headers = configs && configs.headers
        ? { ...configs.headers, ...formData.getHeaders() }
        : formData.getHeaders();
    const common = { url, headers, method: 'POST', data: formData };
    const formDataOptions = configs ? { ...configs, ...common } : common;
    const response = await axios_1.default(formDataOptions);
    return response;
};
exports.fastFormData = fastFormData;
