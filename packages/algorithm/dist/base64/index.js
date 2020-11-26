"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectDecode = void 0;
/**
 * base64 解码为对象
 *
 * crypted: `string` 需要解码的文本
 */
function objectDecode(crypted) {
    const hexStr = Buffer.from(crypted, 'base64');
    const hexData = hexStr.toString('hex');
    const jsonStr = Buffer.from(hexData, 'hex');
    const json = jsonStr.toString('utf8');
    const data = JSON.parse(json);
    return data;
}
exports.objectDecode = objectDecode;
//# sourceMappingURL=index.js.map