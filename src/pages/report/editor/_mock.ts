import { ReportType } from './data.d';

const report: ReportType = {
  id: '111',
  name: '报告',
  data: []
};

export default {
  'POST  /api/report/info': (req: any, res: any) => {
    res.send({data: report});
  }
}
