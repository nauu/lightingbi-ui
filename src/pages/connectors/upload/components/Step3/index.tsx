import React from 'react';
import { Button, Form, Input } from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { StateType } from '../../model';
import styles from './index.less';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

interface Step3Props {
  data?: StateType['sheets'];
  dispatch?: Dispatch;
}

const Step3: React.FC<Step3Props> = (props) => {
  const { data, dispatch } = props;
  const [form] = Form.useForm();

  if (!data) {
    return null;
  }

  const { validateFields, getFieldsValue } = form;
  const onPrev = () => {
    if (dispatch) {
      const values = getFieldsValue();
      dispatch({
        type: 'connectorsAndupload/saveSheetData',
        payload: {
          ...data,
          ...values,
        },
      });

      dispatch({
        type: 'connectorsAndupload/saveCurrentStep',
        payload: 'step2',
      });
      
    }
  };

  const onFinish = async () => {
    const values = await validateFields();
    if (dispatch) {
      dispatch({
        type: 'connectorsAndupload/submitUpload',
        payload: {
          ...data,
          ...values,
        },
      });
    }
  }

  return (
    <div className={styles.step3Wrap}>
    <Form
        {...formItemLayout}
        form={form}
        layout="horizontal"
        className={styles.stepForm}
        hideRequiredMark
        initialValues={data}
      >
        <Form.Item
          label="数据集"
          name="name"
          rules={[{ required: true, message: '请输入数据集名称' }]}
        >
          <Input placeholder="请输入数据集名称" />
        </Form.Item>
        
        <Form.Item
          label="分类标签"
          name="tag"
          rules={[{ required: false, message: '请输入标签' }]}
        >
          <Input placeholder="请输入标签" />
        </Form.Item>
        <Form.Item
          label="备注"
          name="remark"
          rules={[
            {
              message: '请输入数据集备注信息',
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        
      </Form>
      <div className={styles.buttonWrap}  >
        <Button onClick={onPrev} >
          上一步
        </Button>
        <Button type="primary" onClick={onFinish} style={{ marginLeft: 16 }}>
          完成
        </Button>         

      </div>
    </div>
  );
};

export default connect(({ connectorsAndupload }: { connectorsAndupload: StateType }) => ({
  data: connectorsAndupload.sheets,
}))(Step3);
