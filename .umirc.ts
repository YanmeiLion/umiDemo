import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // 配置路由
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/home', component: '@/pages/home/index' },
    { path: '/login', component: '@/pages/login/index' },
  ],
  fastRefresh: {},

  // 更换当前主题色
  theme: {
    '@primary-color': '#ff4d4f',
  },
  // 自动对数据深克隆并返回
  dva: {
    immer: true,
  },
  mfsu: {},
  proxy: {
    '/api': {
      target: 'http://120.55.193.14:3030',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
