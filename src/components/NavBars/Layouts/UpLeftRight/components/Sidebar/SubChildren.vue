<template>
    <!--<el-submenu :index="item.web_url">
        <template slot="title" >
          <span class="fa fa-lg" :class="item.class"></span>
          <span>{{item.name}}</span>
        </template>
        <sidebar-item
            v-for="child in item.children"
            :key="child.web_url"        
            :item="child"        
            class="nest-menu"
        ></sidebar-item>     
    </el-submenu>-->
    <div>
    <sidebar-item
                  
            :item="item"        
            class="nest-menu"
        ></sidebar-item> 
    </div>
</template>

<script>
import Item from './Item.vue'
import SidebarItem from './SidebarItem'

export default {
    name: "SubChildren",   
    components: { SidebarItem, Item },
    props: {
        item: {
            type: Object,
            required: true
        }
    }
}
</script>