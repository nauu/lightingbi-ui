import {gql} from 'graphql-request';

const queryChartListGql = gql`
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
  queryChartListGql
}
