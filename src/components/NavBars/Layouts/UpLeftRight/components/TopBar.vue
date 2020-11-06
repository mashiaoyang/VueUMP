<template> 
    <section id="menu">
        <el-menu 
             :default-active="activeMenu" 
             background-color="rgba(0,0,0,0)"
             text-color="#314969"
             active-text-color="#ffd04b"              
             mode="horizontal" 
             @select="handleSelect">
                <el-menu-item v-for="item in menuArr" 
                :index="item.web_url" 
                :key="item.web_url">
                <span class="fa fa-lg" 
                :class="item.class"></span>  
                {{ item.name }}</el-menu-item>
        </el-menu>
    </section>  
</template>

<script>
export default {
    name: "TopBar",    
    props: {
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
            const { meta, path } = route
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu
            }
            let pathStr;
            if(path.indexOf("device") >= 0) {
              pathStr = "#/device";
            }else if(path.indexOf("system") >=0) {
              pathStr = "#/system";
            }else {
              pathStr = "#" + path.replace("/index", "");
            }
            
            return pathStr
        }
    },   
    data () {
        return {                    
        }        
    },    
    methods: {
        handleSelect (Obj) {
            var path = Obj.replace("#", "");
            this.$router.push({path: path})
        }        
    }
}
</script>
<style scoped>
  .user-dropdown{   
    padding: 15px;
    position: absolute;
    top: 23px;
    right: 20px;
  }
  .el-dropdown-link {
    cursor: pointer;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .el-menu.el-menu--horizontal {
      border-bottom: solid 0px #e6e6e6;
  }
  .el-menu--horizontal .el-menu-item {
    font-size: 17px;
    font-weight: bold;
    -webkit-transition: unset;
    transition: unset;
  }
  /* .is-active{
    border-bottom: 0!important;
    color: #fff!important;
  } */
  .el-dropdown{
    color: #fff;
  }
  .el-submenu__icon-arrow{
    display: none;
  }
  .el-submenu__title,.el-menu-item {
    height: 40px!important;
    line-height: 40px!important;
    border-radius: 5px;
  }
  .el-submenu__title:hover,.el-submenu__title:focus, .el-menu-item:not(.is-disabled):focus, .el-menu-item:not(.is-disabled):hover {
    background-color: #314969!important;
    color: #fff!important;
  }
  .el-submenu__title i {
    color: #fff;
  }
  .user-dropdown{
    text-align: right;
  }
</style>