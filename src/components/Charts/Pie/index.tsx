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

  type = 'pie';

  defaultOpt = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    series: [
      {
        data: [{
          value: 820, name: 'Mon'
        }, {
          value: 932, name: 'Tue'
        }, {
          value: 901, name: 'Wed'
        }, {
          value: 934, name: 'Thu'
        }, {
          value: 1290, name: 'Fri'
        }, {
          value: 1330, name: 'Sat'
        }, {
          value: 1320, name: 'Sun'
        }],
        type: this.type,
      },
    ],
    tooltip: {
      trigger: 'item',
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
