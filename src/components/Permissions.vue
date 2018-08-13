<template> 
  <StackLayout>
    <Label class="status-title" :text="'ACCESS_COARSE_LOCATION: ' + ACCESS_COARSE_LOCATION" />
    <Label class="status-title" :text="'ACCESS_FINE_LOCATION: '   + ACCESS_FINE_LOCATION" />
    <Label class="status-title" :text="'BLUETOOTH: '     + BLUETOOTH" />
    <Label class="status-title" :text="'BLUETOOTH_ADMIN: ' + BLUETOOTH_ADMIN" />
    <Button class="button-default" @tap="checkAll([
      'ACCESS_COARSE_LOCATION',
      'ACCESS_FINE_LOCATION',
      'BLUETOOTH',
      'BLUETOOTH_ADMIN'
    ])" text="Проверить доступы" />
  </StackLayout>
</template>

<script>
let permissions = require("nativescript-permissions");
import { mapState, mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations({
      ACCESS_COARSE_LOCATION_mutate: "status/ACCESS_COARSE_LOCATION",
      ACCESS_FINE_LOCATION_mutate:   "status/ACCESS_FINE_LOCATION",
      BLUETOOTH_mutate:              "status/BLUETOOTH",
      BLUETOOTH_ADMIN_mutate:        "status/BLUETOOTH_ADMIN"
    }),
    checkAll(perms) {
      perms.forEach(this.check)
    },
    check(perm) {
      let stateMutation = this[perm + "_mutate"];
      return new Promise((res,rej)=>{
        permissions.requestPermission(
          android.Manifest.permission[perm],
          perm
        ).then( (result) => {
          if (result['android.permission.'+perm]) {
            stateMutation(true);
            res();
          } else {
            stateMutation(false);
            rej();
          }
        })
      }) 
    }
  },
  computed: {
    ...mapState({
         ACCESS_COARSE_LOCATION: state => state.status["ACCESS_COARSE_LOCATION"],
         ACCESS_FINE_LOCATION:   state => state.status["ACCESS_FINE_LOCATION"],
         BLUETOOTH:              state => state.status["BLUETOOTH"],
         BLUETOOTH_ADMIN:        state => state.status["BLUETOOTH_ADMIN"]
      })
  },
  created() {
    this.checkAll([
      "ACCESS_COARSE_LOCATION",
      "ACCESS_FINE_LOCATION",
      "BLUETOOTH",
      "BLUETOOTH_ADMIN"
    ]);
  }
};
</script>

<style scoped>

</style>
