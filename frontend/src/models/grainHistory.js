import { getGrainHistory } from '../services/grain'


export default {
  namespace: 'grainHistory',

  state: {
    grainHistory: [],
    loading: false,
  },

  effects: {
    * query ({ payload }, { call, put }) {
      const data = yield call(getGrainHistory, payload)
      if (data.success) {
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


