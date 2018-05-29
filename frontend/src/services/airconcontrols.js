import { stringify } from 'qs';
import request from '../utils/request';


export async function query () {
  return request('/api/air-conditioner_controls');
}

export async function remove(params) {
  return request('/api/air-conditioner_controls', {
    method: 'DELETE',
    body: params,
  });
}

