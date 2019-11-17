import React from 'react';
import styles from './index.less';
import { Layout, Menu, ConfigProvider, DatePicker, message } from 'antd';
import { Logo } from '@/components';
import zhCN from 'antd/es/locale/zh_CN';
import router from 'umi/router';
import { connect } from 'dva';
import moment from 'moment';

const { MonthPicker } = DatePicker;

const { Header, Content, Footer } = Layout;

const menu = [
  {
    title: '得分排名',
    url: '/',
  },
  {
    title: '原始数据',
    url: '/origin',
  },
  {
    title: '导入信息',
    url: '/import',
  },
];
interface IProps {
  children: React.ReactNode;
  location: {
    pathname: string;
  };
}
const App = ({ children, location, dispatch, tstart, tend }: IProps) => (
  <div className={styles.container}>
    <Layout className={styles.layout}>
      <Header>
        <div className={styles.center}>
          <Logo className={styles.logo} style={{ width: 32 }} />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[location.pathname]}
            style={{ lineHeight: '64px' }}
          >
            {menu.map(item => (
              <Menu.Item key={item.url} onClick={() => router.push(item.url)}>
                {item.title}
              </Menu.Item>
            ))}
          </Menu>
        </div>
        <div className={styles.center}>
          <MonthPicker
            placeholder="开始月份"
            onChange={(_, tstart) => {
              if (tend.length > 0 && tstart > tend) {
                message.error('无效的日期：开始月份必须 大于 结束月份');
                return;
              }
              dispatch({
                type: 'common/setStore',
                payload: { tstart },
              });
            }}
            value={moment(tstart)}
          />
          <span style={{ margin: '0 10px', color: '#fff' }}>至</span>
          <MonthPicker
            placeholder="结束月份"
            value={moment(tend)}
            onChange={(_, tend) => {
              if (tstart > tend) {
                message.error('无效的日期：开始月份必须 大于 结束月份');
                return;
              }
              dispatch({
                type: 'common/setStore',
                payload: { tend },
              });
            }}
          />
        </div>
      </Header>
      <Content style={{ margin: 50, padding: 24, background: '#fff', flex: 1 }}>{children}</Content>
      <Footer style={{ textAlign: 'center' }}>CBPC ©2019</Footer>
    </Layout>
  </div>
);

export default connect(({ common }) => common)(({ children, ...props }: IProps) => (
  <ConfigProvider locale={zhCN}>
    <App {...props}>{children}</App>
  </ConfigProvider>
));
