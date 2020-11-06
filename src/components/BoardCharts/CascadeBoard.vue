<template>
    <div class="cascade-div">
        <div v-for="(board, index) in boards" :key="index" >
            <BoxBoard v-if="board.shape=='box'" :boards="board"
            :disableMode="disableMode" :ref="'board'+board.slot_id"
            :dragMode="dragMode"
            :legendMode="legendMode"
            :doubleMode="doubleMode"
            @selectport="selectPort" @selectboard="selectBoard"
            @selectportName="selectportName"
            ></BoxBoard>
            <QuadratureBoard v-else :boards="board" :switchMode="switchMode"></QuadratureBoard>
        </div>
    </div>
</template>
<script>
import BoxBoard from './BoxBoard'
import QuadratureBoard from './QuadratureBoard'

export default {
  name: 'CasecadeBoard',
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
    legendMode: { // 是否需要端口贴膜
      type: Boolean,
      default: false
    },
    dragMode: {
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
  components: { BoxBoard, QuadratureBoard},
  data: function () {
    return {
      switchMode: false,
      self_selectedBoard: '',
      self_selectedPort: ''
    }
  },
  watch: {
    selectedBoard: function (val) {
      if (val == this.self_selectedBoard) {

      } else {
        var allComponent = this.$refs
        if (this.self_selectedBoard) {
          allComponent[this.self_selectedBoard][0].$children[0].cancelBoardSelect()
          this.self_selectedBoard = ''
        } else {
          if (val && !this.disableMode) {
            if (val in allComponent) {
              allComponent[val][0].$children[0].selectBoard()
              this.self_selectedBoard = val
            }
          }
        }
      }
    },
    selectedPort: function (val) {
      if (val == this.self_selectedPort) {

      } else {
        if (this.self_selectedPort) {
          $(`#${this.self_selectedPort}`).removeClass('select')
          this.self_selectedPort = ''
          var connectPort = document.getElementById(val)
          if (connectPort) {
            connectPort.click()
          }
        }
      }
    }
  },
  mounted () {
    this.$emit('finishMounted')
  },
  updated () {
    this.$emit('finishMounted2')
  },
  methods: {
    selectportName: function (val) {
      this.$emit('selectportName', val)
    },
    selectPort: function (val) {
      if (val != this.self_selectedPort) {
        if (this.self_selectedPort) {
          $(`#${this.self_selectedPort}`).removeClass('select')
        }
        $(`#${val}`).addClass('select')
        this.self_selectedPort = val
      }
      this.$emit('selectport', val)
    },
    boardSelect () {

    },
    selectBoard: function (val) {
      var allComponent = this.$refs
      if (this.self_selectedBoard) {
        if (val != this.self_selectedBoard) {
          allComponent[this.self_selectedBoard][0].$children[0].cancelBoardSelect()
          allComponent[val][0].$children[0].doBoardSelect()
          this.self_selectedBoard = val
        }
      } else {
        allComponent[val][0].$children[0].doBoardSelect()
        this.self_selectedBoard = val
      }
      this.$emit('selectboard', val)
    }
  }
}
</script>
<style scope>
    .cascade-div{
        max-height: 600px;
        overflow: auto;
        padding-left: 20px;
        width:100%;
    }
    .cascade-div  .chassis{
        padding-left: 20px;
        margin-left: -20px;
        border: 5px solid #000;
        justify-content:inherit;
    }
    @media screen and (min-width: 1367px) {
        .cascade-div  .chassis{
            width: calc(87vw - 170px);
        }
    }

    @media screen and (max-width: 1366px) {
        .cascade-div  .chassis{
            width: calc(95vw - 170px);
        }
    }

</style>
