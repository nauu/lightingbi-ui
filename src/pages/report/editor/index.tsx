import { Component } from 'react';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import { ReportEditorData } from './data.d';
import EditorJS from "@editorjs/editorjs";
import Header from '@editorjs/header';
import List from '@editorjs/list';

interface ReportEditorProps {
  reportEditor: ReportEditorData;
  dispatch: Dispatch;
  loading: boolean;
}

interface ReportEditorState {

}

class ReportEditor extends Component<ReportEditorProps, ReportEditorState> {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'reportEditor/fetchReportInfo'
    })

    const editor = new EditorJS({
      /**
       * Id of Element that should contain the Editor
       */
      holder: 'editorjs',
      tools: {
        header: {
          class: Header,
          inlineToolbar: ['link']
        },
        list: {
          class: List,
          inlineToolbar: true
        }
      }
    })
  }

  render() {
    const { reportEditor } = this.props;
    const { report } = reportEditor;
    return (
      <div id={'editorjs'}></div>
    )
  }
}

export default connect(
  ({
     reportEditor,
    loading
  }: {
    reportEditor: ReportEditorData,
    loading: {
      effects: Record<string, boolean>;
    }
  }) => ({
    reportEditor,
    loading: loading.effects['reportEditor/fetchReportInfo'],
  })
)(ReportEditor)
