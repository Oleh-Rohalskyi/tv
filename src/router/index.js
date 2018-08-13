import Vue from 'nativescript-vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import layout1 from '../components/Layout1';
import ibeacon from '../components/Ibeacon';

const router = new VueRouter({
  pageRouting: true,
  routes: [
    {
      path: '/',
      component: layout1,
      meta: {
        title: 'layout1',
      },
    },
    { path: '*', redirect: '/' },
  ],
});

router.replace('/home');

module.exports = router;
