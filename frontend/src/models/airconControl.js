import { create, remove, update, switchAirconOnOff, switchAirconOnOffAllOneKey, updateBarnLoraNodeDatetime, updateLoraNodeDatetime, oneAirConStartEndTimeUpdate, getAirConControlItems } from '../services/airconControl'
import { getNodeAddrByBarnNo, getAllNodes, getAllBarns } from '../services/grain'
import * as airConControlService from '../services/airconcontrols'
import pathToRegexp from 'path-to-regexp'

export default {
  namespace: 'airconControl',

  state: {
    gatewayAddr: 1,
    barnNo: 1,
    barnsOptions: [],
    airConControlItems: [],
    currentItem: {},
    loading: false,
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      return history.listen(({pathname, query}) => {

        // console.log('pathname:', pathname)
        if (pathname.search('aircon-control') != -1) {

          const match = pathToRegexp('/aircon-control/:barnNo').exec(pathname)
          // console.log('---in graindash models---')
          // console.log('match:', match)

          const barnNo = match[1]
          console.log('match barnNo:', barnNo)

          dispatch({
            type: 'fetchBarnNo',
            payload: {
              barnNo: barnNo,
            },
          })

          dispatch({
            type: 'fetchBarnsOptions',
          })

          dispatch({ 
            type: 'fetchAirConControlItems',
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

    * fetchBarnsOptions ({}, { select, call, put }) {
      const payload = {
        userID: 1,
        username: 'username',
      }
      
      const barnsOptions= yield call(getAllBarns, payload)
      console.log('-----barnsOptions is------ :', barnsOptions)
      yield put({
        type: 'save',
        payload: {
          barnsOptions: barnsOptions,
        }
      })
    },


    * fetchAirConControlItems ({ payload }, { call, put }) {
      const data = yield call(getAirConControlItems, payload)
      console.log('-----fetchAirConControlItems-------')
      console.log(data)

      if (data) {
        yield put({ type: 'save', payload: { airConControlItems: data} })
      } else {
        throw data
      }
    },


    * query ({ payload = {} }, { call, put }) {
      const data = yield call(query, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      }
    },

    * delete ({ payload }, { call, put, select }) {
      const data = yield call(remove, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.user)
      if (data) {
        yield put({ type: 'save', payload: { selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload) } })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    * multiDelete ({ payload }, { call, put }) {
      const data = yield call(usersService.remove, payload)
      if (data) {
        yield put({ type: 'save', payload: { selectedRowKeys: [] } })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    * create ({ payload }, { call, put }) {
      console.log('payload', payload)
      const data = yield call(create, payload)
      if (data) {
        console.log('i am in!')
        console.log(data)
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },


    * airconOnOff ({ payload }, { call, put }) {
      console.log('payload', payload)
      const data = yield call(switchAirconOnOff, payload)
      if (data) {
        console.log('switch aircon on/off!')
        console.log(data)
      } else {
        throw data
      }
    },


    * airconOnOffAllOneKey ({ payload }, { call, put }) {
      console.log('payload:', payload)
      const data = yield call(switchAirconOnOffAllOneKey, payload)
      if (data) {
        console.log('switch aircon on/off!')
        console.log(data)
      } else {
        throw data
      }
    },


    * updateLoraNode ({ payload }, { call, put }) {
      console.log('payload', payload)
      const data = yield call(updateLoraNodeDatetime, payload)
      if (data) {
        console.log('update lora node datetime!')
        console.log(data)
      } else {
        throw data
      }
    },


    * updateBarnLoraNode ({ payload }, { call, put }) {
      console.log('payload', payload)

      const data = yield call(updateBarnLoraNodeDatetime, payload)
      if (data) {
        console.log('update lora node datetime!')
        console.log(data)
      } else {
        throw data
      }
    },

    * update ({ payload }, { select, call, put }) {
      const id = yield select(({ user }) => user.currentItem.id)
      const newUser = { ...payload, id }
      const data = yield call(update, newUser)
      if (data) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
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
        airConControlItems: [],
        currentItem: {},
      };
    },
    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

    switchIsMotion (state) {
      window.localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },
  },
};

