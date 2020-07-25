const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(proxy('/Golang', {
    target: 'http://localhost:8075/',
    changeOrigin: true,
  }));
};
