import { Effect, Reducer} from 'umi';
import {ChartEditorData, ChartFieldType, DatasetFieldType} from './data.d';
import { queryChartInfo, queryDatasetFields } from './service';

export interface ModelType {
  namespace: string
  state: ChartEditorData
  effects: {
    fetchChartInfo: Effect
    fetchDatasetFileds: Effect
    saveChartFields: Effect
  },
  reducers: {
    save: Reducer<ChartEditorData>
  }
}

const Model: ModelType = {
  namespace: 'chartEditor',

  state: {
    fields: [],
    dimension: [],
    measure: [],
    chartType: 'bar'
  },

  effects: {
    *fetchChartInfo(_, { call, put }) {
      const response = yield call(queryChartInfo);
      yield put({
        type: 'save',
        payload: {
          dimension: response.dimension,
          measure: response.measure,
          chartType: response.chartType
        }
      })
    },
    *fetchDatasetFileds(_, { call, put }) {
      const response = yield call(queryDatasetFields);
      yield put({
        type: 'save',
        payload: {
          fields: response
        }
      })
    },
    *saveChartFields({ payload }, { select, put }) {
      yield put({
        type: 'save',
        payload: {
          dimension: payload.dimension,
          measure: payload.measure
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


