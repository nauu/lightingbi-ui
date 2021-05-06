import request from '@/utils/requestGql';
import { queryReportInfoGql } from './graphql'

export async function queryReportInfo() {
  return request('/api/report/info', queryReportInfoGql, {name:'huyi'});
}
