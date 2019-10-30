// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router/'
import store from './store/store'
import ElementUI from 'element-ui'
import App from './App'
import Config from './util/config' /** 引入公共url参数 */
import PublicMethods from './util/methods' /** 引入axios数据打包函数 */
import FilterInputs from './util/inputValidator' /** 引入表单输入信息校验模块 */
import { $axios, uploadAction } from './util/serverApi' /** axios封装 */

import './style/public.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/iconfont/iconfont.css'

// elementUi：size 组件尺寸，zIndex 弹框初始值
Vue.use(ElementUI, { size: 'small', zIndex: 2000 })
Vue.use(PublicMethods)
Vue.use(FilterInputs)

Vue.prototype.axios = $axios
Vue.prototype.axios.uploadAction = uploadAction
Vue.prototype.baseConfig = Config

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
