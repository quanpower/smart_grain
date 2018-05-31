import { stringify } from 'qs';
import request from '../utils/request';



export async function getBarns () {
  return request('/api/barns');
}


export async function getAlarmStatus () {
  return request('/api/alarm_status');
}


export async function getAllBarns (params) {
  return request('/api/all_barns', {
    method: 'POST',
    body: params,
  });
}


export async function getAllNodes () {
  return request('/api/all_nodes');
}


export async function getGrainHistory () {
  return request('/api/grain_history');
}


export async function getAirConTemp (params) {
  return request('/api/air-conditioner_temperature' + params);
}


export async function getAirConTemps (params) {
  return request('/api/air-conditioner_temperatures' + params);
}


export async function getAirConTempRecord (params) {
  return request('/api/air-conditioner_temperature_record' + params);
}


export async function getAirConDashboard (params) {
  return request('/api/air-conditioner_dashboard' + params);
}


export async function getNodeAddrByBarnNo () {
  return request('/api/node_address_by_barn_no');
}


export async function getAirconBlockItems (params) {
  return request('/api/air-conditioner_block_items', {
    method: 'POST',
    body: params,
  });
}

