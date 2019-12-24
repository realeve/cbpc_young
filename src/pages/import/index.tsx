import React, { useState } from 'react';
import { Button, Icon, Upload, Spin, notification, Progress } from 'antd';
import * as lib from '@/utils/lib';
import styles from './index.less';
import Excel from 'exceljs/dist/es5/exceljs.browser.js';
import * as R from 'ramda';
import * as db from './db';
import { connect } from 'dva';
import { ICommon } from '@/models/common';

import { Typography, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;

// https://github.com/exceljs/exceljs/issues/832
// i use the vue template
/* <input type="file" onChange={handleChange} /> 

handleChange(e) {
  this.file = e.target.files[0]
},
handleImport() {
  const wb = new Excel.Workbook();
  const reader = new FileReader()

  reader.readAsArrayBuffer(this.file)
  reader.onload = () => {
    const buffer = reader.result;
    wb.xlsx.load(buffer).then(workbook => {
      console.log(workbook, 'workbook instance')
      workbook.eachSheet((sheet, id) => {
        sheet.eachRow((row, rowIndex) => {
          console.log(row.values, rowIndex)
        })
      })
    })
  }
} */

const ImportApp = ({ user }: ICommon) => {
  const [sheet, setSheet] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [percent, setPercent] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('active');
  const [importMessage, setImportMessage] = useState<string | null>(null);

  const decodeXlsx = async sheet => {
    let src = [];
    let header = [];
    let api = '';
    let message = '';
    sheet.eachRow((row, rowIndex) => {
      let res = R.tail(row.values);
      if (rowIndex === 1) {
        header = res;
      } else {
        src.push(res);
      }
    });
    // 其余得分
    if (header.includes('备注')) {
      src = src.map(
        ([username, usercode, deptname, rec_date, score_type, score = 0, remark = '']) => ({
          username,
          usercode,
          deptname,
          rec_date,
          score_type,
          score,
          remark,
          uid: user.uid,
        }),
      );
      api = 'addCbpcYoungOther';
    } else {
      api = 'addCbpcYoungBase';
      src = src.map(
        ([
          username,
          usercode,
          deptname,
          rec_date,
          prod_quality = 0,
          prod_produce = 0,
          prod_cost = 0,
          support_prod = 0,
          support_attitude = 0,
          manager = 0,
          score = 0,
        ]) => ({
          username,
          usercode,
          deptname,
          rec_date,
          prod_quality,
          prod_produce,
          prod_cost,
          support_prod,
          support_attitude,
          manager,
          score: (R.type(score) === 'Object' ? score.result : score) || 0,
          uid: user.uid,
        }),
      );
    }

    let uploadSize = 100;
    setPercent(0);
    setUploading(true);
    setUploadStatus('active');

    let data = src;
    if (String(user.gm) !== '1') {
      data = src.filter(item => user.manage_dept.includes(item.deptname));
    }
    message = `【${api === 'addCbpcYoungBase' ? '岗位业绩积分' : '其余积分'}】数据共${
      data.length
    }条 上传完毕`;

    let dataList = R.splitEvery(uploadSize, data);
    let isSuccess = true;
    for (let i = 0; isSuccess && i < dataList.length; i++) {
      let value = dataList[i];
      let percentage = Math.min(Math.round(((i + 1) * uploadSize * 100) / data.length), 100);
      await db[api](value)
        .then(res => {
          setPercent(percentage);
        })
        .catch(e => {
          console.log(e);
          setUploadStatus('exception');
          isSuccess = false;
        });
      console.log(value);
    }
    if (isSuccess) {
      setUploading(false);
      notification.success({
        message: '上传完毕',
        description: message,
      });
      setImportMessage(`本次共读取信息${src.length}条，有效数据${data.length}条。`);
    }
  };

  // 文件对象：https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept
  return (
    <div className={styles.import}>
      <Typography>
        <Title level={2}>文件上传注意事项</Title>
        <Paragraph>文件上传前请仔细阅读以下注意事项，否则会导致上传失败：</Paragraph>
        <Paragraph>
          <ul>
            <li>
              模板文件
              <a href="/doc/积分模板.xlsx" target="_blank">
                (点击此处下载)
              </a>
              中已经定义了用户填写时所需的数据校验，『部门』或其余得分中『得分类型』可选项，
              <Text mark>严格按照模板中给定的数据填写，『切勿修改模板文件』</Text>;
            </li>
            <li>
              作为个人信息检索的唯一凭证,<Text mark>『员工保险编码』必须填写</Text>;
            </li>
            <li>
              <Text mark>『部门』、『类别』</Text>
              等字段从下拉框中选择录入，其中『类别』信息将用于加分时的计算;
            </li>
            <li>
              <Text mark>数据上传前请仔细检查有无空缺项或者无效数据（比如#N/A等信息）</Text>
              ，上传前将<Text mark>岗位绩效得分中的总分</Text>用公式填充一遍;
            </li>
            <li>
              <Text mark>生产操作岗、生产保障岗位、管理技术人员</Text>
              分别只填写各自相关的分数信息即可。
            </li>
            <li>
              <Text mark>第一行为表头信息，请勿调整</Text>，后面分别对应数据信息。
            </li>
          </ul>
        </Paragraph>
        <Divider />
        <Title level={3}>用户权限</Title>
        <Paragraph>
          您当前登录用户可以上传、编辑、删除
          {user.gm == 1 ? (
            <span>
              <Text mark>所有部门人员信息</Text>
            </span>
          ) : (
            <Text mark>{user.manage_dept}相关信息</Text>
          )}
          。
        </Paragraph>
        <Divider />
      </Typography>
      <div className={styles.uploadWrapper}>
        <Upload.Dragger
          showUploadList={false}
          accept=".xlsx"
          style={{ padding: 10 }}
          beforeUpload={file => {
            setLoading(true);
            lib.loadDataFile(file).then(buffer => {
              if (!buffer) {
                setLoading(false);
                return;
              }
              const wb = new Excel.Workbook();
              const sheetList = [];
              wb.xlsx
                .load(buffer)
                .then(workbook => {
                  workbook.eachSheet(sheetItem => {
                    sheetList.push(sheetItem);
                  });
                  setSheet(sheetList);
                  setLoading(false);
                })
                .catch(e => {
                  notification.error({
                    message: '文件解析错误',
                    description: '错误信息:' + e.message,
                  });
                  setLoading(false);
                });
            });
            return false;
          }}
        >
          <Spin tip="文件解析中..." spinning={loading}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">点击或拖拽文件到这里上传数据</p>
            <p className="ant-upload-hint">只支持上传xlsx文件</p>
          </Spin>
          {uploading && <Progress percent={percent} size="small" status={uploadStatus} />}
        </Upload.Dragger>
      </div>

      <div>
        {sheet.map((item, key) => (
          <Button
            type="primary"
            style={{ marginLeft: key > 0 ? 20 : 0, width: 160 }}
            key={key}
            onClick={() => {
              decodeXlsx(item);
            }}
          >
            导入{item.name}数据
          </Button>
        ))}
      </div>

      {importMessage && (
        <Typography className={styles.result}>
          <Title level={3}>导入结果</Title>
          <Paragraph>{importMessage}</Paragraph>
        </Typography>
      )}
    </div>
  );
};

export default connect(({ common }: { common: ICommon }) => ({
  user: common.user,
}))(ImportApp);
