import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import axios from 'axios'  
import qs from 'qs';

import Config from './config'

Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;

Vue.prototype.config = Config;


// 路由配置
import routes from "./router"; 
// 实例路由配置
const router = new Router(routes);

import 'element-ui/lib/theme-chalk/index.css'


Vue.use(ElementUI);
Vue.use(Router);

Vue.config.productionTip = false

new Vue({ 
  router,
  render: h => h(App),
}).$mount('#app')