import {gql} from 'graphql-request';

const queryReportInfoGql = gql`
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
  queryReportInfoGql
}
