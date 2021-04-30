import { GridContent } from '@ant-design/pro-layout';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import React, { Component } from "react";
import { ChartListData } from './data.d';

import {Layout, Responsive, WidthProvider} from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import GridItem from './components/GridItem';

const ResponsiveGridLayout = WidthProvider(Responsive);
// export default () => {
//   return <PageContainer content={<FormattedMessage id="chart.list.describe" />}>图库</PageContainer>
// }
interface ChartListProps {
  chartList: ChartListData;
  dispatch: Dispatch;
  loading: boolean;
  history: any
}
interface ChartListState {
  list: []
}
class ChartList extends Component<ChartListProps, ChartListState> {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chartList/fetchChartList'
    });
  };

  handleLayoutChange = (layout: Layout[]) => {
    console.log(layout)
  }

  render() {
    const { chartList } = this.props;
    const { list } = chartList;
    console.log('list',list)
    return (
      <GridContent>
        <React.Fragment>
          <ResponsiveGridLayout className='layout' rowHeight={100} onLayoutChange={this.handleLayoutChange}>
            {
              list.map((item) => {
                return (
                  <div data-grid={{x:0,y:0,w:4,h:2}} key={item.id}>
                    <GridItem
                      item={item}
                    />
                  </div>
                )
              })
            }
          </ResponsiveGridLayout>
        </React.Fragment>
      </GridContent>
    );
  };
}

export default connect(
  ({
  chartList,
  loading
}: {
  chartList: any;
  loading: {
    effects: Record<string, boolean>;
  };
}) => ({
    chartList,
    loading: loading.effects['chartList/fetchChartList'],
  })
)(ChartList);
