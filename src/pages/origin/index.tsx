import React from 'react';
import { useFetch, Table } from '@/components';

interface IDbData {
  username: string;
  deptname: string;
  rec_date: string;
  score_type: string;
  score: number;
  remark: string;
}

const columnsOther = [
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
    title: '记录月份',
    dataIndex: 'rec_date',
    key: 'rec_date',
    sorter: (a: IDbData, b: IDbData) => a.rec_date.localeCompare(b.rec_date),
  },
  {
    title: '得分类型',
    dataIndex: 'score_type',
    key: 'score_type',
  },
  {
    title: '得分',
    dataIndex: 'score',
    key: 'score',
    sorter: (a: IDbData, b: IDbData) => a.score - b.score,
  },
  {
    title: '备注信息',
    dataIndex: 'remark',
    key: 'remark',
  },
];

const columnsBase = [
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
    title: '记录月份',
    dataIndex: 'rec_date',
    key: 'rec_date',
    sorter: (a: IDbData, b: IDbData) => a.rec_date.localeCompare(b.rec_date),
  },
  {
    title: '生产操作岗',
    children: [
      {
        title: '质量',
        dataIndex: 'prod_quality',
        key: 'prod_quality',
      },
      {
        title: '产量',
        dataIndex: 'prod_produce',
        key: 'prod_produce',
      },
      {
        title: '成本',
        dataIndex: 'prod_cost',
        key: 'prod_cost',
      },
    ],
  },
  {
    title: '生产保障岗位',
    children: [
      {
        title: '非计划停机时间',
        dataIndex: 'support_prod',
        key: 'support_prod',
      },
      {
        title: '服务态度',
        dataIndex: 'support_attitude',
        key: 'support_attitude',
      },
    ],
  },
  {
    title: '管理技术人员',
    children: [
      {
        title: '绩效得分',
        dataIndex: 'manager',
        key: 'manager',
      },
    ],
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
      url: '/93/1a31795568.json',
    },
  });

  const { data: base, loading: loadingBase } = useFetch({
    param: {
      url: '/94/966772bc13.json',
    },
  });

  return (
    <>
      <Table loading={loadingBase} data={base} columns={columnsBase} />
      <Table loading={loading} data={data} columns={columnsOther} style={{ marginTop: 30 }} />
    </>
  );
}
