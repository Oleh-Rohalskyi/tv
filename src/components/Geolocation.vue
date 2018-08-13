<template>
  <FlexboxLayout flexDirection="row" alignItems="baseline" class="status-title status-title_with-button"  > 
      <Label text="Геолокация: " />
      <Label :text=" (GEOLOCATION_ANABLED ? 'включенa' : 'выключенa') "  />
      <Button v-if="!GEOLOCATION_ANABLED && ACCESS_COARSE_LOCATION"  @tap="turnOnGeolocation" class="button-default" text="включить"/>
  </FlexboxLayout >
</template>
<script>
    import { mapState, mapMutations  } from 'vuex';
    var geolocation = require("nativescript-geolocation");

  export default {
    created() {
        this.id = setInterval(this.check,2000);
    },
    destroyed() {
        clearInterval(this.id);
    },
    methods: {
      check() {
        geolocation.isEnabled().then(this.GEOLOCATION_ANABLED_mutate);
      },
      turnOnGeolocation() {
        geolocation.enableLocationRequest();
      },
      ...mapMutations({
        GEOLOCATION_ANABLED_mutate: "status/GEOLOCATION_ANABLED",
      }),
    },
    computed: {
      ...mapState({
         GEOLOCATION_ANABLED: state => state.status["GEOLOCATION_ANABLED"],
         ACCESS_COARSE_LOCATION: state => state.status["ACCESS_COARSE_LOCATION"]
      })
    },
  };
</script>
<style scoped>

</style>
