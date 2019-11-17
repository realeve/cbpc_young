import React from 'react';
import styles from './index.less';
import { useFetch } from '@/components';
import { Skeleton, Table } from 'antd';

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
    sorter: (a: {}, b: {}) => a.base_score - b.base_score,
  },
  {
    title: '其它加分',
    dataIndex: 'other_score',
    key: 'other_score',
    sorter: (a: {}, b: {}) => a.other_score - b.other_score,
  },
  {
    title: '总分',
    dataIndex: 'score',
    key: 'score',
    sorter: (a: {}, b: {}) => a.score - b.score,
  },
];
export default function() {
  const { data, loading } = useFetch({
    param: {
      url: '/92/cd24026726.json',
    },
    callback: e => {
      e.data = e.data.map((item: {}, key: number) => ({ key: key + 1, ...item }));
      return e;
    },
  });

  return (
    <Skeleton loading={loading}>
      <div className={styles.table}>
        <h3>{data && data.title}</h3>
        <Table columns={columns} dataSource={data ? data.data : []} />
      </div>
    </Skeleton>
  );
}
