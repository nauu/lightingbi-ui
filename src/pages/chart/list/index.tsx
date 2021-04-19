import {GridContent, PageContainer} from '@ant-design/pro-layout';
import type { Dispatch } from 'umi';
import { FormattedMessage, connect } from 'umi';
import React, { Component } from "react";
import { ChartListData } from './data.d';
import {Button, Card, Col, Row} from "antd";
import {formatMessage} from "@@/plugin-locale/localeExports";
import {Gauge} from "@/pages/dashboard/monitor/components/Charts";
import {EditOutlined} from "@ant-design/icons/lib";

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

  handleEdit = (e) => {
    this.props.history.push(`/chart/editor/111`)
  }

  render() {
    const { chartList, loading } = this.props;
    const { list } = chartList;
    console.log('list',list)
    return (
      <GridContent>
        <React.Fragment>
          <Row gutter={24}>
            {
              list.map((item, index) => {
                return (
                  <Col key={item.id} xl={6} lg={24} md={24} sm={24} xs={24}>
                    <Card
                      key={item.id}
                      title={item.name}
                      bordered={false}
                      extra={<Button type="primary" size='small' icon={<EditOutlined />} onClick={this.handleEdit}/>}
                    >
                      <Gauge
                        title={formatMessage({
                          id: 'dashboardandmonitor.monitor.ratio',
                          defaultMessage: 'Ratio',
                        })}
                        height={180}
                        percent={87}
                      />
                    </Card>
                  </Col>
                )
              })
            }
          </Row>
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
