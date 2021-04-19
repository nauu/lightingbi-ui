import { Component } from 'react';

interface MeasureProps {
  source: string
  onDrop?: any
}

class Measure extends Component<MeasureProps> {

  handleDrop = (e) => {
    e.preventDefault();
    this.props.onDrop && this.props.onDrop(e, this.props.source);
  }

  handleDragOver = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <div
        className="wrap_list"
        onDrop={this.handleDrop}
        onDragOver={this.handleDragOver}
      >
        {this.props.children}
      </div>
    )
  }
}

export default Measure;
