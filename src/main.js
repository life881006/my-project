// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router/'
import store from './store/store'
import ElementUI from 'element-ui'
import axios from 'axios'
import App from './App'
import baseConfig from './util/config' /** 引入公共url参数 */
import publicMethods from './util/methods' /** 引入axios数据打包函数 */
import filter_inputs from './util/inputValidator' /** 引入表单输入信息校验模块 */

import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconfont/iconfont.css'

Vue.prototype.moment = require('moment')
// elementUi：size 组件尺寸，zIndex 弹框初始值
Vue.use(ElementUI,{size:"small", zIndex: 2000})
Vue.use(publicMethods)
Vue.use(filter_inputs)

/*
 * axios headers常见设置
 * application/x-www-form-urlencoded：数据格式为"key1=value1&key2=value2"
 * multipart/form-data：用于传输文件
 * application/json：数据格式为json格式，有的服务器语言不支持（比如PHP，需要从php://input里获得原始输入流，再json_decode成对象。）
 * text/plain：纯文本传输，用得少
 */
//axios.defaults.baseURL = 'https://www.jshuixue.com'


Vue.prototype.axios = axios
Vue.prototype.baseConfig = baseConfig


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created() {
    this.addAxoisInterceptor()
  },
  methods: {
    addAxoisInterceptor() {
      let _this = this;
      axios.interceptors.response.use(function (response) { // 拦截请求后的状态
        //通过！
        let data = {};
        if (response.status != undefined) {
          data= response.data;
          let s = _this.utf8to16(_this.base64decode(data.data));
          if (/(\{)|(\[)/.test(s)) {
            data.data = JSON.parse(s);
          } else {
            //console.log(s);
            data.data = s;
          }
        }
        return data;
      })
    }
  }
})
