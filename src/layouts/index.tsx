import React, { useState } from 'react';
import styles from './index.less';
import {
  Layout,
  Menu,
  ConfigProvider,
  DatePicker,
  message,
  Avatar,
  Dropdown,
  Modal,
  notification,
  Input,
} from 'antd';
import { Logo } from '@/components';
import zhCN from 'antd/es/locale/zh_CN';
import router from 'umi/router';
import { connect } from 'dva';
import moment from 'moment';
import { useSetState } from 'react-use';
import { ICommon } from '@/models/common';
import { Dispatch } from 'redux';
import { axios } from '@/utils/axios';
import { LocalStorageKeys } from '@/utils/setting';
import { encodeBase64 } from '@/utils/lib';
import * as R from 'ramda';
import { userInfo } from 'os';
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

/**
*   @database: { 接口管理 }
*   @desc:     { 岗位积分系统登录 } 
    const { username, password } = params;
*/
export const getCbpcYoungUser = params =>
  axios({
    url: '/692/ca81a02b59.json',
    params,
  });

interface IProps extends ICommon {
  children: React.ReactNode;
  location: {
    pathname: string;
  };
  dispatch: Dispatch;
}
const App = ({ children, location, dispatch, tstart, tend, user }: IProps) => {
  const [visible, setVisible] = useState(user.username.length === 0);

  return (
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
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item
                    key="1"
                    onClick={() => {
                      if (user.username.length > 0) {
                        window.localStorage.removeItem(LocalStorageKeys.userinfo);
                        window.location.reload();
                        return;
                      }
                      setVisible(true);
                    }}
                  >
                    {user.username.length > 0 && `退出`}登录
                  </Menu.Item>
                </Menu>
              }
            >
              <div
                className={styles.header}
                onClick={() => {
                  if (user.username.length > 0) {
                    return;
                  }
                  setVisible(true);
                }}
              >
                <Avatar size="large" icon="user" style={{ margin: '0 10px 0 30px' }} />

                {user.username.length > 0 ? (
                  <div className={styles.userInfo}>
                    <span className={styles.item}>{user.deptname}</span>
                    <span className={styles.item}>{user.username}</span>
                  </div>
                ) : (
                  <div className={styles.userInfo}>登录</div>
                )}
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content style={{ margin: 50, padding: 24, background: '#fff', flex: 1 }}>
          {!location.pathname.includes('/import') && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
              <span style={{ margin: 10 }}>起始月份：</span>
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
              <span style={{ margin: 10 }}>至</span>
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
          )}

          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>CBPC ©2019</Footer>
        <Login
          visible={visible}
          onOk={() => {
            setVisible(false);
          }}
          dispatch={dispatch}
          user={user}
        />
      </Layout>
    </div>
  );
};

const Login = ({
  visible,
  onOk,
  dispatch,
  user,
}: {
  visible: boolean;
  onOk: () => void;
  dispatch: Dispatch;
}) => {
  const [state, setState] = useSetState({
    username: '',
    password: '',
    dept: '',
  });

  return (
    <Modal
      title="登录"
      visible={visible}
      onOk={() => {
        getCbpcYoungUser(state).then(res => {
          if (res.rows === 0) {
            notification.error({ message: '登录失败', description: '用户名或密码错误' });
            return;
          }
          let user = res.data[0];
          let manage_dept = res.data
            .filter(item => item.manage_dept)
            .map(item => item.manage_dept)
            .join(',');
          user.manage_dept = manage_dept;

          window.localStorage.setItem(
            LocalStorageKeys.userinfo,
            encodeBase64(JSON.stringify(user)),
          );

          dispatch({
            type: 'common/setStore',
            payload: { user },
          });
          onOk();
        });
      }}
      onCancel={() => {
        if (user.username.length === 0) {
          message.error('请先登录');
          return;
        }
        onOk();
      }}
    >
      <Input
        style={{ width: 300 }}
        placeholder="用户名"
        value={state.username}
        onChange={e => setState({ username: e.target.value })}
      />
      <Input.Password
        style={{ width: 300, marginTop: 20 }}
        placeholder="密码"
        visibilityToggle
        value={state.password}
        onChange={e => setState({ password: e.target.value })}
      />
    </Modal>
  );
};

export default connect(({ common }) => common)(({ children, ...props }: IProps) => (
  <ConfigProvider locale={zhCN}>
    <App {...props}>{children}</App>
  </ConfigProvider>
));
