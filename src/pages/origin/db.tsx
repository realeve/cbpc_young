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
tbl_cbpc_young_other AS a
 
 *   @database: { 接口管理 }
 *   @desc:     { 青年岗位积分——额外加分 } 
 */
export const getCbpcYoungOther = () =>
  DEV
    ? mock(require('@/mock/93_1a31795568.json'))
    : axios({
        url: '/93/1a31795568.json',
      });

/**
 * SELECT a.username, a.deptname,a.rec_date,a.prod_quality,a.prod_produce,a.prod_cost,a.support_prod,a.support_attitude,a.manager,a.score FROM tbl_cbpc_young_base AS a
 *
 *   @database: { 接口管理 }
 *   @desc:     { 青年岗位积分——岗位业绩积分 }
 */
export const getCbpcYoungBase = () =>
  DEV
    ? mock(require('@/mock/94_966772bc13.json'))
    : axios({
        url: '/94/966772bc13.json',
      });
