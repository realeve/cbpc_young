import { axios, DEV, mock } from '@/utils/axios';

/**
 
SELECT 
a.username, 
a.deptname,
a.rec_date,
a.score_type,
a.score,
a.remark
FROM
tbl_cbpc_young_other AS a where a.rec_date between ? and ?
 
 *   @database: { 接口管理 }
 *   @desc:     { 青年岗位积分——额外加分 } 
 */
export const getCbpcYoungOther = () =>
  axios({
    url: '/93/1a31795568.json',
  });

/**
 * SELECT a.username,a.deptname,a.rec_date,a.prod_quality,a.prod_produce,a.prod_cost,a.support_prod,a.support_attitude,a.manager,a.score FROM tbl_cbpc_young_base AS a where a.rec_date between ? and ?
 *
 *   @database: { 接口管理 }
 *   @desc:     { 青年岗位积分——岗位业绩积分 }
 */
export const getCbpcYoungBase = () =>
  axios({
    url: '/94/966772bc13.json',
  });

/**
*   @database: { 接口管理 }
*   @desc:     { 青年积分系统_删除额外加分 } 
	以下参数在建立过程中与系统保留字段冲突，已自动替换:
	@id:_id. 参数说明：api 索引序号
      */
export const delCbpcYoungOther = _id =>
  axios({
    url: '/99/67625fb6e7.json',
    params: {
      _id,
    },
  });

/**
*   @database: { 接口管理 }
*   @desc:     { 青年积分系统_删除基础数据 } 
	以下参数在建立过程中与系统保留字段冲突，已自动替换:
	@id:_id. 参数说明：api 索引序号
      */
export const delCbpcYoungBase = _id =>
  axios({
    url: '/100/d027eb0f64.json',
    params: {
      _id,
    },
  });

/**
*   @database: { 接口管理 }
*   @desc:     { 青年积分系统_额外加分修改 } 
	以下参数在建立过程中与系统保留字段冲突，已自动替换:
	@id:_id. 参数说明：api 索引序号
    const { rec_date, remark, score, score_type, _id } = params;
*/
export const setCbpcYoungOther = params =>
  axios({
    url: '/101/74654847ae.json',
    params,
  });
