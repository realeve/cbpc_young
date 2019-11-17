import * as R from 'ramda';

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
