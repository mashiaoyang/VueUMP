<template>
  <div>
    <i class="fa fa-lg" :class="icon" v-if="icon!=''"></i>
    <span slot="title">{{title}}</span>
  </div>
</template>
<script>
export default {
  name: 'MenuItem',
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
<style scoped>
  .fa{
    color: #fff;
  }
</style>