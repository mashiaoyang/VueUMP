<template>
    <el-row class="panel col-12" id="showBoard">
		<el-carousel height="310px" direction="vertical" :autoplay="false" ref="boardshow" v-if="boards.length>1">
			<el-carousel-item v-for="id in circleNum" :key="id">
				<cascade-board :boards="boards.slice((id-1)*sliceNum,id*sliceNum)" :disableMode="disableMode" :doubleMode="doubleMode"
					@selectport="selectPort" @selectboard="selectBoard" @finishMounted="$emit('finishMounted')"
                    @selectportName="selectportName"
					:selectedBoard="selectedBoard" :selectedPort="selectedPort"></cascade-board>
			</el-carousel-item>
		</el-carousel>
        <cascade-board :boards="boards" :disableMode="disableMode" :doubleMode="doubleMode"
					@selectport="selectPort" @selectboard="selectBoard" @finishMounted="$emit('finishMounted')"
                    @selectportName="selectportName"
					:selectedBoard="selectedBoard" :selectedPort="selectedPort" v-else>
        </cascade-board>
	</el-row>
</template>
<script type="text/javascript">
import CascadeBoard from './CascadeBoard'

export default {
  name: 'ShowBoard',
  components: { CascadeBoard },
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
  data () {
    return {
      sliceNum: 2
    }
  },
  computed: {
    circleNum: function () {
      return Math.ceil(this.boards.length / this.sliceNum)
    }
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
<style lang="scss">
    #showBoard {
		.el-carousel__item:nth-child(odd){
			background: inherit!important;
		}
		.el-carousel__item:nth-child(2n){
			background: inherit!important;
		}
	}
</style>
