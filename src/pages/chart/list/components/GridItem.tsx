import React, { Component } from 'react';
import {Button, Card} from "antd";
import {EditOutlined} from "@ant-design/icons/lib";
import Chart from "@/components/Charts/Chart";
import {ChartDataType} from "@/pages/chart/list/data";
import {RouteComponentProps, withRouter} from "react-router";

interface GridItemProps extends RouteComponentProps{
  item: ChartDataType;
}

class GridItem extends Component<GridItemProps> {

  handleEdit = () => {
    this.props.history.push(`/chart/editor/${this.props.item.id}`)
  }

  render() {
    const {item} = this.props;

    return (
      <>
        <Card
          title={item.name}
          bordered={false}
          extra={<Button type="text" size='small' icon={<EditOutlined />} onClick={this.handleEdit}/>}
          style={{height:'100%'}}
          bodyStyle={{height:`calc(100% - 58px)`}}
        >
          <Chart
            type={item.type}
            option={item}
          />
        </Card>
      </>
    )
  }
}

export default withRouter(GridItem);
