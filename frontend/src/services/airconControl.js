import { stringify } from 'qs';
import request from '../utils/request';


export async function query () {
  return request('/api/air-conditioner_control');
}


export async function create(params) {
  return request('/api/air-conditioner_control', {
    method: 'POST',
    body: params,
  });
}

export async function remove(params) {
  return request('/api/air-conditioner_control', {
    method: 'DELETE',
    body: params,
  });
}

export async function update(params) {
  return request('/api/air-conditioner_control', {
    method: 'PATCH',
    body: params,
  });
}


export async function switchAirconOnOff(params) {
  return request('/api/air-conditioner_control_on_off', {
    method: 'POST',
    body: params,
  });
}


export async function switchAirconOnOffAllOneKey(params) {
  return request('/api/air-conditioner_on_off_all_one_key', {
    method: 'POST',
    body: params,
  });
}


export async function updateLoraNodeDatetime(params) {
  return request('/api/lora_node_datetime_update', {
    method: 'POST',
    body: params,
  });
}


export async function updateOneAirConStartEndTime(params) {
  return request('/api/one_air-conditioner_start_end_time_update', {
    method: 'POST',
    body: params,
  });
}


export async function updateBarnLoraNodeDatetime(params) {
  return request('/api/barn_lora_node_datetime_update', {
    method: 'POST',
    body: params,
  });
}


export async function getAirConControlItems(params) {
  return request('/api/air-conditioner_control_items', {
    method: 'POST',
    body: params,
  });
}


