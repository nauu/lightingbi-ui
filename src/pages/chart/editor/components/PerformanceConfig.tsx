import { Component } from 'react';
import { Radio } from 'antd';
import { BarChartOutlined, LineChartOutlined, PieChartOutlined } from "@ant-design/icons/lib";

interface PerformanceConfigProps {
  chartType: string
  onChange: any
}

class PerformanceConfig extends Component<PerformanceConfigProps> {

  handleChangeType = (e) => {
    this.props.onChange && this.props.onChange(e.target.value);
  }

  render() {
    return (
      <Radio.Group value={this.props.chartType} onChange={this.handleChangeType}>
        <Radio.Button value='Bar'><BarChartOutlined /></Radio.Button>
        <Radio.Button value='Line'><LineChartOutlined /></Radio.Button>
        <Radio.Button value='Pie'><PieChartOutlined /></Radio.Button>
      </Radio.Group>
    )
  }
}

export default PerformanceConfig;
