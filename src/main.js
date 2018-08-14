// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router/'
import store from './store/store'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import './util/config' //引入公共url参数
import getD from './util/methods' //引入axios数据打包函数
import filter_inputs from './util/inputValidator' //引入表单输入信息校验模块
import "./assets/iconfont/iconfont.css";
import moment from 'moment'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(getD)
Vue.use(filter_inputs)
Vue.prototype.axios = axios
Vue.prototype.user = {}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
