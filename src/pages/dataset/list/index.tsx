import React, { Component } from 'react';
import { Layout, Tree, Input, Card } from 'antd';
import ProTable from '@ant-design/pro-table';


import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { StateType } from './model';

import SearchTree from './components/SearchTree';
import styles from './style.less';
import type { TableListItem, PreviewData } from './data.d';

const { TreeNode } = Tree;
const { Sider, Content } = Layout;
const { Search } = Input;

interface DatasetProps {
    dataset: StateType;
    tbId: string;
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
        // this.getPreviewData();    
    };

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

    onSearchKeyChange = () => {

    };
  /**
   * 选中树节点执行函数
   * @param selectedKeys -- 选中的树节点的idKey,格式:['xxx','yyy']
   * @param selected  -- 是否选中,格式:bool
   * @param selectedNodes  -- 选中的节点的node,格式:['xxx','yyy'],可以通过selectedNodes[0].props.data取值
   * @param node -- 当前选中的【唯一】节点信息,可以通过node.props.data取值
   */
    onSelectNode = (selectedKeys: React.Key[], info: any) => {
        console.log('selected', selectedKeys, info);
        const { dispatch } = this.props;
        dispatch({
            type: 'dataset/show',
            payload: {
                selectedNode: info.selectedNodes,
                tbId: info.node.dsUUID,
                tabActiveKey: 'dataPreview',
            }
        });
        this.getPreviewData();
    };

    onLoad = (selectedKeys: React.Key[], info: any) => {
        console.log('load', this);
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

    render() {
        const { treeData, previewData } = this.props;
        
        return (
            <Layout>
                <Sider
                    theme='light'
                    className={styles.sider}
                >   
                    <SearchTree 
                        dataList={treeData}
                        handleOnLoad={this.onLoad}
                        handleOnSelect={this.onSelectNode}
                    >

                    </SearchTree>
                    {/* <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onSearchKeyChange} />
                    <Tree
                        blockNode= {true}
                        defaultExpandedKeys={['0']}
                        defaultSelectedKeys={['0-2']}
                        onLoad={this.onLoad}
                        onSelect={this.onSelectNode}
                        // treeData={treeData}
                    >
                        { this.renderTreeNodes(treeData) }
                    </Tree> */}

                </Sider>
                <Content className={styles.siteContent} >
                    <Card
                        style={{ height: '100%', }}
                        // className={styles.tabCard}
                        // tabList={tabList}
                        // activeTabKey={tabActiveKey}
                        // onTabChange={this.onTabChange}
                    >
                        {/* {this.renderByTabKey(tabActiveKey)} */}
                        <ProTable<TableListItem>
                        dataSource={previewData.dataSource}
                        // request={(params, sorter, filter) => this.getPreviewData({...params, sorter, filter})}
                        columns={previewData.columns}
                        
                    />
                    </Card>
                </Content>
            </Layout>
        );
    }
};

export default connect(
    ({
        dataset, 
    }: {
        dataset: StateType; 
    }) => ({
        dataset, 
        tbId: dataset.tbId,
        treeData: dataset.treeData,
        previewData: dataset.previewData,
        tabActiveKey: dataset.tabActiveKey,
    }),
)(Dataset);

