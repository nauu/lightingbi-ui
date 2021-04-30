import {GridContent, PageContainer} from '@ant-design/pro-layout';
import type { Dispatch } from 'umi';
import { FormattedMessage, connect } from 'umi';
import React, { Component } from "react";
import { findDOMNode } from 'react-dom';
import { ChartEditorData, DatasetFieldType, ChartFieldType } from './data.d';
import FiledList from './components/FiledList';
import FieldItem from "./components/FiledItem";
import Dimension from './components/Dimension';
import Measure from './components/Measure';
import ChartFieldItem from './components/ChartFieldItem';
import Performance from "./components/Performance";
import PerformanceConfig from "./components/PerformanceConfig";
import './style.less';

// export default () => {
//   return <PageContainer content={<FormattedMessage id="chart.list.describe" />}>图库</PageContainer>
// }
interface ChartEditorProps {
  chartEditor: ChartEditorData
  dispatch: Dispatch
  loading: boolean
}
interface ChartEditorState {
  source: string
  isDrop: boolean
  activeField: DatasetFieldType | null
  chartType: string
}
interface Offset {
  top: number;
  left: number;
  height: number;
  width: number;
}
class ChartEditor extends Component<ChartEditorProps, ChartEditorState> {

  state: ChartEditorState = {
    source: '',
    isDrop: false,
    activeField: null,
    chartType: 'Bar',
  }

  dimension: ChartFieldType[] = []

  measure: ChartFieldType[] = []

  dimensionWrapDom: Element|Text|null = null

  dimensionWrapOffset: Offset = { top: 0, left: 0, height: 0, width: 0 };

  measureWrapDom: Element|Text|null = null

  measureWrapOffset: Offset = { top: 0, left: 0, height: 0, width: 0 };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chartEditor/fetchChartInfo'
    });

    dispatch({
      type: 'chartEditor/fetchDatasetFileds'
    });
    this.dimensionWrapDom = findDOMNode(this.refs.dimensionList);
    this.dimensionWrapOffset = this.getOffset(this.dimensionWrapDom);

    this.measureWrapDom = findDOMNode(this.refs.measureList);
    this.measureWrapOffset = this.getOffset(this.measureWrapDom);
  };

  handleDragStart = (event, field: DatasetFieldType, source: string) => {
    console.log(field, source)
    this.setState({activeField: field, source});

  }

  handleDragEnd = (event, field: DatasetFieldType, source: string) => {
    console.log('dragEnd')
    const { dispatch } = this.props;
    if (!this.state.isDrop) {
      let flag: boolean;
      if(source == 'dimension') {
        flag = this.doDropAndSort(event, this.dimensionWrapOffset, this.dimensionWrapDom, this.dimension);
      } else if(source == 'measure') {
        flag = this.doDropAndSort(event, this.measureWrapOffset, this.measureWrapDom, this.measure);
      }
      console.log(this.dimension, this.measure)
      if (flag) {
        dispatch({
          type: 'chartEditor/saveChartFields',
          payload: {
            dimension: this.dimension,
            measure: this.measure
          }
        });
      }
    }
    // if(this.doDropAndSort(event, this.dimensionWrapOffset, this.dimensionWrapDom, this.dimension)){
    //   console.log('this.dimension:',this.dimension)
    //   dispatch({
    //     type: 'chartEditor/saveDimension',
    //     payload: this.dimension
    //   });
    // }
  }

  handleDrop = (event, target) => {
    const { dispatch } = this.props;
    let flag: boolean;
    console.log(this.state.source, target);
    if ((this.state.source == 'dimension' || this.state.source == 'measure') && target != this.state.source) {
      if(target == 'dimension') {
        this.doRemove(event, this.dimension);
      } else if(target == 'measure') {
        this.doRemove(event, this.measure);
      }
    }
    if(target == 'dimension') {
      flag = this.doDropAndSort(event, this.dimensionWrapOffset, this.dimensionWrapDom, this.dimension);
    } else if(target == 'measure') {
      flag = this.doDropAndSort(event, this.measureWrapOffset, this.measureWrapDom, this.measure);
    }
    console.log(this.dimension, this.measure)
    if (flag) {
      dispatch({
        type: 'chartEditor/saveChartFields',
        payload: {
          dimension: this.dimension,
          measure: this.measure
        }
      });
    }
  }

  getOffset = function(targetDom) {
    let left = 0,
      top = 0,
      width = targetDom.offsetWidth,
      height = targetDom.offsetHeight;
    function getOs(dom) {
      left += dom.offsetLeft;
      top += dom.offsetTop;
      if (dom.offsetParent) {
        getOs(dom.offsetParent);
      }
    }
    getOs(targetDom);
    return {
      left,
      top,
      width,
      height,
    };
  }

  doRemove = function(event, list) {
    let index = list.findIndex((item) => {
      return item.id == this.state.activeField.id;
    });
    if (index != -1) {
      list.splice(index, 1);
    }
  }

  doDropAndSort = function(event, warpOffset, wrapDom, list) {
    if (!event.clientX && !event.clientY) {
      return;
    }
    if (
      event.clientY < warpOffset.top ||
      event.clientY > warpOffset.top + warpOffset.height ||
      event.clientX < warpOffset.left ||
      event.clientX > warpOffset.left + warpOffset.width
    ) {
      let index = list.findIndex((item) => {
        return item.id == this.state.activeField.id;
      });
      if (index != -1) {
        list.splice(index, 1);
        return true;
      }
    } else {
      const doms: HTMLCollection = wrapDom.children;
      let nowIndex = list.findIndex((item) => {
        return item.id == this.state.activeField.id;
      });
      let tarIndex = nowIndex == -1 ? list.length : nowIndex;
      console.log('nowIndex', nowIndex, 'tarIndex', tarIndex)
      for (let i = 0; i < doms.length; i++) {
        if (i != nowIndex) {
          let item = doms[i];
          let iw = item.offsetWidth;
          let il = item.offsetLeft;
          console.log(i, warpOffset, event.clientX, event.clientY, il, iw)
          if (
            event.clientX > warpOffset.left + il &&
            event.clientX < warpOffset.left + il + iw / 2
          ) {
            tarIndex = i;
          } else if (
            event.clientX > warpOffset.left + il + iw / 2 &&
            event.clientX < warpOffset.left + il + iw
          ) {
            tarIndex = i + 1;
          } else {
            if (i == doms.length-1){
              tarIndex = i + 1;
            } else {
              continue;
            }
          }
          console.log('tarIndex', tarIndex)
          if (tarIndex < list.length) {
            break;
          }
        }
      }
      console.log('nowIndex:',nowIndex,'tarIndex', tarIndex)
      if (nowIndex != tarIndex) {
        if (nowIndex == -1) {
          list.splice(tarIndex, 0, this.state.activeField);
        } else {
          list.splice(nowIndex, 1);
          console.log(JSON.stringify(list))
          if (tarIndex < nowIndex) {
            list.splice(tarIndex, 0, this.state.activeField);
          } else {
            list.splice(tarIndex - 1, 0, this.state.activeField);
          }
          console.log(JSON.stringify(list))
        }
        return true;
      }
    }
    return false;
  }

  handleTypeChange = (type: string) => {
    this.setState({'chartType': type});
  }

  render() {
    const { chartEditor, loading } = this.props;
    const { fields, dimension, measure } = chartEditor;
    this.dimension = [...dimension];
    const chartOption = {
      dimension,
      measure
    };
    return (
      <React.Fragment>
        <div className="editor_left">
          <FiledList
            fields={fields}
          >
            {
              fields.map((field, index) =>{
                return (
                  <FieldItem
                    key={field.id}
                    field={field}
                    source='dataset'
                    onDragStart={this.handleDragStart}
                  >
                  </FieldItem>
                )
              })
            }
          </FiledList>
        </div>
        <div className="editor_middle">
          <div className="editor_middle_dimension">
            <div className="dimension">
              <div className="dimension_title">Dimension</div>
              <div className="dimension_wrap">
                <Dimension
                  ref="dimensionList"
                  source='dimension'
                  onDrop={this.handleDrop}
                >
                  {
                    dimension.map((item, index) => {
                      return (
                        <ChartFieldItem
                          key={item.id}
                          dragEnable={true}
                          field={item}
                          source='dimension'
                          onDragStart={this.handleDragStart}
                          onDragEnd={this.handleDragEnd}
                        ></ChartFieldItem>
                      )
                    })
                  }
                </Dimension>
              </div>
            </div>
          </div>
          <div className="editor_middle_measure">
            <div className="measure">
              <div className="measure_title">Measure</div>
              <div className="measure_wrap">
                <Measure
                  ref="measureList"
                  source='measure'
                  onDrop={this.handleDrop}
                >
                  {
                    measure.map((item, index) => {
                      return (
                        <ChartFieldItem
                          key={item.id}
                          dragEnable={true}
                          field={item}
                          source='measure'
                          onDragStart={this.handleDragStart}
                          onDragEnd={this.handleDragEnd}
                        ></ChartFieldItem>
                      )
                    })
                  }
                </Measure>
              </div>
            </div>
          </div>
          <div className="editor_middle_performance">
            <Performance chartType={this.state.chartType} option={chartOption}></Performance>
          </div>
        </div>
        <div className="editor_right">
          <PerformanceConfig
            chartType={this.state.chartType}
            onChange={this.handleTypeChange}
          >
          </PerformanceConfig>
        </div>
      </React.Fragment>
    );
  };
}

export default connect(
  ({
     chartEditor,
     loading
   }: {
    chartEditor: any;
    loading: {
      effects: Record<string, boolean>;
    };
  }) => ({
    chartEditor,
    loading: loading.effects['chartEditor/fetchChartInfo'],
  })
)(ChartEditor);
