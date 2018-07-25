import Vue from 'nativescript-vue';
import Vuex from 'vuex';

import statuses from './modules/statuses';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({

  modules: {
    statuses,
  },
  strict: debug,
});

Vue.prototype.$store = store;

module.exports = store;