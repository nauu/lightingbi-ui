import { Component } from 'react';
import echarts, { registerTheme } from 'echarts/lib/echarts';
import theme from './echarts-theme';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import ReactECharts from 'echarts-for-react';

interface PerformanceProps {
  chartType: string
}

class Performance extends Component<PerformanceProps> {

  componentWillMount() {
    console.log(echarts);
    registerTheme('lightingbi', theme);
  }

  render() {

    const options = {
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
          type: this.props.chartType || 'bar',
          smooth: true,
        },
      ],
      tooltip: {
        trigger: 'axis',
      },
    };

    return (
      <ReactECharts style={{height: '100%'}} option={options} theme='lightingbi' />
    )
  }
}

export default Performance;
