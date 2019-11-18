import React, { useState } from 'react';
import { useFetch, Table } from '@/components';
import { connect } from 'dva';
import { ICommon } from '@/models/common';
import { Divider, Input, message, Modal, Select } from 'antd';
import * as db from './db';
import * as R from 'ramda';
import styles from './index.less';
import { useSetState } from 'react-use';

interface IDbData {
  username: string;
  deptname: string;
  rec_date: string;
  score_type: string;
  score: number;
  remark: string;
}

const { confirm } = Modal;
const { Option } = Select;

export default connect(({ common }: { common: ICommon }) => common)(
  ({ tstart, tend, user }: ICommon) => {
    // const [trigger, setTrigger] = useState(null);

    const { data, loading, setData } = useFetch<{
      title: string;
      data: IDbData[];
    }>({
      param: {
        url: '/93/1a31795568.json',
        params: { tstart, tend },
      },
      valid: () => tstart.length > 0 && tend.length > 0,
    });

    const { data: base, loading: loadingBase, setData: setBaseData } = useFetch({
      param: {
        url: '/94/966772bc13.json',
        params: { tstart, tend },
      },
      valid: () => tstart.length > 0 && tend.length > 0,
    });

    // 删除数据
    const DelBtn = ({ id, isBase = false }) => (
      <a
        onClick={() => {
          confirm({
            title: '确定删除这条信息?',
            content: '删除后将不可找回',
            onOk() {
              db[isBase ? 'delCbpcYoungBase' : 'delCbpcYoungOther'](id).then(() => {
                message.success('删除成功');
                if (isBase) {
                  let res = R.reject(item => item.id == id)(base.data);
                  setBaseData({ ...base, data: res });
                } else {
                  let res = R.reject(item => item.id == id)(data.data);
                  setData({ ...data, data: res });
                }
                // 重新加载数据
                // setTrigger(Math.round(new Date()));
              });
            },
          });
        }}
      >
        删除
      </a>
    );

    const [visible, setVisible] = useState(false);
    const [baseVisible, setBaseVisible] = useState(false);

    const [state, setState] = useSetState({});

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
        render: item => {
          if (user.gm == '1' || user.manage_dept.includes(item.deptname)) {
            return (
              <span>
                <a
                  onClick={() => {
                    setVisible(true);
                    setState(item);
                  }}
                >
                  编辑
                </a>
                <Divider type="vertical" />
                <DelBtn id={item.id} />
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
        render: item => {
          if (user.gm == '1' || user.manage_dept.includes(item.deptname)) {
            return (
              <span>
                <a
                  onClick={() => {
                    setBaseVisible(true);
                    setState(item);
                  }}
                >
                  编辑
                </a>
                <Divider type="vertical" />
                <DelBtn isBase id={item.id} />
              </span>
            );
          }
          return null;
        },
      },
    ];

    const [filter, setFilter] = useState(''); // 李宾

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

        <Modal
          title="编辑岗位业绩数据"
          visible={baseVisible}
          onCancel={() => {
            setBaseVisible(false);
          }}
          onOk={() => {
            let {
              rec_date,
              prod_quality,
              prod_produce,
              prod_cost,
              support_prod,
              support_attitude,
              manager,
              score,
              id: _id,
            } = state;

            // 总分相加
            score =
              Number(prod_quality) +
              Number(prod_produce) +
              Number(prod_cost) +
              Number(support_prod) +
              Number(support_attitude) +
              Number(manager);

            let params = {
              rec_date,
              prod_quality,
              prod_produce,
              prod_cost,
              support_prod,
              support_attitude,
              manager,
              score,
              _id,
            };
            db.setCbpcYoungBase(params).then(() => {
              setBaseVisible(false);
              message.success('修改成功');
              // 更新数据
              let idx = R.findIndex(item => item.id == _id)(base.data);
              let nextData = R.update(idx, state, base.data);
              setBaseData({ ...data, data: nextData });
            });
          }}
          okText="保存"
        >
          <div className={styles.form}>
            <div className={styles.item}>
              <div className={styles.label}>姓名</div>
              <span>{state.username}</span>
            </div>
            <div className={styles.item}>
              <div className={styles.label}>部门</div>
              <span>{state.deptname}</span>
            </div>
            <div className={styles.item}>
              <div className={styles.label}>记录月份</div>
              <Input
                value={state.rec_date}
                onChange={e => setState({ rec_date: e.target.value })}
                className={styles.input}
              />
            </div>

            <div className={styles.item}>
              <div className={styles.label}>
                生产操作岗
                <br />
                (质量)
              </div>
              <Input
                value={state.prod_quality}
                onChange={e => setState({ prod_quality: e.target.value })}
                className={styles.input}
                type="number"
              />
            </div>

            <div className={styles.item}>
              <div className={styles.label}>
                生产操作岗
                <br />
                (产量)
              </div>
              <Input
                value={state.prod_produce}
                onChange={e => setState({ prod_produce: e.target.value })}
                className={styles.input}
                type="number"
              />
            </div>

            <div className={styles.item}>
              <div className={styles.label}>
                生产操作岗
                <br />
                (成本)
              </div>
              <Input
                value={state.prod_cost}
                onChange={e => setState({ prod_cost: e.target.value })}
                className={styles.input}
                type="number"
              />
            </div>

            <div className={styles.item}>
              <div className={styles.label}>
                生产保障岗
                <br />
                非计划停机时间
              </div>
              <Input
                value={state.support_prod}
                onChange={e => setState({ support_prod: e.target.value })}
                className={styles.input}
                type="number"
              />
            </div>

            <div className={styles.item}>
              <div className={styles.label}>
                生产保障岗
                <br />
                服务态度
              </div>
              <Input
                value={state.support_attitude}
                onChange={e => setState({ support_attitude: e.target.value })}
                className={styles.input}
                type="number"
              />
            </div>

            <div className={styles.item}>
              <div className={styles.label}>
                管理技术人员
                <br />
                绩效得分
              </div>
              <Input
                value={state.manager}
                onChange={e => setState({ manager: e.target.value })}
                className={styles.input}
                type="number"
              />
            </div>

            <div className={styles.item}>
              <div className={styles.label}>总分</div>
              <Input
                value={state.score}
                onChange={e => setState({ score: e.target.value })}
                className={styles.input}
                type="number"
              />
            </div>
          </div>
        </Modal>

        <Modal
          title="编辑数据"
          visible={visible}
          onCancel={() => {
            setVisible(false);
          }}
          onOk={() => {
            let { rec_date, remark, score, score_type, id: _id } = state;
            let params = {
              rec_date,
              remark,
              score,
              score_type,
              _id,
            };
            db.setCbpcYoungOther(params).then(() => {
              setVisible(false);
              message.success('修改成功');
              // 更新数据
              let idx = R.findIndex(item => item.id == _id)(data.data);
              let nextData = R.update(idx, state, data.data);
              setData({ ...data, data: nextData });
            });
          }}
          okText="保存"
        >
          <div className={styles.form}>
            <div className={styles.item}>
              <div className={styles.label}>姓名</div>
              <span>{state.username}</span>
            </div>
            <div className={styles.item}>
              <div className={styles.label}>部门</div>
              <span>{state.deptname}</span>
            </div>
            <div className={styles.item}>
              <div className={styles.label}>记录月份</div>
              <Input
                value={state.rec_date}
                onChange={e => setState({ rec_date: e.target.value })}
                className={styles.input}
              />
            </div>
            <div className={styles.item}>
              <div className={styles.label}>得分类型</div>
              <Select
                value={state.score_type}
                className={styles.input}
                onChange={(score_type: string) =>
                  setState({
                    score_type,
                  })
                }
              >
                {`能力素质积分,活动积分,组织公民行为积分,技术、创新成果`.split(',').map(item => (
                  <Option value={item} key={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </div>
            <div className={styles.item}>
              <div className={styles.label}>得分</div>
              <Input
                value={state.score}
                onChange={e => setState({ score: e.target.value })}
                className={styles.input}
                type="number"
              />
            </div>
            <div className={styles.item}>
              <div className={styles.label}>备注信息</div>
              <Input.TextArea
                value={state.remark}
                onChange={e => setState({ remark: e.target.value })}
                rows={3}
                className={styles.input}
              />
            </div>
          </div>
        </Modal>
      </>
    );
  },
);
