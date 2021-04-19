import React, { Component } from 'react';
import { Card, Steps } from 'antd';

import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { StateType } from './model';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';

import styles from './style.less';
// import React, { useState, useEffect } from 'react';
// import { render } from 'react-dom';

const { Step } = Steps;


interface UploadProps {
    current: StateType['current'];
    dispatch: Dispatch;
}

const getCurrentStepAndComponent = (current?: string) => {
    switch (current) {
      case 'step2':
        return { step: 1, component: <Step2 /> };
      case 'step3':
        return { step: 2, component: <Step3 /> };
      case 'step1':
      default:
        return { step: 0, component: <Step1 /> };
    }
};

// const Upload: React.FC<UploadProps> = ({ current }) => {
//     const [stepComponent, setStepComponent] = useState<React.ReactNode>(<Step1 />);
//     const [currentStep, setCurrentStep] = useState<number>(0);
  
//     useEffect(() => {
//       const { step, component } = getCurrentStepAndComponent(current);
//       setCurrentStep(step);
//       setStepComponent(component);
//     }, [current]);
  
//     return (
//         <Card bordered={false} className={styles.stepsWrap}>
//           <>
//             <Steps current={currentStep} className={styles.steps}>
//                 <Step title="上传文件" />
//                 <Step title="预览数据" />
//                 <Step title="数据集设置" />
//             </Steps>
//             {stepComponent}
//           </>
//         </Card>
//     );
// };

class Upload extends Component<UploadProps> {

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch({
          type: 'connectorsAndupload/clear',
        });
    }

    render() {
        const { current } = this.props; 

        return (
            <Card bordered={false} className={styles.stepsWrap}>
              <>
                <Steps current={getCurrentStepAndComponent(current).step} className={styles.steps}>
                    <Step title="上传文件" />
                    <Step title="预览数据" />
                    <Step title="数据集设置" />
                </Steps>
                {getCurrentStepAndComponent(current).component}
              </>
            </Card>
        );
    }
    
};

export default connect(({ connectorsAndupload }: { connectorsAndupload: StateType; }) => ({
    current: connectorsAndupload.current,
}))(Upload);

