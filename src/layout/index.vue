<template>
  <!-- <left-right-layout></left-right-layout> -->
  <up-down-layout></up-down-layout>
  <!--<up-left-right-layout></up-left-right-layout>-->
</template>

<script>
import LeftRightLayout from './components/LeftRightLayout'
import UpDownLayout from './components/UpDownLayout'
import UpLeftRightLayout from './components/UpLeftRightLayout'

export default {
  name: "layout",
  components: { UpDownLayout, LeftRightLayout, UpLeftRightLayout }
}
</script>
<style scoped lang="scss">


</style>