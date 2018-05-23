
import { getNodeAddrByBarnNo, getAllBarns, getAirConDashboard, getAirconBlockItems } from '../services/grain'


export default {
  namespace: 'graindash',

  state: {
    gatewayAddr: 1,
    barnNo: 1,
    barnsOptions: [],
    airConDash: [],
    airconBlockItems: ['a','b','c'],
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


    * fetchBarnsOptions ({}, { select, call, put }) {
      const user = yield select(state => state.app.user)
      console.log('************airconcontrol user*************:', user)
      const payload = {
        userID: user.id,
        username: user.username,
      }
      const { list } = yield call(getAllBarns, payload)
      const barnsOptions = list
      console.log('-----barnsOptions is------ :', barnsOptions)
      yield put({
        type: 'save',
        payload: {
          barnsOptions: barnsOptions,
        }
      })
    },


    * fetchAirConDashboard ({payload}, { call, put, select }) {

      const gatewayAddr = yield select(state => state.graindash.gatewayAddr)
      console.log('-----gatewayAddr-------:', gatewayAddr)

      const barnNo = yield select(state => state.graindash.barnNo)
      console.log('-----barnNo-------:', barnNo)
      
      const payload1 = payload || {
        gatewayAddr: gatewayAddr,
        barnNo: barnNo,
      }

      console.log('payload1 is:', payload1)

      const airConDash = yield call(getAirConDashboard, payload1)

      console.log('airConDash is :', airConDash)

      yield put({
        type: 'updateAirConDashboard',
        payload: {
          airConDash: airConDash.airConDash,
        }
      })
    },


    * fetchBarnNo ({ payload }, { put }) {
      const { barnNo } = payload

      console.log('-----payload is------ :', payload)
      console.log('-----barnNo is------ :', barnNo)
      yield put({
        type: 'save',
        payload: {
          barnNo: barnNo,
        }
      })
    },


    * fetchAirconBlockItems ({ payload }, { call, put }) {
      const airconBlockItems = yield call(getAirconBlockItems, payload)
      console.log('airconBlockItems is :', airconBlockItems)
      yield put({
        type: 'save',
        payload: {
          airconBlockItems: airconBlockItems.airconBlockItems,
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
        gatewayAddr: 1,
        barnNo: 1,
        barnsOptions: [],
        airConDash: [],
        airconBlockItems: ['a','b','c'],
      };
    },

    updateAirConDashboard (state, { payload: { airConDash } }) {
      console.log('reducers airConDash is :', airConDash)

      return { ...state, airConDash: airConDash }
    },
  },
};
