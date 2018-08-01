<template>
  <StackLayout>
    <Label class="status-title" :text="'ACCESS_COARSE_LOCATION: '+ACCESS_COARSE_LOCATION" />
    <Label class="status-title" :text="'ACCESS_FINE_LOCATION: '+ACCESS_FINE_LOCATION" />
    <Label class="status-title" :text="'BLUETOOTH: '+BLUETOOTH" />
    <Label class="status-title" :text="'BLUETOOTH_ADMIN: '+BLUETOOTH_ADMIN" />
  </StackLayout>
</template>

<script>
  let permissions = require( "nativescript-permissions" );
  import { mapState , mapMutations } from 'vuex';

  console.log(mapState)
  export default {
    methods: {
      ...mapMutations({
        change_ACCESS_COARSE_LOCATION_status: 'status/ACCESS_COARSE_LOCATION',
        change_ACCESS_FINE_LOCATION_status: 'status/ACCESS_FINE_LOCATION',
        change_BLUETOOTH_LOCATION_status: 'status/BLUETOOTH_LOCATION',
        change_ACCESS_BLUETOOTH_ADMIN_status: 'status/ACCESS_COARSE_LOCATION',
      })
    },
    computed: {
      ...mapState({
         ACCESS_COARSE_LOCATION: state => state.status["ACCESS_COARSE_LOCATION"],
         ACCESS_FINE_LOCATION: state => state.status["ACCESS_FINE_LOCATION"],
         BLUETOOTH: state => state.status["BLUETOOTH"],
         BLUETOOTH_ADMIN: state => state.status["BLUETOOTH_ADMIN"]
      })
    },
    created() {
      permissions.requestPermission( 
        android.Manifest.permission.ACCESS_COARSE_LOCATION,
        "ACCESS_COARSE_LOCATION"
      ).then((res)=>{
        this.change_ACCESS_COARSE_LOCATION_status(true)
      }).catch(()=>{
        this.change_ACCESS_COARSE_LOCATION_status(false)
      })
    }
  };
</script>

<style scoped>

</style>
