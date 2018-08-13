import Vue from 'nativescript-vue';

import router from './router';

import store from './store';

import './styles.scss';
import './font.css';

Vue.config.silent = false;
Vue.registerElement(
  'RadSideDrawer',
  () => require('nativescript-ui-sidedrawer').RadSideDrawer
)


new Vue({
  router,
  store,
}).$start();

