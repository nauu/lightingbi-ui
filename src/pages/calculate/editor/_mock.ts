import {CalculateEditorData} from './data.d'

const executeCalculateData: CalculateEditorData = {
  code: '',
  result: ''
};

export default {
  'POST  /api/calculate/get': ( req, res ) => {
    res.send({data:executeCalculateData});
  },
  'POST  /api/calculate/exec': ( req, res ) => {
    res.send({data:executeCalculateData});
  },
}
