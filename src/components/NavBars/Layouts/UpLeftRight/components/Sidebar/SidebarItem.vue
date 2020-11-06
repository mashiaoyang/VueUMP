<template>
  <div class="menu-wrapper sidebar">
    <el-submenu :index="item.web_url" v-if="item.hasOwnProperty('children')">
        <template slot="title" >
          <span class="fa fa-lg" :class="item.class"></span>
          <span>{{item.name}}</span>
        </template>
        <sidebar-item
        v-for="child in item.children"
        :key="child.web_url"        
        :item="child"        
        class="nest-menu"
      />        
    </el-submenu>

    <template v-else>
      <router-link :to="comptUrl(item.web_url)">
        <el-menu-item :index="item.web_url">
          <item :icon="item.class" :title="item.name" />
        </el-menu-item>
      </router-link>
    </template>  

  </div>
</template>

<script>
import Item from './Item.vue'

export default {
  name: 'SidebarItem',
  components: { Item },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    comptUrl(url) {
      var validUrl = url.replace("#", "");
      return validUrl
    }
  }
}
</script>
<style >
  .el-icon-location{
    color: #fff;
  }
  .el-submenu .el-menu-item {
    font-size: 14px;
    line-height: 40px;
    height: 40px;
    padding-left: 50px!important;
    min-width: 100px;
  }  
  .sidebar .el-submenu__title,.el-menu-item {
    border-radius: 5px;
  }
  .sidebar .el-menu-item:focus, .sidebar .el-menu-item:hover {
    background-color: #314969!important;
  }
  .sidebar .el-submenu__title:focus, .sidebar .el-submenu__title:hover {
    outline: 0;
    background-color: #314969!important;
  }
</style>
