"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoMd5 = void 0;
const crypto_1 = require("crypto");
const autoMd5 = (args) => {
    const str = JSON.stringify(args);
    return crypto_1.createHash('md5').update(str).digest('base64');
};
exports.autoMd5 = autoMd5;
