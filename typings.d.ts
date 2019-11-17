declare module '*.css';
declare module '*.less';
declare module '*.png';

// 图片文件引入时ts不认
declare module '*.svg';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';

interface IGAxios {
  host: string;
  token: string;
}
interface Window {
  g_axios: IGAxios;
}

declare let g_axios: IGAxios;
