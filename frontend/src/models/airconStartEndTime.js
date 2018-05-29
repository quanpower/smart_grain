import { updateOneAirConStartEndTime } from '../services/airconControl'

export default {
  namespace: 'airconStartEndTime',

  state: {
    startTime: '08:00',
    endTime: '18:00',
    loading: false,
  },

  
  effects: {
    * getStartTime ({ payload }, { call, put }) {
      console.log('payload', payload)
      const data = payload
      console.log('data is:', data)
      yield put({
        type: 'updateStartTime',
        payload: {
          startTime: data.startTime,
        }
      })

    },

    * getEndTime ({ payload }, { call, put }) {
      console.log('payload', payload)
      const data = payload
      console.log('data is:', data)
      yield put({
        type: 'updateEndTime',
        payload: {
          endTime: data.endTime,
        }
      })

    },

    * updateOneStartEndTime ({ payload }, { call, put }) {
      console.log('payload', payload)
      const data = yield call(updateOneAirConStartEndTime, payload)
      console.log('data is:', data)
      yield put({
        type: 'updateEndTime',
        payload: {
          endTime: data.endTime,
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

    updateStartTime (state, { payload: { startTime } }) {
      return {
        ...state, startTime: startTime,
      }
    },

    updateEndTime (state, { payload: { endTime } }) {
      return {
        ...state, endTime: endTime,
      }
    },

    updateAirConTempRecord (state, { payload: {airConTempRecord} }) {
      return {
        ...state, airConTempRecord: airConTempRecord,
      }
    },
  },
};


