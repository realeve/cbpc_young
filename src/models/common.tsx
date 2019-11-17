import { setStore } from '@/utils/lib';
import moment from 'moment';
export interface ICommon {
  tstart: string;
  tend: string;
}
const namespace = 'common';
export default {
  namespace,
  state: {
    tstart: moment().format('YYYY-MM'),
    tend: moment().format('YYYY-MM'),
  },
  reducers: {
    setStore,
  },
  subscriptions: {},
};
