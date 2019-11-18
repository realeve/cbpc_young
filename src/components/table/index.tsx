import React, { useState, useEffect } from 'react';
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
  daterange,
  filter = '',
  ...props
}: {
  columns?: ColumnProps<any>[];
  loading?: boolean;
  daterange?: string[];
  data?: {
    title: string;
    data: any[];
  } | null;
  filter?: string;
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

  const [distData, setDistData] = useState([]);

  useEffect(() => {
    let temp = R.clone(data) || { data: [] };

    temp.data = temp.data.map((item, key) => ({ key: key + 1, ...item }));

    if (filter.length === 0) {
      setDistData(temp);
      return;
    }

    temp.data = temp.data.filter(item =>
      Object.values(item)
        .join(',')
        .includes(filter),
    );
    setDistData(temp);
  }, [data, filter]);

  return (
    <Skeleton loading={loading}>
      <div className={styles.table} style={style}>
        <div className={styles.header}>
          <h3>
            {data && data.title}
            {daterange && (
              <>
                <br />
                <small style={{ fontWeight: 200 }}>
                  ({daterange[0]}至{daterange[1]})
                </small>
              </>
            )}
          </h3>
          <div className={styles.action}>
            <Button type="primary" onClick={downloadExcel}>
              下载报表
            </Button>
          </div>
        </div>
        <Table
          columns={columns}
          bordered
          dataSource={distData.data}
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
