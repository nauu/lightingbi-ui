/**
 * 搜索功能树形组件
 */

import React from 'react';
import { Tree, Input, Spin } from 'antd';

// 页面级定义变量
const { TreeNode } = Tree;
const { Search } = Input;

export interface SearchTreeProps {
  idKey?: string; // 树节点对应的id名称,默认为:key
  nameKey?: string; // 树节点对应的name名称,默认为:title
  childListKey?: string; // 树节点的子集列表的id名称,默认为:children

  handleOnLoad?: ((selectedKeys: React.Key[], info: any) => void); // 选中树节点执行的回调函数
  handleOnSelect?: ((selectedKeys: React.Key[], info: any) => void); // 选中树节点执行的回调函数

  searchPlaceholder?: string;  // 搜索的placeholder提示语
  dataList?: any[]; // 要展示的数据列表,格式为:[{ title: '河南', key: 'A100', children: [{ title: '郑州', key: 'A1001' }] }]
}

class SearchTree extends React.Component<SearchTreeProps> {

  // 定义传入属性的默认值
  static defaultProps = {
    idKey: 'key',
    nameKey: 'title',
    childListKey: 'children',

    searchPlaceholder: '请输入搜索关键字',
    dataList: [],
    // dataList: [{ title: '河南', key: 'A100', children: [{ title: '郑州', key: 'A1001' }] }, { title: '上海', key: 'B1001', isLeaf: true }]
  }

  state = {
    expandedKeys: [],   // 展开的树节点idKey
    selectedKeys: [],   // 选中的树节点idKey

    searchValue: '',   // 搜索的关键字
    searchLoading: false, // 由于是前端搜索,不存在服务器请求接口时间,只存在render渲染时间。为了优化体验,故模拟loading加载

  }

  onLoad = (selectedKeys: React.Key[], info: any) => {
    debugger
    const { handleOnLoad } = this.props;
    if (typeof handleOnLoad === 'function') {
      handleOnLoad(selectedKeys, info);
    }
  }

  /**
   * 选中树节点执行函数
   * @param selectedKeys -- 选中的树节点的idKey,格式:['xxx','yyy']
   * @param selected  -- 是否选中,格式:bool
   * @param selectedNodes  -- 选中的节点的node,格式:['xxx','yyy'],可以通过selectedNodes[0].props.data取值
   * @param node -- 当前选中的【唯一】节点信息,可以通过node.props.data取值
   */
  onSelect = (selectedKeys: React.Key[], info: any) => {
    const { handleOnSelect } = this.props;

    // 如果有handleOnSelect回调函数传入,则执行它
    if (typeof handleOnSelect === 'function') {
      handleOnSelect(selectedKeys, info);
    }

  }

  /**
   * 实时搜索功能函数
   * @param value -- 输入框的关键字 
   */
  onChange = (value:string) => {
    
  }


  /**
   * 渲染树节点NodeName函数
   * @param key -- 树节点的idKey对应的值
   * @param title -- 树节点的nameKey对应的值
   * @param currentNodeData -- 当前选中的树节点的数据信息
   */
  renderTitle = (key, title, currentNodeData) => {
    const { searchValue } = this.state;
    let index;
    if (searchValue) {
      index = title.indexOf(searchValue);
    }
    return (
      <div>
        {
          typeof index !== 'undefined' && index >= 0 ? (
            <>
              {title.substr(0, index)}
              <span style={{ color: 'red' }}>{searchValue}</span>
              {title.substr(index + searchValue.length)}
            </>
          ) : <span>{title}</span>
        }
      </div>
    );
  }


  /**
   * 逐级渲染树节点函数
   * @param data -- 树节点要展示的数据
   * @description -- 当前树节点中如果有“children”字段,会调用自身函数,直到仅有叶子结束
   */
  renderTreeNodes = (data: any[]) => {
    const {
      idKey,
      nameKey,
      childListKey,
    } = this.props;

    return data.map((item: any) => {
      if (item[childListKey]) {
        return (
          <TreeNode title={this.renderTitle(item[idKey], item[nameKey], item)} key={item[idKey]} data={item} selectable={item.selectable}>
            {this.renderTreeNodes(item[childListKey])}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          title={this.renderTitle(item[idKey], item[nameKey], item)}
          key={item[idKey]}
          data={item}
        />
      );
    });
  }

  render() {
    const { dataList, searchPlaceholder, ...restProps } = this.props;
    const { searchLoading } = this.state;
    return (
        <Spin spinning={searchLoading}>
          <Search style={{ marginBottom: 8 }} placeholder={searchPlaceholder}  />
          {/* <Search placeholder={searchPlaceholder} onChange={e => this.onChange(e.target.value)} allowClear /> */}
          <Tree
            // loadData={this.loadData}
            onLoad={this.onLoad}
            onSelect={this.onSelect}
            {...restProps}
          >
            {!dataList ? '' : this.renderTreeNodes(dataList)}
          </Tree>
        </Spin>
    );
  }
}

export default SearchTree;