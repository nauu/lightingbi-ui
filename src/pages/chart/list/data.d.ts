export interface ChartFieldType {
  id: string
  name: string
  phy_name: string
}
export interface ChartDataType {
  id: string
  name: string
  type: string
  dimensions: ChartFieldType[]
  measures: ChartFieldType[]
}
export interface ChartListData {
  list: ChartDataType[]
}
