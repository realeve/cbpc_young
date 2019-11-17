import React from 'react';
import { useFetch, Table } from '@/components';

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
    title: '总分',
    dataIndex: 'score',
    key: 'score',
    sorter: (a: IDbData, b: IDbData) => a.score - b.score,
  },
];

export default function() {
  const { data, loading } = useFetch<{
    title: string;
    data: IDbData[];
  }>({
    param: {
      url: '/92/cd24026726.json',
    },
  });

  return <Table loading={loading} data={data} columns={columns} />;
}
