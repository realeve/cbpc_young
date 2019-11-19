import { setStore } from '@/utils/lib';
import moment from 'moment';
import { LocalStorageKeys } from '@/utils/setting';
import { Dispatch } from 'redux';
import { decodeBase64 } from '@/utils/lib';

export interface ICommon {
  tstart: string;
  tend: string;
  user: {
    uid: string;
    username: string;
    deptname: string;
    gm: number;
    manage_dept: string;
  };
}
const namespace = 'common';
export default {
  namespace,
  state: {
    tstart: moment().format('YYYY-01'),
    tend: moment().format('YYYY-MM'),
    user: {
      uid: '',
      username: '',
      deptname: '',
      gm: 0,
      manage_dept: '',
    },
  },
  reducers: {
    setStore,
  },
  subscriptions: {
    setup({ dispatch }: { dispatch: Dispatch }) {
      let res = window.localStorage.getItem(LocalStorageKeys.userinfo);
      if (res) {
        let user = JSON.parse(decodeBase64(res));
        dispatch({
          type: 'setStore',
          payload: { user },
        });
      }
    },
  },
};
