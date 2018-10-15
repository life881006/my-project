// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router/'
import store from './store/store'
import ElementUI from 'element-ui'
import axios from 'axios'
import App from './App'
import baseConfig from './util/config' //引入公共url参数
import publicMethods from './util/methods' //引入axios数据打包函数
import filter_inputs from './util/inputValidator' //引入表单输入信息校验模块


import 'element-ui/lib/theme-chalk/index.css'
import "./assets/iconfont/iconfont.css"


Vue.prototype.moment = require('moment');
Vue.use(ElementUI)
Vue.use(publicMethods)
Vue.use(filter_inputs)

/*
 * axios headers常见设置
 * application/x-www-form-urlencoded：数据格式为"key1=value1&key2=value2"
 * multipart/form-data：用于传输文件
 * application/json：数据格式为json格式，有的服务器语言不支持（比如PHP，需要从php://input里获得原始输入流，再json_decode成对象。）
 * text/plain：纯文本传输，用得少
 */

Vue.prototype.axios = axios
Vue.prototype.baseConfig = baseConfig


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
