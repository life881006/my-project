// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router/'
import store from './store/store'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import './util/config'
import getD from './util/methods'
import filter_inputs from './util/inputValidator'
import "./assets/iconfont/iconfont.css";

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(getD)
Vue.use(filter_inputs)
Vue.prototype.axios = axios
Vue.prototype.user = {}

let tableH = document.documentElement.clientHeight-250;
let everyPage = parseInt(tableH/53);
global.everyPage = everyPage;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
