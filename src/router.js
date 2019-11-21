import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const Landing = () => import('./views/Landing.vue');
const Dashboard = () => import('./views/Dashboard.vue');

export default new Router({
  mode: 'history',
  routes: [
    { path: '/dashboard', component: Dashboard },
    { path: '*', component: Landing }
  ]
});