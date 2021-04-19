import request from 'umi-request';
import type { TreeParams, PreviewParams } from './data.d';

export async function queryWorktable(params: TreeParams) {
    return request('/api/worktable/query', {
        method: 'POST',
        data: {
            ...params
        }
    });
}

export async function queryPreview(params: PreviewParams) {
    return request('/api/worktable/preview', {
        method: 'POST',
        data: {
            ...params
        }
    });
}

export async function queryWorktableRelations(params: {tbId: string}) {
    return request('/api/worktable/relations', {
        method: 'POST',
        data: {
            ...params
        }
    });
}
export async function queryWorktableRelationtbl(params: {tbId: string}) {
    return request('/api/worktable/relationtbl', {
        method: 'POST',
        data: {
            ...params
        }
    });
}
export async function queryWorktableHistory(params: {tbId: string}) {
    return request('/api/worktable/history', {
        method: 'POST',
        data: {
            ...params
        }
    });
}
export async function queryWorktableFields(params: {tbId: string}) {
    return request('/api/worktable/fields', {
        method: 'POST',
        data: {
            ...params
        }
    });
}
export async function queryWorktableEngine(params: {tbId: string}) {
    return request('/api/worktable/findWorkTableEngine', {
        method: 'POST',
        data: {
            ...params
        }
    });
}
export async function queryWorktableEngineRecommend(params: {tbId: string}) {
    return request('/api/worktable/workTableEngineRecommend', {
        method: 'POST',
        data: {
            ...params
        }
    });
}
export async function queryWorktableInfo(params: {tbId: string}) {
    return request('/api/worktable/info', {
        method: 'POST',
        data: {
            ...params
        }
    });
}