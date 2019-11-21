import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueRouter from 'vue-router'
import router from "./router";
import SuiVue from 'semantic-ui-vue';
import ChartJsPluginDataLabels from 'chartjs-plugin-datalabels';
import PortalVue from 'portal-vue';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(SuiVue);
Vue.use(PortalVue);

new Vue({
  render: h => h(App),
  store,
  router,
  components: {
    ChartJsPluginDataLabels
  }
}).$mount('#app');
