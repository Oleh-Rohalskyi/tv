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
            <StackLayout class="main-content">
                <Permissions></Permissions>
                <Status></Status>
                 <router-view />
            </StackLayout>
        </StackLayout>
    </RadSideDrawer>
  </Page>
</template>

<script>
import Status from "./Status";
import Permissions from "./Permissions";
let toIcon = (unicode) => {
  
}
export default {
  components: {
    Status,
    Permissions
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

<style scoped>

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
    padding-right: 20px;
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