import { Component } from 'react';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import ReactECharts from 'echarts-for-react';

interface ChartsProps {
  option: any
  data: any
  extra: any
}

class Bar extends Component<ChartsProps> {

  type = 'line';

  defaultOpt = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: this.type,
        smooth: true,
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };

  defaultTheme = 'lightingbi';

  getOption() {
    return this.defaultOpt;
  }

  render() {

    const options = this.getOption();

    return (
      <ReactECharts style={{height: '100%'}} option={options} theme='lightingbi' />
    )
  }
}

export default Bar;
