export const isIP = (ip: string) => {
  const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  return reg.test(ip);
};

export const getIp = (requset: any) => {
  let ip = '';
  const { headers, socket, connection } = requset;

  const real = [
    headers['ali-cdn-real-ip'] || null,
    headers['x-forwarded-for'] || null,
    connection.remoteAddress || null,
    socket.remoteAddress || null,
    requset.ip || null,
  ].find((e) => e);

  if (!real) return '';
  if (real.indexOf(',')) ip = real.split(',')[0];
  if (ip.substr(0, 7) === '::ffff:') ip = ip.substr(7);
  return isIP(ip) ? ip : '';
};
