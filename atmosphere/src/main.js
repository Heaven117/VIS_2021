import Vue from 'vue'
import App from './App.vue'
import router from './router'
import dataV from '@jiaminghi/data-view'
Vue.use(dataV)

import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts;
// axios.defaults.baseURL="http://localhost:9000"
// Vue.prototype.$axios = axios;

// 引入vue-awesome
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons/index.js'
// 全局注册图标
Vue.component('v-icon', Icon)
import './assets/scss/style.scss'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


import store from './store/index';

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
