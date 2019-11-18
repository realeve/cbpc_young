import { IConfig } from 'umi-types';
import theme from '@ant-design/aliyun-theme';
// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  theme,
  exportStatic: false,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: { webpackChunkName: true },
        title: 'cbpc_young',
        dll: true,
        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
};

export default config;
