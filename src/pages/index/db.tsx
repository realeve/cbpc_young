import { axios, DEV, mock } from '@/utils/axios';

/**
 
  SELECT a.username,a.deptname,a.base_score,round(b.other_score,2) other_score,round( a.base_score + b.other_score,2 ) score FROM ( SELECT a.username,a.usercode,a.deptname,round(avg( a.score ) * 0.55,2) base_score FROM tbl_cbpc_young_base AS a where a.rec_date between ? and ? GROUP BY a.username,a.usercode,a.deptname ) a INNER JOIN ( SELECT a.usercode,sum( a.score ) * ( CASE score_type WHEN '能力素质积分' THEN 0.2 WHEN '活动积分' THEN 0.15 WHEN '组织公民行为积分' THEN 0.1 ELSE 1 END ) other_score FROM tbl_cbpc_young_other AS a where a.rec_date between ? and ? GROUP BY a.usercode ) b ON a.usercode = b.usercode ORDER BY 5 DESC
  
*   @database: { 接口管理 }
*   @desc:     { 得分排名 } 
    const { tstart, tend } = params;
*/
export const getCbpcYoungOther = (params: any) =>
  axios({
    url: '/687/cd24026726.json',
    params,
  });
/**
*   @database: { 接口管理 }
*   @desc:     { 青年积分排名(不含活动积分、公民行为积分) } 
    const { tstart, tend, tstart2, tend2 } = params;
*/
export const getCbpcYoungOther2 = params =>
  axios({
    url: '/693/c578560fbf.json',
    params,
  });
