import { updateOneAirConStartEndTime } from '../services/airconcontrol'


export default {
  namespace: 'tianshuoSetting',

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

