const state = {
  BLUETOOTH_POWER: false,
  ACCESS_COARSE_LOCATION: false,
  ACCESS_FINE_LOCATION: false,
  BLUETOOTH: false,
  BLUETOOTH_ADMIN: false,
  IBEACON_AUTHORIZATION: false,
  GEOLOCATION_ANABLED: false,
  IBEACON_IN_REGION: false,
};

const mutations = {
  BLUETOOTH_POWER(state, status) {
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
  IBEACON_AUTHORIZATION (state,status) {
    state.IBEACON_AUTHORIZATION = status;
  },
  GEOLOCATION_ANABLED (state,status) {
    state.GEOLOCATION_ANABLED = status;
  },
  IBEACON_IN_REGION (state,status) {
    state.IBEACON_IN_REGION = status;
  },
};

export default {
  namespaced: true,
  state,
  mutations
};
