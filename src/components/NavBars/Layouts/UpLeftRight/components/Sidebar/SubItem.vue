<template>
    <!--<router-link :to="comptUrl(item.web_url)">-->
        <el-menu-item :index="item.web_url">
          {{ item.name }}
          <!--<item :icon="item.class" :title="item.name" />-->
        </el-menu-item>
    <!--</router-link>-->
</template>

<script>
import Item from './Item.vue'

export default {
    name: "SubItem",
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