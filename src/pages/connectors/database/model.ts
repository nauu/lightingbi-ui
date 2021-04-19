import type { Effect, Reducer } from 'umi';
import {  } from './service';


export interface StateType {
  current?: string;
  step?: {

  }
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchData: Effect;
  };
  reducers: {
    saveCurrentStep: Reducer<StateType>;
    clear: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'connectorsAnddatabase',

  state: {
    current: 'step1',
    step: {

    }
  },

  effects: {
    *fetchData({ payload }, { call, put }) {
      // const response = yield call(queryWorktable, payload);
      // yield put({
      //   type: 'show',
      //   payload: response,
      // });
    },
    

  },

  reducers: {
    saveCurrentStep(state, { payload }) {
      return {
        ...state,
        current: payload,
      };
    },

    clear() {
      return {
        current: 'step1',
        sheets: [],
      }
    }
  },
};

export default Model;
