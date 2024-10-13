import Vue from 'vue';
import Router from 'vue-router';
import LandingPage from '@/pages/index.vue';
import Dashboard from '@/pages/dashboard/Dashboard.vue';
import Search from '@/pages/search/Search.vue';
import Sharing from '@/pages/sharing/Sharing.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
    },
    {
      path: '/sharing',
      name: 'Sharing',
      component: Sharing,
    },
  ],
});


