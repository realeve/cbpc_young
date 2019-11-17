import React, { useState } from 'react';
import styles from './index.less';
import { Skeleton, Table, Button } from 'antd';
import { ColumnProps, PaginationConfig } from 'antd/lib/table';
import * as Excel from '@/utils/excel';
import * as R from 'ramda';
import * as config from '@/utils/setting';

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
  style,
  ...props
}: {
  columns?: ColumnProps<any>[];
  loading?: boolean;
  data?: {
    title: string;
    data: any[];
  } | null;
  style?: React.CSSProperties;
  [key: string]: any;
}) {
  const [pageSize, setPageSize] = useState(20);

  const getExportConfig = () => {
    const { title, source } = data;
    const filename = `${title}`;

    const header = columns.map(item =>
      item.children ? item.children.map(child => child.title) : item.title,
    );
    const keys = R.flatten(
      R.map(item => (item.children ? item.children.map(child => child.key) : item.key))(columns),
    );

    const body = data.data
      .map((item, key) => ({ key: key + 1, ...item }))
      .map(item => R.props(keys)(item));

    // 将外部数据接口中的merge配置信息注入替换
    let params = R.clone(props.config);
    params = Object.assign({}, params, R.pick(['merge', 'mergesize', 'mergetext'], props));

    return {
      columns,
      creator: config.AUTHOR,
      source,
      filename,
      header: R.flatten(header),
      body,
      params,
    };
  };

  const downloadExcel = () => {
    const config = getExportConfig();
    Excel.save(config);
  };

  return (
    <Skeleton loading={loading}>
      <div className={styles.table} style={style}>
        <div className={styles.header}>
          <h3>{data && data.title}</h3>
          <div className={styles.action}>
            <Button type="default" onClick={downloadExcel}>
              下载报表
            </Button>
          </div>
        </div>
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