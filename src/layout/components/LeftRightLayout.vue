<template>
  <left-right :menu-arr="topMenus" 
  :u-menu-arr="uMenuArr"></left-right>
</template>

<script>
import LeftRight from '@/components/NavBars/Layouts/LeftRight'
import { getMenus } from '@/message/menu-msg.js'

export default {
  name: 'LeftRightLayout',
  components: { LeftRight },
  data () {
    return {
      topMenus: [],      
      uMenuArr: [{name: 'personal info', link_url: '/personal', class: ''},
                 {name: 'logout', event_url: '/logout', class: ''}]
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
    this.getMenu();
  },
  methods: {    
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