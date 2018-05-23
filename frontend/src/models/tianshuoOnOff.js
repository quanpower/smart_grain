
import { switchTianshuoOnOff } from '../services/tianshuoOnOff'


export default {
  namespace: 'tianshuoOnOff',

  state: {
    switch: [],
    loading: false,
  },

  effects: {
    * updateTianshuoOnOff ({ payload }, { call, put }) {
      console.log('payload', payload)
      const data = yield call(switchTianshuoOnOff, payload)
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
        switch: [],

      };
    },
  },
};


