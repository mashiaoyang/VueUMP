<template>
    <el-submenu :index="item.web_url">
        <template slot="title">{{ item.name }}</template>
        <!--<el-menu-item v-for="(menu, index) in item.children" 
        :key="menu.id">{{ menu.name }}</el-menu-item>-->
    </el-submenu>
</template>

<script>
export default {
    name: "SubChildren",
    props: {
        item: {
            type: Object,
            required: true
        }
    }  
}
</script>