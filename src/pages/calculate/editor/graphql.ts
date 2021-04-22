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

export {
  getCalculateGql,
  executeCalculateGql
}
