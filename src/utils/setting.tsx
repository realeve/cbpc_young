export let DEV: boolean = false; // process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';

/**
 * 生产环境
 */
const SETTING: { [key: string]: string } = {
  host: DEV ? '//localhost:90' : '//10.8.1.25:100',
};

// 后台api部署域名
const host: string = SETTING.host;
const domain = host;

export { domain, host };

export const LocalStorageKeys = {
  user: 'user', // 用户身份
  userinfo: 'userinfo',
};

export let AUTHOR = '成都印钞有限公司';

export let company = AUTHOR;
