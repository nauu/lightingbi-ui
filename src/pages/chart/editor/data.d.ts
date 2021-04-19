export interface DatasetFieldType {
  id: string
  name: string
  phy_name: string
  type: string
}
export interface ChartFieldType {
  id: string
  name: string
  phy_name: string
  type: string
}
export interface ChartEditorData {
  fields: DatasetFieldType[]
  dimension: ChartFieldType[]
  measure: ChartFieldType[]
  chartType: string
}

