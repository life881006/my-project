// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import './util/config'
import getD from './util/methods'
import "./assets/iconfont/iconfont.css";  


Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(getD)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
