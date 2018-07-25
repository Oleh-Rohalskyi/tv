const state = {
  blueToothPower: false,
  locationCourserPermission: false,
};

const mutations = {
  blueToothPower (state) {
    state.blueToothPower;
  },
  locationCourserPermission (state) {
    state.locationCourserPermission;
  },
};

const actions = {
  increment: ({commit}) => commit('increment'),
  decrement: ({commit}) => commit('decrement'),
};

export default {
  state,
  mutations,
  actions,
};
