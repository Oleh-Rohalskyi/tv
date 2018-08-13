<template>
  <Page class="page">
    <ActionBar title="Главная" padding="0">
        <StackLayout orientation="horizontal">
            <Label :text="icons.menu" @tap="toggleDrawerState" class="icon icon_big menu-button align-left" fontSize="24" verticalAlignment="center" />
            <Label text="Главная" fontSize="24" verticalAlignment="center" class="menu-title" /> 
            <Label :text="icons.settings" class="icon icon_big menu-button align-right"  fontSize="24" verticalAlignment="center" />
        </StackLayout>   
    </ActionBar>
    <RadSideDrawer ref="drawer" selectionBehavior="None">
        <StackLayout ~drawerContent class="sideStackLayout">
            <StackLayout class="sideStackLayout">
                <Label text="Главная" class="sideLabel sideLabel_first"></Label>
                <Label text="Инструкции" class="sideLabel"></Label>
                <Label text="Настройки" class="sideLabel"></Label> 
            </StackLayout>
        </StackLayout>
        <StackLayout ~mainContent >
          <ScrollView orientation="vertical" scrollBarIndicatorVisible="true">
            <StackLayout class="main-content">
                <Permissions></Permissions>
                <Geolocation></Geolocation>
                <Bluetooth></Bluetooth>
                <Ibeacon></Ibeacon>
            </StackLayout>
          </ScrollView>
        </StackLayout>
    </RadSideDrawer>
  </Page>
</template>

<script>
import Bluetooth from "./Bluetooth";
import Permissions from "./Permissions";
import Ibeacon from "./Ibeacon";
import Geolocation from "./Geolocation";
// import { mapState, mapMutations } from "vuex";

export default {
  components: {
    Bluetooth,
    Permissions,
    Ibeacon,
    Geolocation
  },
  computed: {
      
  },
  created() {

  },
  methods: {
    openDrawer() {
      this.$refs.drawer.nativeView.toogleDrawer();
    },
    toggleDrawerState() {
      this.$refs.drawer.nativeView.toggleDrawerState();
    }
  },
  data() {
    return {
      mainContentText: "",
      icons: {
          menu: String.fromCharCode(parseInt('f008', 16)),
          settings: String.fromCharCode(parseInt('9881', 16))
      }
    };
  }
};
</script>

<style lang="scss">
  .status-title {
    font-size: 12;
    width: 100%;
    justify-content: space-between;
    margin-top: 15px;
    margin-left: 25px;
    margin-right: 25px;
    border-bottom-width: 1px;
    border-bottom-color: #ccc;
    &_with-button {
      height: 110px;
    }
  }
  .button-default {
      font-size: 10;
  //     margin: 10px;
      border-color: #f57c00; 
      background-color: #ad1457; 
      color: #fff;
      &_info {
        background-color: #e65100; 
        color: #fff;
      }
  }

.sideStackLayout {
  background-color: #fff;
}

.sideLabel {
  font-size: 18px;
  font-weight: 400;
  color: rgb(46, 44, 43);
  padding-top: 20px;
  padding-left: 53px;
}

.sideLabel_first {
  margin-top: 40px;
}

.menu-title {
    font-weight: 700;
    font-size: 20px;
    width: 60%;
    text-align: left;
}

.menu-button {
    width: 20%;
    margin: 0;
}

.align-left {
    padding-left: 0;
    text-align: left;
}
.align-right {
    padding-right: 40px;
    text-align: right;
}
.main-content {
    margin: 20px;
    border-width: 5px ;
    border-color: #CCC ;
    border-radius: 20px;
    padding: 15px;
}
</style>