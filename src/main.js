import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueRouter from 'vue-router'
import router from "./router";
import SuiVue from 'semantic-ui-vue';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(SuiVue);

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app');
