<template>
    <el-row class="panel col-12" id="showBoard">
        <box-board :boards="boards[0]" :disableMode="disableMode" :doubleMode="doubleMode"
					@selectport="selectPort" @selectboard="selectBoard" :ref="'board'+boards[0].slot_id"
					:selectedBoard="selectedBoard" :selectedPort="selectedPort" >
        </box-board>
	</el-row>
</template>
<script type="text/javascript">
import BoxBoard from './BoxBoard'

export default {
  name: 'ShowBoard',
  components: { BoxBoard },
  props: {
    boards: {
      type: Array,
      default: function () {
        return []
      }
    },
    disableMode: { // 查看模式
      type: Boolean,
      default: false
    },
    doubleMode: {
      type: Boolean,
      default: false
    },
    selectedBoard: {
      type: String,
      default: ''
    },
    selectedPort: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.$emit('finishMounted')
  },
  watch: {
    selectedBoard: function (val) {
      var allComponent = this.$refs
      console.log('allcomponents = ', allComponent)
      allComponent[val].$children[0].doBoardSelect()
    },
    selectedPort: function (val) {
      var connectPort = document.getElementById(val)
      if (connectPort) {
        connectPort.click()
      }
    }
  },
  methods: {
    selectPort: function (val) {
      this.$emit('selectport', val)
    },
    selectBoard: function (val) {
      this.$emit('selectboard', val)
    }
  }
}
</script>
