import React, { Component } from 'react';
import ProTable from '@ant-design/pro-table';
import { Dispatch } from 'umi';
import { connect } from 'umi';

import type { TableListItem, PreviewData } from '../data.d';


interface PreviewProps {
    dispatch: Dispatch;
    previewData: PreviewData;
    tbId: string;
}

class Preview extends Component<PreviewProps> {

    componentDidMount() {
        this.getPreviewData();
    }

    getPreviewData = () => {
        const { dispatch } = this.props;
        const { tbId } = this.props;
        dispatch({
            type: 'dataset/fetchPreviewData',
            payload: {
                filterType: 'and',
                filters: JSON.stringify([]),
                order: null,
                tbId: tbId
            },
        });
    };


    render() {
        const { previewData } = this.props;
        return (
            <ProTable<TableListItem>
                dataSource={previewData.dataSource}
                // request={(params, sorter, filter) => this.getPreviewData({...params, sorter, filter})}
                columns={previewData.columns}
            />
        );
    }
}

export default connect(
    ({ dataset }: { dataset: { previewData: PreviewData, tbId: string} }) => ({
        previewData: dataset.previewData,
        tbId: dataset.tbId,
    }),
)(Preview);