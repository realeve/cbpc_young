import React, { useState } from 'react';
import { useFetch, Table } from '@/components';
import { connect } from 'dva';
import { ICommon } from '@/models/common';
import { Divider, Input } from 'antd';

interface IDbData {
  username: string;
  deptname: string;
  rec_date: string;
  score_type: string;
  score: number;
  remark: string;
}

export default connect(({ common }: { common: ICommon }) => common)(
  ({ tstart, tend, user }: ICommon) => {
    const { data, loading } = useFetch<{
      title: string;
      data: IDbData[];
    }>({
      param: {
        url: '/93/1a31795568.json',
        params: { tstart, tend },
      },
      valid: () => tstart.length > 0 && tend.length > 0,
    });

    const { data: base, loading: loadingBase } = useFetch({
      param: {
        url: '/94/966772bc13.json',
        params: { tstart, tend },
      },
      valid: () => tstart.length > 0 && tend.length > 0,
    });

    const columnsOther = [
      {
        title: '编号',
        dataIndex: 'id',
        key: 'id',
        idx: 0,
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
      {
        title: '操作',
        key: 'action',
        render: ({ deptname }) => {
          if (user.gm == '1' || user.manage_dept.includes(deptname)) {
            return (
              <span>
                <a>编辑</a>
                <Divider type="vertical" />
                <a>删除</a>
              </span>
            );
          }
          return null;
        },
      },
    ];

    const columnsBase = [
      {
        title: '编号',
        dataIndex: 'id',
        key: 'id',
        idx: 0,
      },
      {
        title: '姓名',
        dataIndex: 'username',
        key: 'username',
        idx: 1,
      },
      {
        title: '部门',
        dataIndex: 'deptname',
        key: 'deptname',
        idx: 2,
      },
      {
        title: '记录月份',
        dataIndex: 'rec_date',
        key: 'rec_date',
        sorter: (a: IDbData, b: IDbData) => a.rec_date.localeCompare(b.rec_date),
        idx: 3,
      },
      {
        title: '生产操作岗',
        children: [
          {
            title: '质量',
            dataIndex: 'prod_quality',
            key: 'prod_quality',
            idx: 4,
          },
          {
            title: '产量',
            dataIndex: 'prod_produce',
            key: 'prod_produce',
            idx: 5,
          },
          {
            title: '成本',
            dataIndex: 'prod_cost',
            key: 'prod_cost',
            idx: 6,
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
            idx: 7,
          },
          {
            title: '服务态度',
            dataIndex: 'support_attitude',
            key: 'support_attitude',
            idx: 8,
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
            idx: 9,
          },
        ],
      },
      {
        title: '总分',
        dataIndex: 'score',
        key: 'score',
        sorter: (a: IDbData, b: IDbData) => a.score - b.score,
        idx: 10,
      },
      {
        title: '操作',
        key: 'action',
        render: ({ deptname }) => {
          if (user.gm == '1' || user.manage_dept.includes(deptname)) {
            return (
              <span>
                <a>编辑</a>
                <Divider type="vertical" />
                <a>删除</a>
              </span>
            );
          }
          return null;
        },
      },
    ];

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
          loading={loadingBase}
          daterange={[tstart, tend]}
          data={base}
          filter={filter}
          columns={columnsBase}
          merge={['4-6', '7-8', '9']}
          mergetext={['生产操作岗', '生产保障岗位', '管理技术人员']}
        />
        <Table
          loading={loading}
          daterange={[tstart, tend]}
          data={data}
          filter={filter}
          columns={columnsOther}
          style={{ marginTop: 30 }}
        />
      </>
    );
  },
);
