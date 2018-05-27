import { getNodeAddrByBarnNo, getAllBarns, getAirConDashboard, getAirconBlockItems } from '../services/grain'
import pathToRegexp from 'path-to-regexp'


export default {
  namespace: 'grainDash',

  state: {
    gatewayAddr: 1,
    barnNo: 1,
    barnsOptions: [],
    airConDash: [],
    airconBlockItems: ['a','b','c'],
    loading: false,
  },


  subscriptions: {
    setup ({ dispatch, history }) {
      return history.listen(({pathname, query}) => {

        // console.log('pathname:', pathname)
        if (pathname.search('grain-dash') != -1) {

          const match = pathToRegexp('/grain/grain-dash/:barnNo').exec(pathname)
          // console.log('---in graindash models---')
          // console.log('match:', match)

          const barnNo = match[1]
          // console.log('match barnNo:', barnNo)

          dispatch({
            type: 'fetchBarnNo',
            payload: {
              barnNo: barnNo,
            },
          })

          // dispatch({
          //   type: 'fetchBarnsOptions',
          // })

          dispatch({ 
            type: 'fetchAirConDashboard',
          })

          dispatch({ 
            type: 'fetchAirconBlockItems',
            payload: {
              barnNo: barnNo,
            }
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


    * fetchAirConDashboard (_, { call, put, select }) {

      const gatewayAddr = yield select(state => state.grainDash.gatewayAddr)
      const barnNo = yield select(state => state.grainDash.barnNo)
      const payload = '?gatewayAddr=' + gatewayAddr + '&barnNo=' + barnNo

      console.log('payload is:', payload)

      const airConDash = yield call(getAirConDashboard, payload)

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

      yield put({
        type: 'save',
        payload: {
          barnNo: barnNo,
        }
      })
    },


    * fetchAirconBlockItems (_, { call, put, select }) {

      const gatewayAddr = yield select(state => state.grainDash.gatewayAddr)
      const barnNo = yield select(state => state.grainDash.barnNo)
      
      const payload = {
        gatewayAddr: gatewayAddr,
        barnNo: barnNo,
      }

      console.log('fetchAirconBlockItems payload is:', payload)

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
