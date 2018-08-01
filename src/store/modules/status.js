const state = {
  BLUETOOTH_POWER: false,
  ACCESS_COARSE_LOCATION: false,
  ACCESS_FINE_LOCATION: false,
  BLUETOOTH: false,
  BLUETOOTH_ADMIN: false,
  IBECON_IN_REGION: false,
};

const mutations = {
  BLUETOOTH_POWER (state, status) {
    state.BLUETOOTH_POWER = status;
  },
  ACCESS_COARSE_LOCATION (state,status) {
    state.ACCESS_COARSE_LOCATION = status;
  },
  ACCESS_FINE_LOCATION (state,status) {
    state.ACCESS_FINE_LOCATION = status;
  },
  BLUETOOTH (state,status) {
    state.BLUETOOTH = status;
  },
  BLUETOOTH_ADMIN (state,status) {
    state.BLUETOOTH_ADMIN = status;
  },
  IBECON_IN_REGION (state,status) {
    state.IBECON_IN_REGION = status;
  },
};

export default {
  namespaced: true,
  state,
  mutations
};
