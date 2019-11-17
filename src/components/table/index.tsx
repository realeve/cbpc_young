import React, { useState } from 'react';
import styles from './index.less';
import { Skeleton, Table } from 'antd';
import { ColumnProps, PaginationConfig } from 'antd/lib/table';

export const pageConfig: PaginationConfig = {
  position: 'bottom',
  pageSizeOptions: ['10', '20', '50', '100'],
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: number, range: number[]) => `第${range[0]}-${range[1]}，共 ${total} 条数据`,
};

export default function({
  data,
  loading,
  columns,
  ...rest
}: {
  columns?: ColumnProps<any>[];
  loading?: boolean;
  data?: {
    title: string;
    data: any[];
  } | null;
  [key: string]: any;
}) {
  const [pageSize, setPageSize] = useState(20);

  return (
    <Skeleton loading={loading}>
      <div className={styles.table} {...rest}>
        <h3>{data && data.title}</h3>
        <Table
          columns={columns}
          bordered
          dataSource={data ? data.data.map((item, key) => ({ key: key + 1, ...item })) : []}
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
