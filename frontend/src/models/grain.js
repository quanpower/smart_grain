import { getBarns, getAlarmStatus } from "../services/grain"

export default {
  namespace: 'grain',

  state: {
    alarmStatus: false,
    showAudio: true,
    barns: [],
    loading: false,
  },

  effects: {
    *fetchBarns(_, { call, put }) {
      const response = yield call(getBarns);
      yield put({
        type: 'save',
        payload: {
          barns: response.barns,
        },
      });
    },

    * showAudio ({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: payload,
      })
    },

    *fetchAlarmStatus(_, { call, put }) {
      const response = yield call(getAlarmStatus);
      yield put({
        type: 'save',
        payload: {
          alarmStatus: response.alarmStatus,
        },
      });
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
        alarmStatus: false,
        showAudio: true,
        barns: [],
      };
    },
  },
};
