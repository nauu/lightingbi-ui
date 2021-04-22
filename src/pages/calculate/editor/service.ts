import request from "@/utils/requestGql";
import { getCalculateGql, executeCalculateGql } from './graphql';

export async function getCalculate() {
  return request('/api/calculate/get', getCalculateGql, {});
}

export async function executeCalculate(variables: object) {
  return request('/api/calculate/exec', executeCalculateGql, variables);
}
