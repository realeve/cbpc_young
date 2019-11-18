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
