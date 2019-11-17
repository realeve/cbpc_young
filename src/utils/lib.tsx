import * as R from 'ramda';
import * as axios from './axios';

export const getType = axios.getType;

export const isChineseWord = str => new RegExp(/[\u00A1-\uFFFF]/).test(str);

// 中文宽1，其余宽0.7
export const getStringWidth = str =>
  String(str)
    .split('')
    .reduce((x, y) => x + (isChineseWord(y) ? 1 : 0.7), 0);

export const getTableExtraLabel = ({ header, data }) => {
  if (R.isNil(data) || data.length === 0) {
    return [];
  }
  return header.map((item, idx) => `${item}:${data[0][idx]}`);
};

interface CartReelReg {
  (str: string | number): boolean;
}
export const hasDecimal: CartReelReg = str => /^(-|\+|)\d+\.\d+$/.test(String(str));

interface Store {
  payload: any;
}
export const setStore = (state, store: Store) => {
  let { payload } = store;
  if (typeof payload === 'undefined') {
    payload = store;
    // throw new Error('需要更新的数据请设置在payload中');
  }
  let nextState = R.clone(state);
  Object.keys(payload).forEach(key => {
    let val = payload[key];
    if (getType(val) == 'object') {
      nextState[key] = Object.assign({}, nextState[key], val);
    } else {
      nextState[key] = val;
    }
  });
  return nextState;
};

/**
 *
 * @param {file文件对象，input type="file"} file
 * @param {回调函数} callback
 * @desc 将file图像文件对象转换为BASE64
 */
export let loadDataFile: (file: File) => Promise<null | Blob> = async (file: File) => {
  if (typeof FileReader === 'undefined') {
    return Promise.resolve(null);
  }

  let reader: FileReader = new FileReader();
  reader.readAsArrayBuffer(file);

  return new Promise(resolve => {
    reader.onload = ({ target: { result } }: { target: { result: Blob } }) => {
      resolve(result);
    };
  });
};
