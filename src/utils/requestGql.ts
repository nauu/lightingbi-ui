import { GraphQLClient } from 'graphql-request';

const request = async function(endpoint: string, query: string, variables: object) {
  if(process.env.NODE_ENV === 'production') {
    // eslint-disable-next-line no-param-reassign
    endpoint = '/graphql';
  }
  const client = new GraphQLClient(endpoint);
  let data;
  try {
    const res = await client.rawRequest(query, variables);
    data = res.data;
  } catch (e) {
    console.error(e);
    // TODO 异常处理
  }
  return data;
}

export default request;
