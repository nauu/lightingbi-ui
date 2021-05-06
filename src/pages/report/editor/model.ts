import { Effect, Reducer } from 'umi';
import { ReportEditorData } from './data.d';
import { queryReportInfo } from './service';

interface ModelType {
  namespace: string
  state: ReportEditorData
  effects: {
    fetchReportInfo: Effect
  },
  reducers: {
    save: Reducer
  }
}

const Model: ModelType = {
  namespace: 'reportEditor',

  state: {
    report: {
      id: '',
      name: '',
      data: null
    }
  },

  effects: {
    *fetchReportInfo(_, { call, put }) {
      const res = yield call(queryReportInfo);
      yield put({
        type: 'save',
        payload: {
          report: res
        }
      })
    }
  },

  reducers: {
    save(state, { payload }){
      return {
        ...state,
        ...payload
      }
    }
  }
};

export default Model;
