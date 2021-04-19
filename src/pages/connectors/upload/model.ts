import type { Effect, Reducer } from 'umi';
import { sheetfield, setSheet } from './service';


export interface StateType {
  current?: string;
  sheets?: any[];
  // step?: {

  // };
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    getSheetfield: Effect;
    submitUpload: Effect;

  };
  reducers: {
    saveSheetData: Reducer<StateType>;
    saveCurrentStep: Reducer<StateType>;
    clear: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'connectorsAndupload',

  state: {
    current: 'step1',
    sheets: [],
  },

  effects: {
    *getSheetfield({ payload }, { call, put }) {
      const resp = yield call(sheetfield, payload);
      yield put({
        type: 'saveSheetData',
        payload: resp,
      });
    },

    *submitUpload({ payload }, { call, put }) {
      yield call(setSheet, payload);
      yield put({
        type: 'saveSheetData',
        payload,
      });
      yield put({
        type: 'saveCurrentStep',
        payload: 'step3',
      });
    },
  },

  reducers: {
    saveCurrentStep(state, { payload }) {
      return {
        ...state,
        current: payload,
      };
    },

    saveSheetData(state, { payload }) {
      return {
        ...state,
        sheets: [
          // ...(state as StateType).sheets,
          ...payload,
        ],
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
