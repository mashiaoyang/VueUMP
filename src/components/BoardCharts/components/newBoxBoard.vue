<template>
   <div :id="'board'+board.slot_id" :class="boardStyle" @click="selectBoard()" :disabled='disableMode'>
        <div :class="classStyle?['cboard-header','board-header-unset']:'cboard-header'" :style="{marginTop:((!board.name && atcaMode)?'-17px':'')}">
            <span class="ctitle">{{ board.name }}</span>
            <span v-if="(classStyle || direction=='vertical') && board.name" class="fa fa-power-off powerStyle"></span>
            <div v-if="classStyle " class="div-mark div-mark-color">{{board.slot_id}}</div>
        </div>
        <div :class="classStyle?['board-div','board-div-unset']:'board-div'">
            <div class="board-module">
                <div class="board-scroll-div" v-if="board.module">
                    <div class="display-in" v-for="(colports,index) in (pickedModule(board.module)).colPorts" :key="index">
                        <div v-if="legendMode">
                            <div class="legend-left" :class="colports[0]?'':'big-legend-left'"><span class="p-size-small port-label" >{{colports[1][0].port_id}}</span></div>
                            <div class="legend-right"><span class="p-size-small" >{{colports[2][0].port_id}}</span></div>
                            <div class="legend-left" :class="colports[1].length>6?'big-legend-right':''" v-if="colports[0]==0"><span class="p-size-small port-label" >{{colports[1][colports[1].length - 1].port_id}}</span></div>
                            <div class="legend-right" v-if="colports[0]==0"><span class="p-size-small" >{{colports[2][colports[2].length - 1].port_id}}</span></div>
                        </div>

                        <div :class="singleMode?'module-single':'module-top' ">
                            <div v-for="(port,index) in colports[1]" :class="[port.shape, port.status]" :style="{cursor:(editMode||dragMode?(port.status.indexOf('linkup')>-1?'pointer':'not-allowed'):'pointer')}"
                                :title="port.port_id" @click.stop="selectport(port)"  name="cell" :id="board.slot_id+'-'+port.port_id" :key="index"></div>
                        </div>

                        <div v-for="count in looptime" class="ver-reverse" :key="count">
                            <div class="module" v-if="colports[0]==1">
                                <div class="ver-module-fa">
                                    <i class="fa fa-caret-up fa-color fa-margin-left-7 p-size-small" aria-hidden="true"></i>
                                    <i class="fa fa-th-large fa-color fa-margin-left-7 p-size-small" aria-hidden="true"></i>
                                    <i class="fa fa-th-large port-margin-left-o fa-color p-size-small" aria-hidden="true"></i>
                                    <i class="fa fa-caret-down fa-color fa-margin-left-7 p-size-small" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div v-else class="module">
                                <div v-for="port in colports[count+1] " class="display-inblock fa-style" :key="port.port_id">
                                    <i class="fa fa-caret-up fa-color p-size-small" aria-hidden="true"></i>
                                    <i class="fa fa-caret-down fa-color p-size-small" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div class="module-middle">
                                <div v-for="port in colports[count+1]" :class="[port.shape, port.status]" :style="{cursor:(editMode||dragMode?(port.status.indexOf('linkup')>-1?'pointer':'not-allowed'):'pointer')}"
                                    :title="port.port_id" @click.stop="selectport(port)"  name="cell" :id="board.slot_id+'-'+port.port_id" :key="board.slot_id+'-'+port.port_id"></div>
                            </div>
                        </div>

                        <div class="module" v-if="colports[0]==1 && !singleMode">
                            <div class="ver-module-fa">
                                <i class="fa fa-caret-up fa-color fa-margin-left-7 p-size-small" aria-hidden="true"></i>
                                <i class="fa fa-th-large fa-color fa-margin-left-7 p-size-small" aria-hidden="true"></i>
                                <i class="fa fa-th-large port-margin-left-o fa-color p-size-small" aria-hidden="true"></i>
                                <i class="fa fa-caret-down fa-color fa-margin-left-7 p-size-small" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div v-else-if="!singleMode" class="module">
                            <div v-for="port in colports[arrayLen-1] " class="display-inblock fa-style" :key="port.port_id">
                                <i class="fa fa-caret-up fa-color p-size-small" aria-hidden="true"></i>
                                <i class="fa fa-caret-down fa-color p-size-small" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div class="module-bottom" v-if="colports[arrayLen-1].length>0 && !singleMode">
                            <div v-for="port in colports[arrayLen-1]" :class="[port.shape, port.status]" :style="{cursor:(editMode||dragMode?(port.status.indexOf('linkup')>-1?'pointer':'not-allowed'):'pointer')}"
                            :title="port.port_id" @click.stop="selectport(port)"  name="cell" :id="board.slot_id+'-'+port.port_id" :key="board.slot_id+'-'+port.port_id"></div>
                        </div>
                        <div class="module-bottom " v-else-if="!singleMode">
                            <li class="port-none"></li>
                        </div>
                    </div>
                </div>

            </div>

            <div style="height:24px" v-if="atcaMode">
                <span class="weui-switch" v-if="frMode" :class="{'weui-switch-on' : front}" @click="frswitchClick" >
                    <div v-if="front" class="switch-font-l">F</div>
                    <div v-if="!front" class="switch-font-r">R</div>
                </span>
            </div>
            <div class="led-div" v-if="!classStyle && direction=='horizontal'">
                <div class="circle powerOn"></div>
                <p class="display-in p-size-small font-color">Power</p>
                <div class="circle powerOn"></div>
                <p class="display-in p-size-small font-color">System</p>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
export default {
  name: 'newBoard',
  props: {
    board: {
		 	type: Object,
		 	default: null
    },
    classStyle: { // 盒式还是板卡式
      type: Boolean,
      default: true
    },
    editMode: { // 编辑模式，先选板子，再选端口
      type: Boolean,
      default: false
    },
    disableMode: { // 板卡不可操作模式
      type: Boolean,
      default: false
    },
    autoMode: { // 混合模式，不用选中板卡，即可选端口
      type: Boolean,
      default: false
    },
    legendMode: { // 是否需要端口贴膜
      type: Boolean,
      default: false
    },
    direction: { // 板卡排布，是横着还是竖着
      type: String,
      default: 'horizontal' // 'vertical'//
    },
    frMode: { // 显示正面还是背面
      type: Boolean,
      default: false
    },
    doubleMode: { // 选中端口时同同时选中板卡
      type: Boolean,
      default: false
    },
    atcaMode: {
      type: Boolean,
      default: false
    },
    dragMode: { // 拖拽模式
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      selectedPort: null,
      selectedModule: 6,
      boardStyle: 'board-main',
      interBoard: '',
      cascadeobj: {
        able: false,
        name: '',
        slot: 1,
        port_id: 0
      },
      arrayLen: 0,
      looptime: 0,
      front: true,
      singleMode: false,
      defaultSelectedPort: null
    }
  },
  beforeMount () {
    // if(this.direction == 'horizontal') {
    //     require('@/styles/boardhor.css')
    // }else if(this.direction == 'vertical') {
    //     require('@/styles/boardver.css')
    // }
  },
  watch: {
    board: function (val) {
      if (!this.selectedPort) {
        return
      }
      var curModule = this.pickedModule(this.board.module)
      for (var i = 0; i < curModule.colPorts.length; i++) {
        for (var j = 1; j < curModule.colPorts[i].length; j++) {
          for (var k = 0; k < curModule.colPorts[i][j].length; k++) {
            if (curModule.colPorts[i][j][k].port_id == this.selectedPort.port_id) {
              this.keepSelect(curModule.colPorts[i][j][k])
            }
          }
        }
      }
    },
    editMode: function (val, oldval) {
      this.boardStyle = 'board-main'
      if (this.editMode) {
        this.boardStyle += ' board-shadow'
        this.selectedPort = null
      }
      if (val != oldval) {
        if (this.selectedPort && this.selectedPort.status.indexOf('select') > 0) {
          this.selectedPort.status = this.selectedPort.status.replace(' select', '')
        }
        this.interBoard = ''
      }
    }
  },
  mounted () {
    this.defaultSelectedPort = this.pickedModule(this.board.module).colPorts[0][1][0]
  },
  methods: {
    pickedModule: function (modules) {
      var i = 0
      var curModule = modules[0]
      this.arrayLen = curModule.colPorts[0].length
      this.looptime = this.arrayLen - 3 > 0 ? this.arrayLen - 3 : 0
      this.singleMode = !(this.arrayLen > 2)
      return curModule
    },
    frswitchClick () {
      this.front = !this.front
      this.$emit('frMode', this.front ? 'f' : 'r', this.board.slot_id)
    },
    initSelect: function () {
      this.interBoard = ''
      this.$emit('cascadeAble', this.cascadeobj)
      this.cascadeobj = {
        able: false,
        name: '',
        slot: 1,
        port_id: 0
      }
      if (this.selectedPort && this.selectedPort.status.indexOf('select') > 0) {
        this.selectedPort.status = this.selectedPort.status.replace(' select', '')
      }
      this.selectedPort = null
    },
    keepSelect: function (port) {
      if (!port) {
        return
      }
      if (port != null && this.selectedPort && this.selectedPort.status.indexOf('select') > 0) {
        this.selectedPort.status = this.selectedPort.status.replace(' select', '')
      }
      port.status += ' select'
      this.selectedPort = port
    },
    selectport: function (port) {
      if (!port) {
        return
      }
      if (this.disableMode || this.dragMode) {
        return
      }
      var board = this.board
      if (!this.editMode) {
        this.$emit('selectport', '' + board.slot_id + '-' + port.port_id)
      }
      if (this.doubleMode && !this.interBoard) {
        this.selectedPort = port
        this.selectBoard()
        return
      }
      if (!this.autoMode) {
        if (this.editMode && this.boardStyle.indexOf('board-selected') == -1) {
          return
        }
      }
      if (this.editMode && (port.status.indexOf('connect') > -1 || port.status.indexOf('linkdown') > -1)) {
        return
      }
      if (port != null && this.selectedPort && this.selectedPort.status.indexOf('select') > 0) {
        this.selectedPort.status = this.selectedPort.status.replace(' select', '')
      }

      if (JSON.stringify(this.selectedPort) != JSON.stringify(port)) {
        port.status += ' select'
        this.selectedPort = port
      } else {
        this.selectedPort = null
      }
    },
    getSelectBoardStr (board) {
      return 'board' + board.slot_id
    },
    cancelBoardSelect () {
      this.boardStyle = this.boardStyle.replace(new RegExp(' board-selected', 'gm'), '')
      this.initSelect()
    },
    doBoardSelect () {
      this.boardStyle += ' board-selected'
      this.interBoard = this.getSelectBoardStr(this.board)
    },
    selectBoard: function () {
      if (this.disableMode) {
        return
      }
      if (this.doubleMode) {

      } else if (!this.classStyle || !this.editMode || this.autoMode || this.dragMode) {
        return
      }
      if (this.selectedPort) {
        this.$emit('selectboard', this.getSelectBoardStr(this.board))
      } else {
        console.log(this.defaultSelectedPort)
        this.selectport(this.defaultSelectedPort)
      }
    }
  }
}
</script>

<style scoped>
@import url("../../../styles/chassis.css");
@import url("../../../styles/boardhor.css");
.board-header-unset{
    border:initial;
    box-shadow:initial;
    position:relative;
    background-color: rgba(0,0,0,.4);
    height: inherit;
}
.board-div-unset{
    border:initial;
    box-shadow:initial;
    background-color: rgba(0,0,0,.4);
    min-height: 115px;
    max-height: 140px;
	align-items: center;
	display: flex;
}
.board-shadow{
    box-shadow: -6px 8px 4px -4px rgba(0, 0, 0, 1);
}

.board-selected{
    box-shadow:initial;
    border: 2px solid #fff;
    border-radius: 10px;
    width: calc(87vw - 190px);
}

@media screen and (min--moz-device-pixel-ratio:0) {
    .board-selected{
        width: calc(87vw - 196px);
    }
}

.board-filter{
    filter: opacity(0.1);
}
</style>
