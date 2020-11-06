<template>
    <el-menu
    :default-active="activeMenu"
    :collapse="isCollapse"
    :background-color="variables.menuBg"
    :text-color="variables.menuText"
    :unique-opened="false"
    :active-text-color="variables.menuActiveText"
    :collapse-transition="false"        
    :mode="mode"
    menu-trigger="'click'">       
        <template v-for="(menu, index) in menuArr" >
            <el-submenu v-if="menu.children" :index="menu.web_url">
                <template slot="title">
                    <!--<item :icon="menu.class" :title="menu.name"></item>-->
                    {{ menu.name }}
                </template>
                <el-menu-item v-for="item in menu.children" 
                :index="item.web_url"
                :key="item.web_url"
                >
                <router-link :to="item.web_url" :key="item.id">
                    <item :icon="item.class" :title="item.name" ></item> 
                </router-link>
                </el-menu-item>                               
            </el-submenu>              
            <el-menu-item v-else :index="menu.web_url" >
                <router-link :to="menu.web_url" :key="menu.id">
                    <item :icon="menu.class" :title="menu.name" ></item>            
                </router-link>
            </el-menu-item>
        </template>
    </el-menu>
    
</template>

<script>
import MenuContent from './MenuContent'
import Item from './Item'
import variables from '@/styles/variables.scss'

export default {
    name: "MenubarTow",
    components: { MenuContent, Item },
    props: {
        mode: {
            type: String,
            default: ''
        },
        // showLogo: {
        //     type: Boolean,
        //     default: true
        // },
        menuArr: {
            type: Array,
            default () {
                return []
            }
        },
        isCollapse: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        activeMenu() {
            const route = this.$route;
            const { meta, path } = route;            
            return path
        },
        variables() {
            return variables
        }
    }
}
</script>
<style lang="scss">
@import "@/styles/variables.scss";
@import "src/styles/sidebar.scss";
/*.el-submenu__title:hover{
  background-color: #4B9AFF !important;
}
.el-menu-item:hover{
  background-color: #4B9AFF !important;
}*/
// .el-menu-item.is-active {
//     font-weight: 800;
// }
</style>