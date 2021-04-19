import React, { Component } from 'react';
import { Steps, Card } from 'antd';

import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { StateType } from './model';
// import Step1 from './components/Step1';
// import Step2 from './components/Step2';
// import Step3 from './components/Step3';
// import Step4 from './components/Step4';

import styles from './style.less';
const { Step } = Steps;

interface DatabaseProps {
    current: StateType['current'];
    dispatch: Dispatch;
}

const getCurrentStepAndComponent = (current?: string) => {
    switch (current) {
      case 'step2':
        return { step: 1, component: <Step2 /> };
      case 'step3':
        return { step: 2, component: <Step3 /> };
      case 'step4':
        return { step: 3, component: <Step4 /> };
      case 'step1':
      default:
        return { step: 0, component: <Step1 /> };
    }
};
class Database extends Component<DatabaseProps> {

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch({
          type: 'connectorsAnddatabase/clear',
        });      
    };

    render() {
        const { current } = this.props; 
        
        return (
            <Card bordered={false} className={styles.stepsWrap}>
              <>
                <Steps current={getCurrentStepAndComponent(current).step} className={styles.steps}>
                    <Step title="数据连接" />
                    <Step title="数据设计" />
                    <Step title="更新设置" />
                    <Step title="数据集设置" />
                </Steps>
                {getCurrentStepAndComponent(current).component}
              </>
            </Card>
        );
    }
    
};

export default connect(({ connectorsAnddatabase, }: { connectorsAnddatabase: StateType; }) => ({
    current: connectorsAnddatabase.current, 
    }),
)(Database);

