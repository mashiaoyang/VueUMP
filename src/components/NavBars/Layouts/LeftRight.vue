<template>
  <div>
    <div class="sidebar-container">
        <div id="logo" v-if="false">
            <logo :collapse="false"></logo>
        </div>
        <div id="user-nav">
          <user-center :menu-arr="uMenuArr"></user-center>
        </div>
        <el-scrollbar wrap-class="scrollbar-wrapper" style="height:100%">
            <menu-bar :menu-arr="menuArr" :mode="'vertical'"></menu-bar>      
        </el-scrollbar>        
    </div>
    <div id="main-container">          
        <div id="app-container">
            <app-main></app-main>     
        </div>   
    </div>
  </div>  
</template>

<script>
import MenuBar from '../MenubarTwo'
import AppMain from './AppMain'
import Logo from '../Logo'
import UserCenter from '../UserCenter'

export default {
  name: 'LeftRight',
  components: { MenuBar, AppMain, Logo, UserCenter },
  props: {
      menuArr: {
          type: Array, 
          default () {
              return []
          },
          required: true
      },
      uMenuArr: {
          type: Array,
          default () {
              return []
          },
          required: true
      }
  }
}
</script>
<style scoped lang="scss">
@import "src/styles/variables.scss";

#siderbar-container { 
  width:210px; height:100%; 
  position:fixed; 
  top:0; bottom:0; left:0;
  z-index:1001; 
  background-color:$blue; 
  overflow:hidden;
}
#main-container {
  margin-left: 210px;
}
#logo { 
   height:50px; 
   border-bottom: 1px solid rgba(255,255,255,0.1);
  }
#user-nav { 
  height: 71px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  padding-left: 40px;
  margin-top: -17px;
}
.el-menu {    
    border-right: solid 1px;
    //border-right-color: $menuBottomBorder;
}
.el-menu-item.is-active {
   background-color: rgb(231, 235, 240) !important;
}
.el-dropdown {
  margin-top: 24px !important;
}
</style>