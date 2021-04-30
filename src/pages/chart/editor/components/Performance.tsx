import { Component } from 'react';
import Chart from '@/components/Charts/Chart';

interface PerformanceProps {
  chartType: string
  option: any
  data?: any
}

class Performance extends Component<PerformanceProps> {

  render() {

    return (
      <Chart type={this.props.chartType} option={this.props.option} theme='lightingbi' />
    )
  }
}

export default Performance;
