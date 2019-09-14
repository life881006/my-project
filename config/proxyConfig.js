module.exports = {
  proxyList: {
    '/': {
      target: 'http://www.jshuixue.com:8081/', //（这里是代理接口的位置）
      changeOrigin: true,//（允许跨域，如果这不写，调用接口时会有跨域错误说缺少请求头）
      pathRewrite: {'^': '' }//（路由规则介绍）
    }
  }
}