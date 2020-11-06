<template>
<el-dropdown>
    <span class="el-dropdown-link">
        <img :src="adminIcon" style="height:45px; width:45px"> 
        {{ user }}    
        <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
       <template v-for="item in menuArr">
          <router-link v-if="item.hasOwnProperty('link_url')" :to="item.link_url">
            <el-dropdown-item>{{ $t(item.name) }}</el-dropdown-item>
          </router-link>
          <el-dropdown-item v-else>
            <span style="display:block;" @click="logout(item.event_url)">{{ $t(item.name) }}</span>
          </el-dropdown-item>
       </template>         
    </el-dropdown-menu>
</el-dropdown>
</template>

<script>
import adminIcon from '@/assets/admin-white.gif'
export default {
    name: "UserCenter",
    props: {
        menuArr: {
            type: Array,
            default () {
                return []
            }
        }
    },
    data() {
        return {
            adminIcon: adminIcon,
            user: "Admin"
        }
    },
    methods: {
        logout (url) {
            //clear all session here
            this.$emit('logout');
			this.$router.push({"path": url});
        }
    }  
}
</script>

<style lang="scss" scoped>
@import "src/styles/variables.scss";

.el-dropdown {
    color: #fff;
    margin-top: 11px;
}
</style>

<i18n>
{
    "zh_CN": {
        "user center": "用户中心",
        "personal info": "个人信息",
        "logout": "登出"
    },
    "en": {
        "user center": "User Center",
        "personal info": "Personal Info",
        "logout": "Log-out"
    }
}
</i18n>