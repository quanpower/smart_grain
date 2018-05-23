import { stringify } from 'qs';
import request from '../utils/request';

export async function switchTianshuoOnOff(params) {
  return request('/api/tianshuo_on_off_control', {
    method: 'POST',
    body: params,
  });
}



