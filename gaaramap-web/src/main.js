import Vue from 'vue';
import App from './App.vue'
import MintUI from 'mint-ui'
import ElementUI from 'element-ui'
import 'mint-ui/lib/style.css';
import './index.css'
import 'element-ui/lib/theme-chalk/index.css';

import VueRouter from "vue-router";
import router from './router'
import store from './store'

Vue.config.productionTip = false;
Vue.use(MintUI);
Vue.use(ElementUI);
Vue.use(VueRouter);

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app');
