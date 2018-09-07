module.exports = {
  proxyList: {
    '/HX_WEB/': {
      target: 'http://192.168.100.106:8082/HX_WEB/', //（这里是代理接口的位置）
      changeOrigin: true,//（允许跨域，如果这不写，调用接口接口时会有跨域错误说缺少请求头）
      pathRewrite: {'^/HX_WEB': '' }//（路由规则下面详细介绍）
    }
  }
}