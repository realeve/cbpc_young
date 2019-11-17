import { axios, DEV, mock } from '@/utils/axios';

/**
 
	SELECT a.*,b.other_score,round( a.base_score + b.other_score,2 ) score FROM ( SELECT a.username, a.usercode, a.deptname, avg( a.score ) * 0.55 base_score FROM tbl_cbpc_young_base AS a GROUP BY a.username, a.usercode, a.deptname ) a INNER JOIN ( SELECT a.usercode, sum( a.score ) * ( CASE score_type WHEN '能力素质积分' THEN 0.2 WHEN '活动积分' THEN 0.15 WHEN '组织公民行为积分' THEN 0.1 ELSE 1 END ) other_score FROM tbl_cbpc_young_other AS a GROUP BY a.usercode ) b ON a.usercode = b.usercode ORDER BY 6 DESC 

*   @database: { 接口管理 }
*   @desc:     { 得分排名 } 
    const { tstart, tend } = params;
*/
export const getCbpcYoungOther = (params: any) =>
  DEV
    ? mock(require('@/mock/92_cd24026726.json'))
    : axios({
        url: '/92/cd24026726.json',
        params,
      });
