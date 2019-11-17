import React, { useState } from 'react';
import { Button, Icon, Upload, Spin } from 'antd';
import * as lib from '@/utils/lib';
import styles from './index.less';
import Excel from 'exceljs/dist/es5/exceljs.browser.js';
import * as R from 'ramda';
// https://github.com/exceljs/exceljs/issues/832
// i use the vue template
/* <input type="file" @change="handleChange" />


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

export default () => {
  const [files, setFiles] = useState([]);
  const [sheet, setSheet] = useState([]);
  const [loading, setLoading] = useState(false);

  const decodeXlsx = sheet => {
    sheet.eachRow((row, rowIndex) => {
      let res = R.tail(row.values);
      console.log(res);
    });
  };

  return (
    <div>
      <div style={{ width: 300, marginBottom: 20 }}>
        <Upload.Dragger
          fileList={files}
          //   showUploadList={false}
          onRemove={() => {
            setFiles([]);
            setSheet([]);
          }}
          beforeUpload={file => {
            setFiles([file]);
            setLoading(true);
            lib.loadDataFile(file).then(buffer => {
              if (!buffer) {
                setLoading(false);
                return;
              }
              const wb = new Excel.Workbook();
              const sheetList = [];
              wb.xlsx.load(buffer).then(workbook => {
                workbook.eachSheet(sheetItem => {
                  sheetList.push(sheetItem);
                });
                setSheet(sheetList);
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
        </Upload.Dragger>
      </div>
      {sheet.map((item, key) => (
        <Button
          type="primary"
          style={{ marginLeft: 20 }}
          key={key}
          onClick={() => {
            decodeXlsx(item);
          }}
        >
          导入{item.name}数据
        </Button>
      ))}
    </div>
  );
};
