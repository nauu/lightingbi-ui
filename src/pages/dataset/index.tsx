import React, { Component } from 'react';
import { Layout, Tree, Input, Card } from 'antd';

import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { StateType } from './model';

import Preview from './components/preview';
// import Relation from './components/relation';
import styles from './style.less';
import type { PreviewData } from './data.d';

const { Sider, Content } = Layout;
const { Search } = Input;


interface DatasetProps {
    dataset: StateType;
    treeData: any[];
    previewData: PreviewData;
    dispatch: Dispatch;
    loading: boolean;
    tabActiveKey: string;
}

interface DatasetState {
    selectedNode: any;

}

class Dataset extends Component<DatasetProps,DatasetState> {

    public state: DatasetState = {
        selectedNode: {},
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'dataset/fetchTree',
            payload: {
                hasLeaf: true,
                hasSubDir: true,
                pCode: ''
            },
        });
    };

    onSearchKeyChange = () => {

    };

    onSelectNode = (selectedKeys: React.Key[], info: any) => {
        console.log('selected', selectedKeys, info);
        const { dispatch } = this.props;
        dispatch({
            type: 'dataset/show',
            payload: {
                selectedNode: info,
                tbId: info.node.dsUUID,
                tabActiveKey: 'dataPreview',
            }
        });
    };

    onTabChange = (tabActiveKey: string) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'dataset/show',
            payload: {
                tabActiveKey
            }
        });

    };

    renderByTabKey = (tabActiveKey?: string) => {
        if ( tabActiveKey === undefined ) {
            tabActiveKey = this.props.tabActiveKey;
        }
        switch (tabActiveKey) {
            // case 'relationRecord':
            //     return (
            //         <Relation />
            //     )
            // case 'updateRecord':
            //     return ;
            // case 'fieldsInfo':
            //     return ;
            // case 'structureDesign':
            //     return ;
            case 'dataPreview':
            default:
                return (
                    <Preview />
                );
        }
    };

    render() {
        const { treeData, tabActiveKey } = this.props;
        // const tabList = [
        //     {
        //         key: 'dataPreview',
        //         tab: '数据预览',
        //     },
        //     {
        //         key: 'relationRecord',
        //         tab: '关联记录',
        //     },
        //     {
        //         key: 'updateRecord',
        //         tab: '更新记录',
        //     },
        //     {
        //         key: 'fieldsInfo',
        //         tab: '字段信息',
        //     },
        //     {
        //         key: 'structureDesign',
        //         tab: '结构设计',
        //     },
        // ];

        return (
            <Layout>
                <Sider
                    theme='light'
                    className={styles.sider}
                >
                    <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onSearchKeyChange} />
                    <Tree
                        defaultExpandedKeys={['0']}
                        defaultSelectedKeys={['0-2']}
                        onSelect={this.onSelectNode}
                        treeData={treeData}
                    />

                </Sider>
                <Content className={styles.siteContent} >
                        {/* <Card
                            className={styles.tabCard}
                            tabList={tabList}
                            activeTabKey={tabActiveKey}
                            onTabChange={this.onTabChange}
                        >
                            {this.renderByTabKey(tabActiveKey)}
                        </Card> */}
                        <Preview />
                    </Content>
                {/* <Layout>

                </Layout> */}
            </Layout>

        );
    }

};

export default connect(
    ({
        dataset,
    }: {
        // 变量类型
        dataset: StateType;
    }) => ({
        // 传入参数
        dataset,
        treeData: dataset.treeData,
        previewData: dataset.previewData,
        tabActiveKey: dataset.tabActiveKey,
    }),
)(Dataset);

