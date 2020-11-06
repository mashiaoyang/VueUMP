<template>
    <up-down 
    :menus="topMenus" 
    :user-menus="uMenuArr">
    </up-down>
</template>

<script>
import UpDown from '@/components/NavBars/Layouts/UpDown.vue'
import { getMenus } from '@/message/menu-msg.js'

export default {
  name: 'UpDownLayout',
  components: { UpDown },
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
      //this.secdMenuName = this.getSecMenu(route);
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
      })
    }		
  }
}
</script>
