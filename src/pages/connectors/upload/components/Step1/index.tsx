import React from 'react';
import { Upload, message, Card } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { StateType } from '../../model';
import styles from './index.less';

const { Dragger } = Upload;

const getUploadFileInfo = (files: any[]) => {
    
  const param: any[] = files.map((item) => {
    const _item = {
      fileId: item.fileId,
      sheetName: item.sheets[0].sheetName,
      pCode: '',
      tag: '',
      remark: '',
      workName: item.fileName.substring(0,100)
    };
    return _item;
  });
  return param;
  
}

interface Step1Props {
  data?: StateType['sheets'];
  dispatch?: Dispatch;
}

const Step1: React.FC<Step1Props> = (props) => {
  const { dispatch, data } = props;

  if (!data) {
    return null;
  }

  const uploadProps = {
    name: 'file',
    multiple: true,
    accept: '.xls,.xlsx,.csv',
    action: '/api/mydatasource/upload',
    // action: MAT.utils.getContextPath() + '/api/mydatasource/upload',
    // headers: {"Authorization": MAT.utils.getToken()},
    // maxCount: 5,
    onChange(info: any) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        const resp = info.file.response;
        let params = getUploadFileInfo([resp]);
        if (dispatch) {
          dispatch({
            type: 'connectorsAndupload/saveCurrentStep',
            payload: 'step2'
          })

          dispatch({
            type: 'connectorsAndupload/getSheetfield',
            payload: { workSheets: JSON.stringify(params) }
          })
          
        }

      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Card bordered={false} className={styles.stepWrap}>
      <Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击上传或者拖拽上传</p>
        <p className="ant-upload-hint">
          支持Excel和CSV文件
          {/* 支持Excel和CSV文件（单个Excel最大100M，CSV最大800M） */}
          {/* 最多5个文件批量上传，默认识别第一个sheet文件 */}
        </p>
      </Dragger>
    </Card>
  );
};

export default connect(({ connectorsAndupload }: { connectorsAndupload: StateType }) => ({
  data: connectorsAndupload.sheets,
}))(Step1);
