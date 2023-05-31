const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/api', createProxyMiddleware({
  target: 'https://newsapi.org/v2',
  changeOrigin: true,
  pathRewrite: {
    '^/api': ''
  }
}));

app.listen(3004);