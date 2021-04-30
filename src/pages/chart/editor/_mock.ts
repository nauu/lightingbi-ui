import { ChartEditorData, ChartFieldType } from './data.d'

const getChartInfo: ChartEditorData = {
  fields: [],
  dimension: [],
  measure: [],
  chartType: 'Bar'
}

const getDatasetFields: ChartFieldType[] = [
  {id: 'quyu', name: '区域', phy_name: 'quyu', type: 'txt'},
  {id: 'sheng', name: '省', phy_name: 'sheng', type: 'txt'},
  {id: 'shi', name: '市', phy_name: 'shi', type: 'txt'},
  {id: 'trueValue', name: '实际值', phy_name: 'shijizhi', type: 'number'},
  {id: 'targetValue', name: '目标值', phy_name: 'mubiaozhi', type: 'number'},
];

export default {
  'GET  /api/chart/info': ( req, res ) => {
      res.send(getChartInfo);
  },
  'GET  /api/dataset/fields': ( req, res ) => {
      res.send(getDatasetFields);
  }
}
