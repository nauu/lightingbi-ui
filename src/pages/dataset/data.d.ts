export interface TreeParams {
    hasLeaf: boolean;
    hasSubDir: boolean; 
    pCode: string;

}

export interface PreviewParams {
    filterType: 'and' | 'or' | '';
    filters: string;
    order: string;
    tbId: string;

}

export interface TreeData {
    key: string;
    title: string;
    children: any[];
    [propName: string]: any
}

export interface TableListItem {
    [propName: string]: any
}

export interface PreviewData {
    colDetailList: any[];
    data: any[];
    [propName: string]: any
}

export interface RelationData {
    tableShowname: string;
    graphType: string;
    [propName: string]: any
}