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
    idx: 0,
  },
  {
    title: '部门',
    dataIndex: 'deptname',
    key: 'deptname',
    idx: 1,
  },
  {
    title: '记录月份',
    dataIndex: 'rec_date',
    key: 'rec_date',
    sorter: (a: IDbData, b: IDbData) => a.rec_date.localeCompare(b.rec_date),
    idx: 2,
  },
  {
    title: '生产操作岗',
    children: [
      {
        title: '质量',
        dataIndex: 'prod_quality',
        key: 'prod_quality',
        idx: 3,
      },
      {
        title: '产量',
        dataIndex: 'prod_produce',
        key: 'prod_produce',
        idx: 4,
      },
      {
        title: '成本',
        dataIndex: 'prod_cost',
        key: 'prod_cost',
        idx: 5,
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
        idx: 6,
      },
      {
        title: '服务态度',
        dataIndex: 'support_attitude',
        key: 'support_attitude',
        idx: 7,
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
        idx: 8,
      },
    ],
  },
  {
    title: '总分',
    dataIndex: 'score',
    key: 'score',
    sorter: (a: IDbData, b: IDbData) => a.score - b.score,
    idx: 9,
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
      <Table
        loading={loadingBase}
        data={base}
        columns={columnsBase}
        merge={['3-5', '6-7', '8']}
        mergetext={['生产操作岗', '生产保障岗位', '管理技术人员']}
      />
      <Table loading={loading} data={data} columns={columnsOther} style={{ marginTop: 30 }} />
    </>
  );
}
