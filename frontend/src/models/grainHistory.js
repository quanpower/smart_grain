import { getGrainHistory } from '../services/grain'
import queryString from 'query-string'

export default {
  namespace: 'grainHistory',

  state: {
    grainHistory: [],
    loading: false,
  },

    subscriptions: {
    setup ({ dispatch, history }) {
      return history.listen(({pathname, query}) => {

        // console.log('pathname:', pathname)
        if (pathname.search('grain-history') != -1) {

          // const match = pathToRegexp('/grain/grain-history').exec(pathname)
          // // console.log('---in graindash models---')
          // // console.log('match:', match)

          // const nodeAddr = match[1]
          // console.log('match nodeAddr:', nodeAddr)

          // dispatch({
          //   type: 'fetchNodeAddr',
          //   payload: {
          //     nodeAddr: nodeAddr,
          //   },
          // })

          // dispatch({
          //   type: 'fetchBarnsOptions',
          // })

          dispatch({ 
            type: 'query',
          })

        }
      })
    }
  },

  effects: {
    * query ({ payload }, { call, put }) {
      const data = yield call(getGrainHistory, payload)
      if (data) {
        yield put({
          type: 'save',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
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
        grainHistory: [],
      };
    },
  },
};


