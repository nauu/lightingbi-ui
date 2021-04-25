import React, { Component } from 'react';
import { connect } from "umi";
import type { Dispatch } from 'umi';
import { CalculateEditorData } from "./data.d";
import { GridContent } from "@ant-design/pro-layout";
import {Button, Col, Row} from "antd";
import './style.less';

import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/javascript-hint.js';
import 'codemirror/theme/xq-light.css';
import 'codemirror/theme/mdn-like.css';
import { SettingOutlined, PlayCircleOutlined } from "@ant-design/icons/lib";

interface CalculateEditorProps {
  chartList: CalculateEditorData;
  dispatch: Dispatch;
  loading: boolean;
  history: any
}
interface CalculateEditorState {
  code: string
  result: string
}

class Calculate extends Component<CalculateEditorProps, CalculateEditorState> {

  changeCode = (code) => {
    console.log(code)
  };

  changeResult = () => {

  }

  handleEditorConfig = () => {

  };

  handleExec = () => {

  };

  formatResult = (data: object) => {
    const jsonData = JSON.stringify(data);
    const result = JSON.stringify(JSON.parse(jsonData),null,2);
    return result;
  }

  render() {

    const codeOptions = {
      lineNumbers: true,
      mode: {name: "text/javascript"},
      extraKeys: {"Ctrl": "autocomplete"},
      theme: "xq-light",
    };

    const resultOptions = {
      lineNumbers: true,
      mode: {name: "application/json"},
      extraKeys: {"Ctrl": "autocomplete"},
      theme: "mdn-like",
      readOnly: true,
      // 代码折叠
      lineWrapping:true,
      foldGutter: true,
      gutters:["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    };

    return (
      <GridContent className='calculate'>
        <React.Fragment>
          <Row className='calculate_toolbar' justify='end'>
            <Col flex='auto'>
            </Col>
            <Col flex='50px'>
              <Button
                type="text"
                size='large'
                icon={<SettingOutlined />}
                onClick={this.handleEditorConfig} />
            </Col>
          </Row>
          <Button
            className='calculate_exec'
            size='large'
            shape='circle'
            icon={<PlayCircleOutlined style={{fontSize: '50px'}} />}
            onClick={this.handleExec} />
          <Row className='calculate_content'>
            <Col span={12}>
              <CodeMirror
                className='calculate_content_code'
                style={{height: '100%'}}
                ref="editor-code"
                value='// Write your calculate'
                onChange={this.changeCode}
                options={codeOptions} />
            </Col>
            <Col span={12}>
              <CodeMirror
                className='calculate_content_result'
                ref="editor-result"
                value={this.formatResult({data:null})}
                onChange={this.changeResult}
                options={resultOptions} />
            </Col>
          </Row>
        </React.Fragment>
      </GridContent>
    )
  }

}

export default connect(
  ({
     calculateEditor,
     loading
   }: {
    calculateEditor: any;
    loading: {
      effects: Record<string, boolean>;
    };
  }) => ({
    calculateEditor,
    loading: loading.effects['calculateEditor/fetchCalc'],
  })
)(Calculate);;

