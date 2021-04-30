import type { Effect, Reducer } from 'umi';
import { queryWorktable, queryPreview, 
  queryWorktableRelations, queryWorktableRelationtbl,
  queryWorktableHistory, queryWorktableFields,
  queryWorktableEngine, queryWorktableEngineRecommend,
  queryWorktableInfo

} from './service';

import treeUtils from '@/utils/treeUtils';

export interface StateType {
  treeData?: React.ReactText[];
  previewData?: any;
  relationData?: any;
  tbId?: string;
  tabActiveKey?: string;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchTree: Effect;
    fetchPreviewData: Effect;
    fetchHistory: Effect;
    fetchRelations: Effect;
    fetchRelationtbl: Effect;
    fetchFields: Effect;
    fetchInfo: Effect;
    fetchEngine: Effect;
    fetchEngineRecommend: Effect;

  };
  reducers: {
    show: Reducer<StateType>;
    queryTree: Reducer<StateType>;
    getPreviewData: Reducer<StateType>;
    getRelations: Reducer<StateType>;
    getRelationtbl: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'dataset',

  state: {
    treeData: [],
    previewData: {
      colDetailList: [],
      data: [],
      columns: [],
      dataSource: []
    },
    tbId: '',
    tabActiveKey: 'dataPreview',
  },

  effects: {
    *fetchTree({ payload }, { call, put }) {
      const response = yield call(queryWorktable, payload);
      yield put({
        type: 'queryTree',
        payload: Array.isArray(response) ? response : [],
      });
    },

    *fetchPreviewData({ payload }, { call, put }) {
      const response = yield call(queryPreview, payload);
      yield put({
        type: 'getPreviewData',
        payload: response,
      });
    },

    *fetchHistory({ payload }, { call, put }) {
      const response = yield call(queryWorktableHistory, payload);
      yield put({
        type: 'getHistory',
        payload: response,
      });
    },

    *fetchRelations({ payload }, { call, put }) {
      const response = yield call(queryWorktableRelations, payload);
      yield put({
        type: 'getRelations',
        payload: response,
      });
    },

    *fetchRelationtbl({ payload }, { call, put }) {
      const response = yield call(queryWorktableRelationtbl, payload);
      yield put({
        type: 'getRelationtbl',
        payload: response,
      });
    },

    *fetchFields({ payload }, { call, put }) {
      const response = yield call(queryWorktableFields, payload);
      yield put({
        type: 'getFields',
        payload: response,
      });
    },

    *fetchInfo({ payload }, { call, put }) {
      const response = yield call(queryWorktableInfo, payload);
      yield put({
        type: 'getInfo',
        payload: response,
      });
    },

    *fetchEngine({ payload }, { call, put }) {
      const response = yield call(queryWorktableEngine, payload);
      yield put({
        type: 'getEngine',
        payload: response,
      });
    },

    *fetchEngineRecommend({ payload }, { call, put }) {
      const response = yield call(queryWorktableEngineRecommend, payload);
      yield put({
        type: 'getEngineRecommend',
        payload: response,
      });
    },

  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    },

    queryTree(state, { payload }) {
      const data = payload.map((node: any) => {
        node.key = node.id;
        node.title = node.name;
        if (node.isFold) {
          node.selectable = false;
        } 
        return node;
      });
      const treeData = treeUtils.toTree(data, 'id', 'pid', 'children');
      return {
        ...state,
        treeData: treeData,
      };
    },

    getPreviewData(state, { payload }) {
      
      const columns = payload.colDetailList.filter((e1: any) => {
          return e1.selected;
      }).map((e: any) => {
          const item = {
              title: e.colAlias || e.colShowname,
              dataIndex: e.colPhyName,
              key: e.colPhyName,
              origin: e
          }
          return item;
      });
      const dataSource = payload.data.map((e: any, i: number) => {
        return {
          ...e,
          key: i
        }
      });

      return {
        ...state,
        previewData: { ...payload, columns, dataSource},
      };
    },

    getRelations(state, { payload }) {
      return {
        ...state,
        relationData: payload.map((e: any, i: number) => {
          return {
            ...e,
            key: i
          }
        }),
      };
    },
    
    getRelationtbl(state, { payload }) {
      return {
        ...state,
        relationtblData: payload,
      };
    }
  },
};

export default Model;
