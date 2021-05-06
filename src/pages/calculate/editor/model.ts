import { Effect, Reducer } from 'umi';
import { CalculateEditorData } from './data.d';
import { getCalculate, executeCalculate } from './service';

export interface ModelType {
  namespace: string
  state: CalculateEditorData
  effects: {
    fetchCalc: Effect
    execCalc: Effect
  }
  reducers: {
    execSave: Reducer<CalculateEditorData>
  }
}

const Model: ModelType = {
  namespace: 'calculateEditor',

  state: {
    code: '',
    result: null
  },

  effects: {
    *fetchCalc(_, { call, put }) {
      const response = yield call(getCalculate);
      yield put({
        type: 'execSave',
        payload: {
          result: response
        }
      })
    },
    *execCalc({ payload }, { call, put }) {
      const response = yield call(executeCalculate, payload);
      yield put({
        type: 'execSave',
        payload: {
          result: response
        }
      });
      return response;
    }
  },

  reducers: {
    execSave(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  }
}

export default Model;
