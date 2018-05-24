import { getAirConTemp, getAirConTemps, getAirConTempRecord, getAirConDashboard, getAllBarns, getAllNodes } from "../services/grain"



Date.prototype.Format = function(format){
  const o = {
    "M+" : this.getMonth()+1, //month
    "d+" : this.getDate(), //day
    "h+" : this.getHours(), //hour
    "m+" : this.getMinutes(), //minute
    "s+" : this.getSeconds(), //second
    "q+" : Math.floor((this.getMonth()+3)/3), //quarter
    "S" : this.getMilliseconds() //millisecond
  }
  if(/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
  for(var k in o) {
    if(new RegExp("("+ k +")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
    }
  }
  return format;
}


export default {
  namespace: 'airconDetail',

  state: {
    gatewayAddr: 1,
    barnNo: 1,
    nodeAddr: 20,
    barnsNodesOptions: [],
    airConRealtimeTemp: [],
    airConTemps: [],
    airConTempRecord: [],
    loading: false,
  },

  
  effects: {

    * fetchGatewayAddr ({ payload }, { put }) {
      const { gatewayAddr } = payload
      yield put({
        type: 'save',
        payload: {
          gatewayAddr: gatewayAddr,
        }
      })
    },


    * fetchBarnNo ({ payload }, { put }) {
      const { barnNo } = payload
      console.log('-----barnNo-----!!')
      console.log(barnNo)
      yield put({
        type: 'save',
        payload: {
          barnNo: barnNo,
        }
      })
    },


    * fetchNodeAddr ({ payload }, { put }) {
      const { nodeAddr } = payload
      console.log('-----nodeAddr-----!!')
      console.log(nodeAddr)

      yield put({
        type: 'save',
        payload: {
          nodeAddr: nodeAddr,
        }
      })
    },


    * fetchBarnsNodesOptions ({ }, { call, put }) {
      const { list } = yield call(getAllNodes)
      const barnsNodesOptions = list
      console.log('-----barnsNodesOptions is------ :', barnsNodesOptions)
      yield put({
        type: 'save',
        payload: {
          barnsNodesOptions: barnsNodesOptions,
        }
      })
    },


    * fetchAirConRealtimeTemp ({ payload }, { call, put }) {

      const airConRealtimeTemp = yield call(getAirConTemp, payload)

      console.log('airConRealtimeTemp', airConRealtimeTemp)
      yield put({
        type: 'updateAirConRealtimeTemp',
        payload: {
          airConRealtimeTemp: airConRealtimeTemp.airConRealtimeTemp,
        }
      })
    },


    * fetchAirConTemps ({ payload }, { call, select, put }) {

      // const gatewayAddr = yield select(state => state.aircondetail.gatewayAddr)
      // console.log('-----fetchAirConTemps gatewayAddr-------:', gatewayAddr)

      // const nodeAddr = yield select(state => state.aircondetail.nodeAddr)
      // console.log('-----fetchAirConTemps nodeAddr-------:', nodeAddr)

      // const payload = {
      //   gateway_addr: gatewayAddr,
      //   node_addr: nodeAddr,
      // }

      const airConTemps = yield call(getAirConTemps, payload)
      console.log('airConTemps', airConTemps)

      yield put({
        type: 'updateAirConTemps',
        payload: {
          airConTemps: airConTemps.airConTemps,
        }
      })
    },


    * fetchAirConTempRecord ({ payload }, { call, select, put }) {

      // const gatewayAddr = yield select(state => state.aircondetail.gatewayAddr)
      // console.log('----- fetchAirConTempRecordgatewayAddr-------:', gatewayAddr)

      // const nodeAddr = yield select(state => state.aircondetail.nodeAddr)
      // console.log('-----fetchAirConTempRecord nodeAddr-------:', nodeAddr)

      const end_time = new Date().Format('yyyy-MM-dd hh:mm:ss')
      const start_time = new Date(new Date().getTime() - 24 * 60 * 60 * 1000).Format('yyyy-MM-dd hh:mm:ss')

      console.log('end-time:', end_time)
      console.log('start-time:', start_time)

      const { gatewayAddr } = payload
      const { nodeAddr } = payload

      const payload1 = {
        gateway_addr: gatewayAddr,
        node_addr: nodeAddr,
        start_time: start_time,
        end_time: end_time,
      }

      const airConTempRecord = yield call(getAirConTempRecord, payload1)
      console.log('airConTempRecord', airConTempRecord)
      yield put({
        type: 'updateAirConTempRecord',
        payload: {
          airConTempRecord: airConTempRecord.airConTempRecord,
        }
      })
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },

    clear() {
      return {
        startTime: '08:00',
        endTime: '18:00',
      };
    },



    updateAirConRealtimeTemp (state, { payload: {airConRealtimeTemp} }) {
      return {
        ...state, airConRealtimeTemp: airConRealtimeTemp,
      }
    },

    updateAirConTemps (state, { payload: {airConTemps} }) {
      return {
        ...state, airConTemps: airConTemps,
      }
    },

    updateAirConTempRecord (state, { payload: {airConTempRecord} }) {
      return {
        ...state, airConTempRecord: airConTempRecord,
      }
    },
  },
};


