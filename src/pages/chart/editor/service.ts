import request from "umi-request";

export async function queryChartInfo() {
  return request('/api/chart/info');
}

export async function queryDatasetFields() {
  return request('/api/dataset/fields');
}
