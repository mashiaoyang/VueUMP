<template>
    <newBoard :board="boards" :classStyle='classStyle' :disableMode="disableMode"
     :dragMode="dragMode" :legendMode="legendMode" :doubleMode="doubleMode"
        @selectport="selectPort" @selectboard="selectBoard"
        @selectportName="selectportName">
    </newBoard>
</template>
<script type="text/javascript">
// import cabinetMsg from '@/message/cabinet-msg.js'
import newBoard from './components/hor-frame'

export default {
  name: 'Box',
  props: {
    boards: {
      type: Object,
      default: function () {
      }
    },
    disableMode: { // 查看模式
      type: Boolean,
      default: false
    },
    legendMode: { // 是否需要端口贴膜
      type: Boolean,
      default: false
    },
    doubleMode: { // 选中端口时同同时选中板卡
      type: Boolean,
      default: false
    },
    dragMode: {
      type: Boolean,
      default: false
    }
  },
  components: { newBoard },
  data: function () {
    return {
      classStyle: true
    }
  },
  mounted () {

  },
  methods: {
    selectportName: function (val) {
      this.$emit('selectportName', val)
    },
    selectPort: function (val) {
      this.$emit('selectport', val)
    },
    selectBoard: function (val) {
      this.$emit('selectboard', val)
    }
  }
}
</script>
<style scope>
#boxboard .cboard-header {
    width: 65px;
    display: flex;
}

</style>
