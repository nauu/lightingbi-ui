import { Component } from 'react';

interface DimensionProps {
  source: string
  onDrop?: any
}

class Dimension extends Component<DimensionProps> {

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

export default Dimension;
