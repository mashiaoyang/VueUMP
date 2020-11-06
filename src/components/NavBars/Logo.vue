<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" to="/">
        <img :src="logo" class="sidebar-logo">
      </router-link>
      <router-link v-else key="expand"  to="/">
        <img :src="logo" class="sidebar-logo">     
      </router-link>
    </transition>
  </div>
</template>

<script>
import logoFile from '@/assets/logo.png'

export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      logo: logoFile
    }
  }
}
</script>
<style scoped>
  .sidebar-logo-container{
        padding: 20px;
  }
  .sidebar-logo {
      width: 120px;
  }
</style>