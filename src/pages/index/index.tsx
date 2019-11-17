import React, { useState } from 'react';
import styles from './index.less';
import { useFetch } from '@/components';
import { Skeleton, Table } from 'antd';
import { PaginationConfig } from 'antd/lib/pagination';
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

export const pageConfig: PaginationConfig = {
  position: 'bottom',
  pageSizeOptions: ['10', '20', '50', '100'],
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: number, range: number[]) => `第${range[0]}-${range[1]}，共 ${total} 条数据`,
};

export default function() {
  const { data, loading } = useFetch<{
    title: string;
    data: IDbData[];
  }>({
    param: {
      url: '/92/cd24026726.json',
    },
    callback: e => {
      e.data = e.data.map((item: {}, key: number) => ({ key: key + 1, ...item }));
      return e;
    },
  });

  const [pageSize, setPageSize] = useState(20);

  return (
    <Skeleton loading={loading}>
      <div className={styles.table}>
        <h3>{data && data.title}</h3>
        <Table
          columns={columns}
          dataSource={data ? data.data : []}
          pagination={{
            ...pageConfig,
            pageSize,
            onShowSizeChange: (_, size) => setPageSize(size),
          }}
        />
      </div>
    </Skeleton>
  );
}
