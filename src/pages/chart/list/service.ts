// import request from "umi-request";
import request from '@/utils/requestGql';
// import { request } from 'graphql-request';
import { queryChartListGql } from './graphql'

export async function queryChartList() {
  return request('/api/chart/list', queryChartListGql, {name:'huyi'});
}
