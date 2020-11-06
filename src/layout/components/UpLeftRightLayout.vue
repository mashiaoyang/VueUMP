<template>
    <up-left-right 
    :top-menus="topMenus"
    :side-menus="sideMenus"
    :u-menu-arr="userMenus"
    ></up-left-right>
</template>

<script>
import UpLeftRight from '@/components/NavBars/Layouts/UpLeftRight/index'
import { getMenus } from '@/message/menu-msg.js'

export default {
  name: 'UpLeftRightLayout',
  components: { UpLeftRight },
  data () {
    return {
      topMenus: [],
      sideMenus: [],
      secdMenuName: '首页',
      userMenus: [{name: 'personal info', link_url: '/personal', class: ''},
                 {name: 'logout', event_url: '/logout', class: ''}
                ]                 
    }
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      console.log("----in watch route:", route);
      this.secdMenuName = this.getSecMenu(route);
      //this.getMenu();
    }
  },
  mounted () {
    this.secdMenuName = this.getSecMenu(this.$route);
    this.getMenu();
  },
  methods: {
    getSecMenu (route) {
      const pathName = route.name;
      var secMenu = '';
      if(pathName == "OverviewIndex") {
        secMenu = '首页';
      }else if (pathName == "TopoIndex") {
        secMenu = '拓扑';
      }else if(pathName == "DeviceInfoIndex" || pathName.indexOf("Device") >= 0) {
        secMenu = '设备';
      }else if(pathName == "SystemIndex" || pathName.indexOf("System") >= 0) {
        secMenu = '系统';
      }else {
        secMenu = '';
      }
      return secMenu
    },
    getMenu () {
      var _self = this;
      getMenus().then(response => {
          _self.topMenus = response.data.content;
          for(var i=0; i<_self.topMenus.length; i++){
            if(_self.topMenus[i].name == _self.secdMenuName) {
              var childMenu = _self.topMenus[i].children;
              _self.sideMenus = childMenu;
            }
          }
      })
    }		
  }
}
</script>
<style scoped>
header { padding: 10px; }
#logo { display: table-cell; }
#nav { display: table-cell; padding: 15px;}
#sidebar {display:table-cell; width:150px; padding:10px;}
section #main {display:table-cell; padding:10px 20px; width:95%;}
</style>