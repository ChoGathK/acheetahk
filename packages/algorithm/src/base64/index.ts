/**
 * base64 解码为对象
 *
 * crypted: `string` 需要解码的文本
 */
export function objectDecode(crypted: string) {
  const hexStr = Buffer.from(crypted, 'base64');
  const hexData = hexStr.toString('hex');

  const jsonStr = Buffer.from(hexData, 'hex');
  const json = jsonStr.toString('utf8');

  const data = JSON.parse(json);
  return data;
}
