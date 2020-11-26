import { createHash } from 'crypto';

export const autoMd5 = (args: any) => {
  const str = JSON.stringify(args);
  return createHash('md5').update(str).digest('base64');
};

