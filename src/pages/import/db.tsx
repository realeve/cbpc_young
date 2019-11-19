import { axios, DEV, mock, _commonData } from '@/utils/axios';

/**
*   @database: { 接口管理 }
*   @desc:     { 批量提交基础得分 } 
	以下参数在建立过程中与系统保留字段冲突，已自动替换:
	@desc:批量插入数据时，约定使用二维数组values参数，格式为[{username,usercode,deptname,rec_date,prod_quality,prod_produce,prod_cost,support_prod,support_attitude,manager,score }]，数组的每一项表示一条数据*/
export const addCbpcYoungBase = values =>
  axios({
    method: 'post',
    data: {
      values,
      id: 690,
      nonce: 'f6b1dff03f',
    },
  });

/**
*   @database: { 接口管理 }
*   @desc:     { 批量提交额外得分 } 
	以下参数在建立过程中与系统保留字段冲突，已自动替换:
	@desc:批量插入数据时，约定使用二维数组values参数，格式为[{username,usercode,deptname,rec_date,score_type,score,remark }]，数组的每一项表示一条数据*/
export const addCbpcYoungOther = values =>
  axios({
    method: 'post',
    data: {
      values,
      id: 691,
      nonce: 'd3450882c0',
    },
  });
