import {gql} from 'graphql-request';

const getCalculateGql = gql`
  query {
    findDatasetPage(page:{num:1,size:10,sort:""}){
      num
      size
      totalPage
      count
      context{
        dataset
        fields
      }
    }
  }
`;

const executeCalculateGql = gql`
  query execFormula($code: String!) {
    formulaCalculate(formula: $code)
  }
`;

export {
  getCalculateGql,
  executeCalculateGql
}
