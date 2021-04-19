import { Effect, Reducer} from 'umi';
import { ChartListData } from './data.d';
import { queryChartList } from './service';

export interface ModelType {
  namespace: string
  state: ChartListData
  effects: {
    fetchChartList: Effect
  },
  reducers: {
    save: Reducer<ChartListData>
  }
}

const Model: ModelType = {
  namespace: 'chartList',

  state: {
    list: []
  },

  effects: {
    *fetchChartList(_, { call, put }) {
      const response = yield call(queryChartList);
      yield put({
        type: 'save',
        payload: {
          list: response
        }
      })
    }
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  }
}

export default Model


