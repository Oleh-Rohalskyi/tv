<template>
        <StackLayout class="ibeacon" v-if="BLUETOOTH_POWER && ACCESS_COARSE_LOCATION && GEOLOCATION_ANABLED">
            <FlexboxLayout flexDirection="row" alignItems="baseline" class="status-title status-title_with-button"> 
                <Label  text="Бекон менеджер: "/>
                <Label  :text="IBEACON_AUTHORIZATION ? 'зарегестрирован' : 'не авторезирован'"/>
                <Button v-if="!!uuid && !IBEACON_AUTHORIZATION"  @tap="authorizeRegion" class="button-default" text="авторизироватся"/>
            </FlexboxLayout>
            <FlexboxLayout class="status-title status-title_with-button" flexDirection="row" alignItems="baseline"> 
                <Label  text="Подключения рeгиона:" />
                <Label  :text="manegerStatus" />
                <Button v-if="IBEACON_AUTHORIZATION && !!uuid && !IBEACON_IN_REGION"  @tap="connectToRegion" class="button-default" text="подключить"/>
            </FlexboxLayout>
            <FlexboxLayout flexDirection="row" alignItems="baseline" class="status-title status-title_with-button"> 
                <Label  text="Регион: "/>
                <Label  :text="(IBEACON_IN_REGION ? 'в регионе' : 'регион пуст')"/>
            </FlexboxLayout>
            <FlexboxLayout flexDirection="row" alignItems="baseline" class="status-title status-title_with-button"> 
                <Label  text="Бекон Статус: "/>
                <Label  :text="beaconStatus"/>
            </FlexboxLayout>
            <FlexboxLayout class="status-title" flexDirection="row"> 
                <Label  text="Выбранный регион: " />
                <Label  :text="(!!uuid ? uuid : 'Не выбран')"   />
            </FlexboxLayout>
            <Label  class="device-title" width="100%" text="Список регионов для теста: "  />
            <ListView  height="100" for="item in uuids" @itemTap="selectRegion">
                <v-template >
                    <Label class="list" height="50" :text="($index+1)+'. '+ item.name + ' ' + item.uuid" />
                </v-template>
            </ListView>
            <Label class="device-title" width="100%" text="Список беконов в регионе: "  />
            <ListView  for="item in distances" @itemTap="selectRegion">
                <v-template >
                    <Label :text="'дицтанция ~'+item.distance.toString().substring(0,4)" />
                </v-template>
            </ListView>
             <TextField class="device-title" v-if="!IBEACON_IN_REGION"  width="100%" v-model="custom_uuid" hint="Введите свой uuid..."  />
             <FlexboxLayout justifyContent="space-around" flexDirection="row"> 
                <Button v-if="!IBEACON_IN_REGION && custom_uuid" @tap="selectRegion({ item: {uuid: custom_uuid,name:'custom'} })" text="Использовать свой uuid" class="button-default" />
                <Button v-if="uuid != ''" @tap=" uuid = '' " text="Очистить регион" class="button-default" />
            </FlexboxLayout>
             <FlexboxLayout  justifyContent="space-around" flexDirection="row"> 
                <Button v-if="IBEACON_IN_REGION" @tap="deselectRegion" text="отключится" class="button-default" />
            </FlexboxLayout>
        </StackLayout>
</template>

<script >
import { mapState, mapMutations } from "vuex";

import { NativescriptIbeacon } from "nativescript-ibeacon";
var BeaconRegion = (function() {
  function BeaconRegion(identifier, proximityUUID, major, minor) {
    this.identifier = identifier;
    this.proximityUUID = proximityUUID;
    if (major) this.major = major;
    if (minor) this.minor = minor;
  }
  return BeaconRegion;
})();
export default {
  data() {
    return {
      log: [],
      region: {},
      uuid: "",
      distances: [],
      custom_uuid: "",
      beaconStatus: "тихо",
      uuids: [
        { name: "Default", uuid: "00000000-0000-0000-C000-000000000028", major: 1, minor: 1},
        { name: "Tablet",  uuid: "00001803-494C-4F47-4943-544543480000", major: 1, minor: 1}
      ],
      manegerStatus: "not ready",
      nativescriptIbeacon: {},
      BeaconLocationOptions: {
        iOSAuthorisationType: "Always",
        androidAuthorisationType: "Coarse",
        androidAuthorisationDescription: "Location permission needed"
      }
    };
  },
  methods: {
    selectRegion(e) {
        this.uuid = e.item.uuid;        
        this.region = new BeaconRegion(
            e.item.name,
            this.uuid,
            e.item.major,
            e.item.minor
        );
    },
    connectToRegion() {
        if (this.IBEACON_AUTHORIZATION) {
            this.nativescriptIbeacon.startRanging(this.region);
            this.nativescriptIbeacon.startMonitoring(this.region);
        } else { this.beaconStatus = "ошибка"; }
    },
    deselectRegion() {
        this.nativescriptIbeacon.stopRanging(this.region);
        this.nativescriptIbeacon.stopMonitoring(this.region);
        this.IBEACON_IN_REGION_mutate(false);
    },
    authorizeRegion() {
      if (!this.nativescriptIbeacon.isAuthorised()) {
        this.manegerStatus = "NOT Authorised";
        this.IBEACON_AUTHORIZATION_mutate(false);
        this.nativescriptIbeacon.requestAuthorization().then(
          () => {
            this.IBEACON_AUTHORIZATION_mutate(true);
            this.manegerStatus = "Authorised by the user";
          },
          e => {
            this.manegerStatus = "Authorisation denied by the user";
            this.IBEACON_AUTHORIZATION_mutate(false);
          }
        );
      } else {
        this.manegerStatus = "Already authorised";
        this.IBEACON_AUTHORIZATION_mutate(true);
      }
    },
    connectToIbecon() {
        console.log("my","connectToIbecon")
    },
    onBeaconManagerReady() {

    },
    didRangeBeaconsInRegion: function(BeaconRegion, Beacon) {
      if (Beacon.length) {

          this.IBEACON_IN_REGION_mutate(true);
          this.beaconStatus = "ослеживание";
          console.log(Beacon);
          this.distances = Beacon.map(i=>({
              distance: i.distance_proximity
          }));

      }  else {
          console.log(12);
          this.IBEACON_IN_REGION_mutate(false);
          this.distances = [];
          this.beaconStatus = "потеря";
      } 
    },
    didFailRangingBeaconsInRegion: function(
      BeaconRegion,
      errorCode,
      errorDescription
    ) {
        console.log("my","didFailRangingBeaconsInRegion")
    },
    ...mapMutations({
      IBEACON_AUTHORIZATION_mutate: "status/IBEACON_AUTHORIZATION",
      IBEACON_IN_REGION_mutate: "status/IBEACON_IN_REGION",
    })
  },
  created() {

    this.nativescriptIbeacon = new NativescriptIbeacon(
      {
        connectToIbecon: this.connectToIbecon,
        onBeaconManagerReady: this.onBeaconManagerReady,
        didRangeBeaconsInRegion: this.didRangeBeaconsInRegion,
        didFailRangingBeaconsInRegion: this.didFailRangingBeaconsInRegion
      },
      this.BeaconLocationOptions
    );
    this.authorizeRegion();
  },
  computed: {
    ...mapState({
      IBEACON_AUTHORIZATION: state => state.status["IBEACON_AUTHORIZATION"],
      BLUETOOTH_POWER: state => state.status["BLUETOOTH_POWER"],
      ACCESS_COARSE_LOCATION: state => state.status["ACCESS_COARSE_LOCATION"],
      GEOLOCATION_ANABLED: state => state.status["GEOLOCATION_ANABLED"],
      IBEACON_IN_REGION: state => state.status["IBEACON_IN_REGION"],
    })
  }
};
</script>

<style scoped>
.device-title {
    font-size: 15;
    padding-left: 25px;
    padding-right: 25px;
    text-align: center;
    /* margin-left: 25px; */
}
.list {
    font-size: 12;
    text-align: center;
    margin: 10px;
    border-bottom-width: 1px;
    border-color: #e65100;
    background-color: #ffb74d;
}
.ibeacon {
    background-color: #ffe0b2;
    border-radius: 5px;
    border-width: 1px;
    border-color: #e65100;
    /* margin-left: 25px; */
}

</style>
