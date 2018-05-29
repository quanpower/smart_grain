const path = require('path');

export default {
  entry: 'src/index.js',
  extraBabelPlugins: [
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
  ],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
  },
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
    themes: path.resolve(__dirname, 'src/themes/'),
    utils: path.resolve(__dirname, 'src/utils/'),
  },
  ignoreMomentLocale: true,
  theme: './src/theme.js',
  html: {
    template: './src/index.ejs',
  },
  disableDynamicImport: true,
  publicPath: '/',
  hash: true,
  // proxy:{      
  //   "/api": {
  //     "target": "http://127.0.0.1:5000",
  //     "secure": false,
  //     "changeOrigin": true,
  //     "pathRewrite": { "^/api" : "/api" }
  //   },},
};
