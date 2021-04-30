import { registerTheme } from 'echarts/lib/echarts';

import Bar from './Bar';
import Line from './Line';
import Pie from './Pie';

import lightingbiTheme from './theme/lightingbi';

function initTheme() {
  registerTheme('lightingbi', lightingbiTheme);
}

initTheme();

const Charts = {
  Bar,
  Line,
  Pie,
}

export {
  Charts as default,
  Bar,
  Line,
  Pie,
}
