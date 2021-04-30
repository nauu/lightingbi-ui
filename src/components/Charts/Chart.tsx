import Charts from './index';
import {Component} from "react";

interface ChartProps {
  type: string
  theme?: string
  option: any
  data?: any
  extra?: any
}

class Chart extends Component<ChartProps> {

  getChart() {
    if(Charts[this.props.type||'Bar']) {
      return Charts[this.props.type||'Bar'];
    }
    return Charts['Bar'];
  }

  render() {
    const ChartComp = this.getChart();
    return (
      <ChartComp {...this.props} ></ChartComp>
    )
  }
}

export default Chart;
