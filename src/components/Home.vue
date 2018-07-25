<template>
  <Page class="page">
    <ActionBar title="Главная">
      <!-- <ActionItem tap="onShare"
      ios.systemIcon="9" ios.position="left"
      android.systemIcon="ic_menu_share" android.position="actionBar"/> -->
      <NavigationButton android.position="left" android.systemIcon="ic_menu_view" @tap="openDrawer"></NavigationButton>
      <ActionItem android.systemIcon="editbox_dropdown_dark_frame" class="options-button"></ActionItem>

    </ActionBar>
    <RadSideDrawer ref="drawer" selectionBehavior="None">
        <StackLayout ~drawerContent class="sideStackLayout">
            <StackLayout class="sideTitleStackLayout"> 
                <Label text="Navigation Menu"></Label>
            </StackLayout>
            <StackLayout class="sideStackLayout">
                <Label text="Главная" class="sideLabel"></Label>
                <Label text="Инструкции" class="sideLabel"></Label>
                <Label text="Настройки" class="sideLabel"></Label>
            </StackLayout>
        </StackLayout>
        <StackLayout ~mainContent>
             <Permissions></Permissions>
             <Status></Status>
        </StackLayout>
    </RadSideDrawer>
  </Page>
</template>

<script>
  import Status from './Status';
  import Permissions from './Permissions';

  export default {
    components: {
      Status,
      Permissions
    },
    created() {
        this.mainContentText = "SideDrawer for NativeScript can be easily setup in the HTML definition of your page by defining tkDrawerContent and tkMainContent. The component has a default transition and position and also exposes notifications related to changes in its state. Swipe from left to open side drawer.";
    },
    methods: {
        openDrawer() {
            this.$refs.drawer.nativeView.showDrawer();
        },
        onCloseDrawerTap() {
            this.$refs.drawer.nativeView.closeDrawer();
        }
    },
    data() {
        return {
            mainContentText: ""
        };
    }
  };
</script>

<style scoped>
  .sideStackLayout {
    max-width: 200px;
    background-color: #fff;
  }
  .sideLabel {
    font-size: 14px;
    font-weight: 900;
    color: #444;
  }
</style>