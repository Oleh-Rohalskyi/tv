<template>
  <StackLayout>
  </StackLayout>
</template>

<script>
  let permissions = require( "nativescript-permissions" );

  export default {
    methods: {
      ACCESS_COARSE_LOCATION() {
        return permissions.requestPermission.bind(permissions,android.Manifest.permission.ACCESS_COARSE_LOCATION, "Надо доступ к геолокации")
      },
      ACCESS_FINE_LOCATION() {
        return permissions.requestPermission.bind(permissions,android.Manifest.permission.ACCESS_FINE_LOCATION, "Надо доступ к геолокации как админ")
      },
      BLUETOOTH() {
        return permissions.requestPermission.bind(permissions,android.Manifest.permission.BLUETOOTH, "Надо доступ к bluetooth")
      },
      BLUETOOTH_ADMIN() {
        return permissions.requestPermission.bind(permissions,android.Manifest.permission.BLUETOOTH_ADMIN, "Надо доступ к bluetooth как админ")
      }
    },
    created() {
      this.ACCESS_COARSE_LOCATION();
      тчис.ACCESS_FINE_LOCATION();
      this.BLUETOOTH();
      this.BLUETOOTH_ADMIN();
    }
  };
</script>

<style scoped>

</style>
