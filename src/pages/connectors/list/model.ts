import type { Effect, Reducer } from 'umi';
import {  } from './service';


export interface StateType {

}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {

  };
  reducers: {
    show: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'connectors',

  state: {

  },

  effects: {
    

  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    },
  },
};

export default Model;
