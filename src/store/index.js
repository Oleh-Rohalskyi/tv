import Vue from 'nativescript-vue';
import Vuex from 'vuex';

import status from './modules/status';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    status,
  },
  strict: debug,
});

Vue.prototype.$store = store;

module.exports = store;