<template>
  <GridLayout columns="3*, 2*, 3*" rows="40px, 40px"> 
      <Label class="status-title" text="Bluetooth:" row="0" col="0"/>
      <Label class="status-title" :text=" (BLUETOOTH_POWER ? 'включен' : 'выключен') " row="0" col="1" />
      <Button @tap="turnOnBluetooth" class="status-button" text="включить" row="0" col="2" color="white"   backgroundColor="#4CAF50" />
      <Label class="status-title" text="Отслеживаниє:"  row="1" col="0" />
      <Label class="status-title" :text="(IBECON_IN_REGION ? 'включено' : 'выключено')" row="1" col="1" />
      <Button @tap="connectToIbecon" class="status-button" text="подключится" row="1" col="2" color="white" backgroundColor="#4CAF50" />
  </GridLayout>
</template>
<script>
    import { mapState  } from 'vuex';

  export default {
    methods: {
      turnOnBluetooth() {
        this.$emit('try-on-bluetooth');
      },
      connectToIbecon() {
        this.$emit('try-connect-ibeacon');
      }
    },
      computed: {
      ...mapState({
         BLUETOOTH_POWER: state => state.status["BLUETOOTH_POWER"]
      })
    },
  };
</script>
<style scoped>
  .wrap {
    border: 1px solid grey;
  }
  .status-title {
    margin-top: 40px;
    padding-left: 15px;
  }
  .status-button {
    padding: 5xp 10px;
    margin: 15px;
    border-radius: 45%;
  }
</style>
