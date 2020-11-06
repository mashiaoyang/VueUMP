<template>
  <div>    
    <!-- <el-scrollbar wrap-class="scrollbar-wrapper"> -->
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"        
        :unique-opened="false"        
        :collapse-transition="false"
        mode="vertical"
        background-color="rgba(0,0,0,0)"
        text-color="#fff"
        active-text-color="#ffd04b"
        :default-openeds='openedArr'
      >
        <sidebar-item v-for="menu in menuArr" :key="menu.web_url" :item="menu"/>
      </el-menu>
    <!-- </el-scrollbar> -->
  </div>
</template>

<script>
import SidebarItem from './SidebarItem'

export default {
  name: 'Sidebar',
  components: { SidebarItem },
  props: {
    mode: {
      type: String,
      default: 'vertical'
    },
    showLogo: {
      type: Boolean,
      default: true
    },
    menuArr: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    activeMenu() {
      const route = this.$route
      //console.log("route:", route.matched)
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      let pathStr = "";
      if(path.indexOf("/device/index") >= 0){
        pathStr = "#/device/info";
      }else {
        pathStr = "#" + path;
      }
      return pathStr
    },
    openedArr() {
      var arr = []
      for(var i=0; i<this.menuArr.length; i++){
        if(this.menuArr[i].hasOwnProperty('children')) {
          arr.push(this.menuArr[i].web_url)
        }
      }
      
      return arr
    }
  },
  data () {
    return {
      isCollapse: false
    }
  }
}
</script>
<style scoped>
  .el-menu{
    border:0px;
  }  
</style>