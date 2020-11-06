<template>
    <div>
      <header>      
        <div id="logo">
            <logo :collapse="logCollapse"></logo>
        </div>
        <div id="nav">
            <top-bar :menu-arr="topMenus" :mode="'horizontal'"></top-bar>      
        </div>
        <div id="right-nav">
            <user-center :menu-arr="uMenuArr"></user-center>
        </div>      
      </header>
      <section id="content">
        <div id="sidebar" v-if="sideMenus.length > 0">
          <sidebar :show-logo="false" :menu-arr="sideMenus" />
        </div>
        <div id="main">
          <app-main></app-main>
        </div>
      </section>
    </div>  
</template>

<script>
import { Sidebar } from './components'
import TopBar from './components/TopBar'
import AppMain from '../AppMain'
import Logo from '../../Logo.vue'
import UserCenter from '../../UserCenter'

export default {
  name: 'UpLeftRightLayout',
  components: { Sidebar, AppMain, TopBar, Logo, UserCenter },
  props: {
      topMenus: {
          required: true,
          type: Array,
          default () {
              return []
          }
      },
      sideMenus: {
          required: true,
          type: Array,
          default () {
              return []
          }
      },
      uMenuArr: {
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
<style scoped>
header { padding: 10px; }
#logo { display: table-cell; }
#nav { display: table-cell; padding: 15px; width:75%;}
#sidebar {display:table-cell; width:150px; padding:10px;}
section #main {display:table-cell; padding:10px 20px; width:95%;}
#right-nav {display:table-cell; width:115px; margin-right: 11px;}
</style>