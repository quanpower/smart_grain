import { powerControl, getElectricPowerItems } from '../services/fireAlarm'
import { getNodeAddrByBarnNo, getAllBarns } from '../services/grain'


export default {
  namespace: 'fireAlarm',

  state: {
    gatewayAddr: 1,
    barnNo: 1,
    barnsOptions: [],
    electricPowerItems: [],
    switch: [],
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
      yield put({
        type: 'save',
        payload: {
          barnNo: barnNo,
        }
      })
    },

    * fetchBarnsOptions ({}, { select, call, put }) {
      const user = yield select(state => state.app.user)
      console.log('************fireAlarm user*************:', user)
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


    * fetchElectricPowerItems ({ payload }, { call, put }) {
      const data = yield call(getElectricPowerItems, payload)
      console.log('-----fetchAirConControlItems-------')
      console.log(data)

      if (data.success) {
        yield put({ type: 'save', payload: { electricPowerItems: data.list } })
      } else {
        throw data
      }
    },

    * switchElectricPower ({ payload }, { call, put }) {
      console.log('payload', payload)
      const data = yield call(powerControl, payload)
      if (data.success) {
        console.log(data)
      } else {
        throw data
      }
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
        electricPowerItems: [],
        switch: [],
      };
    },
  },
};

