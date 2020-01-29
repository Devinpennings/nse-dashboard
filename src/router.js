import Vue from 'vue';
import Router from 'vue-router';
import TopicDashboard from "./components/dashboard/general/TopicDashboard";
import EntryDashboard from "./components/dashboard/general/charts/EntryDashboard";

Vue.use(Router);

const Landing = () => import('./views/Landing.vue');
const Dashboard = () => import('./views/Dashboard.vue');

export default new Router({
  mode: 'history',
  routes: [
    { path: '/dashboard/home', alias: '/dashboard', component: Dashboard },
    { path: '/dashboard/topic/:topicId', component: TopicDashboard, props: true },
    { path: '/dashboard/entries', component: EntryDashboard, props: (route) => (
      {
        query: route.query.query,
        years: route.query.years,
        disciplineIds: Array.isArray(route.query.disciplineIds) ? route.query.disciplineIds : [route.query.disciplineIds]
      })
    },
    { path: '*', component: Landing }
  ]
});