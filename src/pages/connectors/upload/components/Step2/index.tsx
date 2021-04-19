import React from 'react';
import { Tabs, Row, Col, Button, Table } from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { StateType } from '../../model';
import styles from './index.less';

const { TabPane } = Tabs;


interface Step2Props {
  data?: StateType['sheets'];
  dispatch?: Dispatch;
}

const Step2: React.FC<Step2Props> = (props) => {
  const { data, dispatch } = props;
  if (!data) {
    return null;
  }
  const onPrev = () => {
    if (dispatch) {
      dispatch({
        type: 'connectorsAndupload/saveCurrentStep',
        payload: 'step1',
      });
    }
  };

  const onNext = () => {
    if (dispatch) {
      dispatch({
        type: 'connectorsAndupload/saveCurrentStep',
        payload: 'step3',
      });
    }
  }

  const panes: React.ReactNode[] = [];

  data.map((sheet) => {
    const tabTitle: string = sheet.workName;
    const tabKey: string = sheet.fileId;
    let columns = sheet.colNames.map((e: any, i: number) => {
        let item = {
            title: e,
            dataIndex: i,
            key: i,
            dType: sheet.colTypes[i],
        }
        return item;
    });
    let dataSource = sheet.data.map((e: any, i: number) => {
      return {
        ...e,
        key: i
      }
    });
    panes.push(
      <TabPane tab={tabTitle} key={tabKey}>
        <Table
          showHeader={false}
          pagination={false}
          dataSource={dataSource}
          columns={columns}

        >
        </Table>
      </TabPane>,
    );
  });

  const onTabChange = () => {

  }

  return (
    
      <div className={styles.step2Wrap}>
        <Tabs className={styles.tabs}  onChange={onTabChange}>
          {panes}
        </Tabs>

        <div className={styles.buttonWrap}  >
            <Button onClick={onPrev} >
              上一步
            </Button>
            <Button type="primary" onClick={onNext} style={{ marginLeft: 16 }}>
              下一步
            </Button>         

        </div>
        
    </div>
  );
};
export default connect(
  ({
    connectorsAndupload,
    loading,
  }: {
    connectorsAndupload: StateType;
    loading: {
      effects: Record<string, boolean>;
    };
  }) => ({
    data: connectorsAndupload.sheets,
  }),
)(Step2);
