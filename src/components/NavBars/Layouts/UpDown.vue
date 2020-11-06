<template>
 <div>
   <header>
     <div id="logo" v-if="false">
         <logo :collapse="logCollapse"></logo>
     </div>
     <div id="nav">
         <menu-bar :menu-arr="menus" :mode="'horizontal'"></menu-bar>      
     </div>
     <div id="right-nav">
        <user-center :menu-arr="userMenus"></user-center>
     </div>
   </header>
   <div id="content">     
      <app-main></app-main>   
   </div>  
 </div>  
</template>

<script>
import MenuBar from '../MenubarTwo'
import AppMain from './AppMain'
import Logo from '../Logo.vue'
import UserCenter from '../UserCenter'

export default {
  name: 'UpDownLayout',
  components: { MenuBar, Logo, UserCenter, AppMain },
  props: {
      menus: {
          required: true,
          type: Array,
          default () {
              return []
          }
      },
      userMenus: {
          required: true,
          type: Array,
          default () {
              return []
          }
      },
      logCollapse: {          
          type: Boolean,
          default: false
      }
 }  
}
</script>
<style scoped lang="scss">
@import "src/styles/variables.scss";

header { height: 63px; width:100%; background-color:$menuBg; 
         position: fixed; padding: 0 10px; z-index: 1999; }
#nav { float:left; width:550px; }
#logo { float:left; height:50px; }
#right-nav { float:right; width:124px; margin-right: 40px; }
#content { padding: 70px 45px; }
.el-menu.el-menu--horizontal {
    border-bottom: solid 1px;
    //border-bottom-color: $menuBottomBorder;
}
</style>