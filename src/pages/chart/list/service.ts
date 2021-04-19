import request from "umi-request";

export async function queryChartList() {
  return request('/api/chart/list');
}
