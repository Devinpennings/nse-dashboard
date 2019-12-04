import Vue from 'vue';
import Router from 'vue-router';
import TopicDashboard from "./components/dashboard/general/TopicDashboard";

Vue.use(Router);

const Landing = () => import('./views/Landing.vue');
const Dashboard = () => import('./views/Dashboard.vue');

export default new Router({
  mode: 'history',
  routes: [
    { path: '/dashboard/home', alias: '/dashboard', component: Dashboard },
    { path: '/dashboard/topic/:topicId', component: TopicDashboard, props: true },
    { path: '*', component: Landing }
  ]
});