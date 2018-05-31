import { getAirConTemp, getAirConTemps, getAirConTempRecord, getAirConDashboard, getAllBarns, getAllNodes } from "../services/grain"

import pathToRegexp from 'path-to-regexp'


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
    nodeAddr: 29,
    barnsNodesOptions: [],
    airConRealtimeTemp: [],
    airConTemps: [],
    airConTempRecord: [],
    loading: false,
  },


  subscriptions: {
    setup ({ dispatch, history }) {
      return history.listen(({pathname, query}) => {

        // console.log('pathname:', pathname)
        if (pathname.search('aircon-detail') != -1) {

          const match = pathToRegexp('/aircon-detail/:nodeAddr').exec(pathname)
          // console.log('---in graindash models---')
          // console.log('match:', match)

          const nodeAddr = match[1]
          console.log('match nodeAddr:', nodeAddr)

          dispatch({
            type: 'fetchNodeAddr',
            payload: {
              nodeAddr: nodeAddr,
            },
          })

          dispatch({
            type: 'fetchBarnsNodesOptions',
          })

          dispatch({ 
            type: 'fetchAirConRealtimeTemp',
          })

          dispatch({ 
            type: 'fetchAirConTemps',
          })

          dispatch({ 
            type: 'fetchAirConTempRecord',
          })

        }
      })
    }
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
      const barnsNodesOptions = yield call(getAllNodes)
      console.log('-----barnsNodesOptions is------ :', barnsNodesOptions)
      yield put({
        type: 'save',
        payload: {
          barnsNodesOptions: barnsNodesOptions,
        }
      })
    },


    * fetchAirConRealtimeTemp (_, { call, select, put }) {


      const gatewayAddr = yield select(state => state.airconDetail.gatewayAddr)
      const nodeAddr = yield select(state => state.airconDetail.nodeAddr)
      const payload = '?gatewayAddr=' + gatewayAddr + '&nodeAddr=' + nodeAddr

      console.log('payload is:', payload)
      const airConRealtimeTemp = yield call(getAirConTemp, payload)

      console.log('airConRealtimeTemp', airConRealtimeTemp)
      yield put({
        type: 'updateAirConRealtimeTemp',
        payload: {
          airConRealtimeTemp: airConRealtimeTemp.airConRealtimeTemp,
        }
      })
    },


    * fetchAirConTemps (_, { call, select, put }) {

      // const gatewayAddr = yield select(state => state.aircondetail.gatewayAddr)
      // console.log('-----fetchAirConTemps gatewayAddr-------:', gatewayAddr)

      // const nodeAddr = yield select(state => state.aircondetail.nodeAddr)
      // console.log('-----fetchAirConTemps nodeAddr-------:', nodeAddr)

      // const payload = {
      //   gateway_addr: gatewayAddr,
      //   node_addr: nodeAddr,
      // }

      const gatewayAddr = yield select(state => state.airconDetail.gatewayAddr)
      const nodeAddr = yield select(state => state.airconDetail.nodeAddr)
      const payload = '?gatewayAddr=' + gatewayAddr + '&nodeAddr=' + nodeAddr



      const airConTemps = yield call(getAirConTemps, payload)
      console.log('airConTemps', airConTemps)

      yield put({
        type: 'updateAirConTemps',
        payload: {
          airConTemps: airConTemps.airConTemps,
        }
      })
    },


    * fetchAirConTempRecord (_, { call, select, put }) {

      const gatewayAddr = yield select(state => state.airconDetail.gatewayAddr)
      const nodeAddr = yield select(state => state.airconDetail.nodeAddr)

      const endTime = new Date().Format('yyyy-MM-dd hh:mm:ss')
      const startTime = new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000).Format('yyyy-MM-dd hh:mm:ss')
      const payload = '?gatewayAddr=' + gatewayAddr + '&nodeAddr=' + nodeAddr + '&startTime=' + startTime + '&endTime=' + endTime

      console.log('endTime:', endTime)
      console.log('startTime:', startTime)


      const airConTempRecord = yield call(getAirConTempRecord, payload)
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


