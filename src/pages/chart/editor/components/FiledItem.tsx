import { Component } from "react";
import { DatasetFieldType } from '../data.d';

interface FiledItemProps {
  source: string
  field: DatasetFieldType
  onDragStart?: any | null
  onDrag?: any | null
  onDragEnd?: any | null
}

class filedItem extends Component<FiledItemProps>{

  handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = 'move';
    this.props.onDragStart && this.props.onDragStart(e, this.props.field, this.props.source);
  }

  handleDrag = (e) => {
    this.props.onDrag && this.props.onDrag(e, this.props.field);
  }

  handleDragEnd = (e) => {
    this.props.onDragEnd && this.props.onDragEnd(e, this.props.field);
  }


  render() {
    const { field } = this.props;
    const { id, name } = field;
    return (
      <li
        key={id}
        draggable="true"
        onDragStart={this.handleDragStart}
        onDrag={this.handleDrag}
        onDragEnd={this.handleDragEnd}
      >
        { name }
      </li>
    );
  }
}

export default filedItem;
