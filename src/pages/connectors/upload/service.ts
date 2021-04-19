import request from 'umi-request';

export async function sheetfield(params: any) {
  return request('/api/mydatasource/sheetfield', {
    method: 'POST',
    data: params,
  });
}

export async function setSheet(params: any) {
  return request('/api/mydatasource/setSheet', {
    method: 'POST',
    data: params,
  });
}