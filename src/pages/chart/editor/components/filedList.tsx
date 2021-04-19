import { Component } from 'react';
import { DatasetFieldType } from '../data.d';

interface FiledListProp {
  fields: DatasetFieldType[]
}

class FiledList extends Component<FiledListProp> {

  render() {
    return (
      <div className="fieldList">
        <div className="fieldList_title">Fields</div>
        <div>
          <ul>
            {this.props.children}
          </ul>
        </div>
      </div>
    )
  }

}

export default FiledList;
