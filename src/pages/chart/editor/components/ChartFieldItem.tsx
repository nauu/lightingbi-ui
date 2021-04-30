import { Component } from "react";
import { DatasetFieldType } from '../data.d';

interface FiledItemProps {
  field: DatasetFieldType
  source: string
  dragEnable: boolean
  onDragStart?: any | null
  onDrag?: any | null
  onDragEnd?: any | null
}

class FiledItem extends Component<FiledItemProps>{

  handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = 'move';
    this.props.onDragStart && this.props.onDragStart(e, this.props.field, this.props.source);
  }

  handleDrag = (e) => {
    this.props.onDrag && this.props.onDrag(e, this.props.field, this.props.source);
  }

  handleDragEnd = (e) => {
    this.props.onDragEnd && this.props.onDragEnd(e, this.props.field, this.props.source);
  }


  render() {
    const { field, dragEnable } = this.props;
    const { id, name } = field;
    return (
      <div
        className='wrap_list_item'
        draggable={dragEnable}
        onDragStart={this.handleDragStart}
        onDrag={this.handleDrag}
        onDragEnd={this.handleDragEnd}
      >
        <span>{ name }</span>
      </div>
    );
  }
}

export default FiledItem;
