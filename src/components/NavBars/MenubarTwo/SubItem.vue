<template>
    <!--<router-link :to="comptUrl(item.web_url)">-->
        <el-menu-item :index="item.web_url">
          {{ item.name }}
          <!--<item :icon="item.class" :title="item.name" />-->
        </el-menu-item>
    <!--</router-link>-->
</template>

<script>

export default {
    name: "SubItem",
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