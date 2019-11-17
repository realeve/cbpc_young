import React from 'react';
import styles from './index.less';
import { Layout, Menu, ConfigProvider } from 'antd';
import { Logo } from '@/components';
import zhCN from 'antd/es/locale/zh_CN';
import router from 'umi/router';
import { connect } from 'dva';

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
];
interface IProps {
  children: React.ReactNode;
  location: {
    pathname: string;
  };
}
const App = ({ children, location }: IProps) => (
  <div className={styles.container}>
    <Layout className={styles.layout}>
      <Header>
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
      </Header>
      <Content style={{ margin: 50, padding: 24, background: '#fff', flex: 1 }}>{children}</Content>
      <Footer style={{ textAlign: 'center' }}>CBPC ©2019</Footer>
    </Layout>
  </div>
);

export default connect()(({ children, ...props }: IProps) => (
  <ConfigProvider locale={zhCN}>
    <App {...props}>{children}</App>
  </ConfigProvider>
));
