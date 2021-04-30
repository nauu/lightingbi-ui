import {ChartDataType} from './data.d'

const getChartListData: ChartDataType[] = [{
  id: '1',
  name: '图表一',
  type: 'Bar',
  dimensions: [],
  measures: []
}, {
  id: '2',
  name: '图表二',
  type: 'Line',
  dimensions: [],
  measures: []
}, {
  id: '3',
  name: '图表三',
  type: 'Pie',
  dimensions: [],
  measures: []
}];

export default {
  'POST  /api/chart/list': ( req: any, res: any ) => {
    res.send({data:getChartListData});
  }
}
