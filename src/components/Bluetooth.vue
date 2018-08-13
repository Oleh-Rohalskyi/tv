<template>
  <FlexboxLayout flexDirection="row" alignItems="baseline" class="status-title status-title_with-button"> 
      <Label  text="Bluetooth:"/>
      <Label  :text=" (BLUETOOTH_POWER ? 'включен' : 'выключен') "/>
      <Button v-if="!BLUETOOTH_POWER"  @tap="turnOnBluetooth" class="button-default" text="включить"/>
  </FlexboxLayout>
</template>
<script>
    import { mapState, mapMutations  } from 'vuex';
    import bluetooth from 'nativescript-bluetooth';
    
  export default {
    created() {
        this.id = setInterval(this.check,2000);
    },
    destroyed() {
        clearInterval(this.id);
    },
    methods: {
      check() {
        bluetooth.isBluetoothEnabled().then(this.BLUETOOTH_POWER_mutate);
      },
      turnOn() {
        bluetooth.enable().then(this.BLUETOOTH_POWER_mutate);
      },
      ...mapMutations({
        BLUETOOTH_POWER_mutate: "status/BLUETOOTH_POWER",
      }),
      turnOnBluetooth() {
        if (this.ACCESS_COARSE_LOCATION && !this.BLUETOOTH_POWER) {
          this.turnOn();
        }
      }
    },
    computed: {
      ...mapState({
         BLUETOOTH_POWER: state => state.status["BLUETOOTH_POWER"],
         ACCESS_COARSE_LOCATION: state => state.status["ACCESS_COARSE_LOCATION"]
      })
    },
  };
</script>
<style scoped>

</style>
