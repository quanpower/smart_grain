import { stringify } from 'qs';
import request from '../utils/request';



export async function getBarns () {
  return request('/api/barns');
}


export async function getAlarmStatus () {
  return request('/api/alarm_status');
}


export async function getAllBarns () {
  return request('/api/all_barns');
}


export async function getAllNodes () {
  return request('/api/all_nodes');
}


export async function getGrainHistory () {
  return request('/api/grain_history');
}


export async function getAirConTemp () {
  return request('/api/air-conditioner_temperature');
}


export async function getAirConTemps () {
  return request('/api/air-conditioner_temperatures');
}


export async function getAirConTempRecord () {
  return request('/api/air-conditioner_temperature_record');
}


export async function getAirConDashboard () {
  return request('/api/air-conditioner_dashboard');
}


export async function getNodeAddrByBarnNo () {
  return request('/api/node_address_by_barn_no');
}


export async function getAirconBlockItems () {
  return request('/api/air-conditioner_block_items');
}

