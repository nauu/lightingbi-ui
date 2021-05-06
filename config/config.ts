// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  history: {
    type: 'browser',
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user/login',
              name: 'login',
              component: './User/login',
            },
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              name: 'register-result',
              icon: 'smile',
              path: '/user/register-result',
              component: './user/register-result',
            },
            {
              name: 'register',
              icon: 'smile',
              path: '/user/register',
              component: './user/register',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/dashboard/analysis',
            },
            {
              path: '/dataset',
              name: 'dataset',
              component: './dataset/list',
              icon: 'database',
            },
            {
              path: '/connectors',
              name: 'connectors',
              component: './connectors/list',
              icon: 'deployment-unit',
            },
            {
              path: '/connectors/upload',
              component: './connectors/upload',
              hideInMenu: true,
            },
            {
              path: '/connectors/database',
              component: './connectors/database',
              hideInMenu: true,
            },
            {
              path: '/chart',
              name: 'chart',
              icon: 'area-chart',
              component: './chart/list'
            },
            {
              path: '/chart/editor/:id',
              hideInMenu: true,
              component: './chart/editor'
            },
            {
              path: '/calculate',
              name: 'calculate',
              icon: 'calculator',
              component: './calculate/editor'
            },
            {
              path: '/report',
              name: 'report',
              icon: 'file-text',
              component: './report/editor'
            },
          ],
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  esbuild: {},
});
