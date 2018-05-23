
import { stringify } from 'qs';
import request from '../utils/request';


export async function powerControl(params) {
  return request('/api/electric_power_control', {
    method: 'POST',
    body: params,
  });
}


export async function getElectricPowerItems(params) {
  return request('/api/electric_power_control_items', {
    method: 'POST',
    body: params,
  });
}

