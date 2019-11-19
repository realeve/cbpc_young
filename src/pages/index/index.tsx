import React, { useState } from 'react';
import { useFetch, Table } from '@/components';
import { connect } from 'dva';
import { ICommon } from '@/models/common';
import { Input } from 'antd';

interface IDbData {
  username: string;
  usercode: string;
  deptname: string;
  base_score: string;
  other_score: number;
  score: number;
}

const columns = [
  {
    title: '排名',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: '姓名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '部门',
    dataIndex: 'deptname',
    key: 'deptname',
  },
  {
    title: '岗位业绩得分',
    dataIndex: 'base_score',
    key: 'base_score',
    sorter: (a: IDbData, b: IDbData) => Number(a.base_score) - Number(b.base_score),
  },
  {
    title: '其它加分',
    dataIndex: 'other_score',
    key: 'other_score',
    sorter: (a: IDbData, b: IDbData) => a.other_score - b.other_score,
  },
  {
    title: '能力素质',
    dataIndex: 'ability_score',
    key: 'ability_score',
    sorter: (a: IDbData, b: IDbData) => a.ability_score - b.ability_score,
  },
  {
    title: '活动',
    dataIndex: 'sport_score',
    key: 'sport_score',
    sorter: (a: IDbData, b: IDbData) => a.sport_score - b.sport_score,
  },
  {
    title: '组织公民行为',
    dataIndex: 'public_score',
    key: 'public_score',
    sorter: (a: IDbData, b: IDbData) => a.public_score - b.public_score,
  },
  {
    title: '技术创新',
    dataIndex: 'tech_score',
    key: 'tech_score',
    sorter: (a: IDbData, b: IDbData) => a.tech_score - b.tech_score,
  },
  {
    title: '总分',
    dataIndex: 'score',
    key: 'score',
    sorter: (a: IDbData, b: IDbData) => a.score - b.score,
  },
];

export default connect(({ common }: { common: ICommon }) => common)(({ tstart, tend }: ICommon) => {
  const { data, loading } = useFetch<{
    title: string;
    data: IDbData[];
  }>({
    param: {
      url: '/687/cd24026726.json',
      params: { tstart, tend, tstart2: tstart, tend2: tend },
    },
    valid: () => tstart.length > 0 && tend.length > 0,
  });
  const { data: data2, loading: loading2 } = useFetch<{
    title: string;
    data: IDbData[];
  }>({
    param: {
      url: '/693/c578560fbf.json',
      params: { tstart, tend, tstart2: tstart, tend2: tend },
    },
    valid: () => tstart.length > 0 && tend.length > 0,
  });

  const [filter, setFilter] = useState('');

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        数据过滤：
        <Input
          style={{ width: 220 }}
          placeholder="过滤的人员信息(姓名、部门、编号)"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
      </div>

      <Table
        daterange={[tstart, tend]}
        loading={loading}
        data={data}
        filter={filter}
        columns={columns}
      />
      <Table
        style={{ marginTop: 30 }}
        daterange={[tstart, tend]}
        loading={loading2}
        data={data2}
        filter={filter}
        columns={columns}
      />
    </>
  );
});
