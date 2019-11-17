export let DEV: boolean = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';

/**
 * 生产环境
 */
const SETTING: { [key: string]: string } = {
  host: '//localhost:90',
};

// 后台api部署域名
const host: string = SETTING.host;
const domain = host;

export { domain, host };

export const LocalStorageKeys = {
  user: 'user', // 用户身份
};

export let AUTHOR = '成都印钞有限公司';

export let company = AUTHOR;
