<template>
    <el-card class="box-card" :body-style="{backgroundColor: 'rgba(0,0,0,.4)',padding:'10px 20px 10px 0px'}"
        :id="'board'+board.slot_id" @click="selectBoard()" :shadow="boardStyle">
        <div class="box-body-height">
            <el-col :xs="2" :sm="2" :md="2" :lg="1" :xl="1" class="box-board-header"><span class="ctitle">{{ board.name }}</span></el-col>
            <el-col :xs="2" :sm="2" :md="2" :lg="1" :xl="1"  class="box-board-header board-power">
                <span class="fa fa-power-off powerStyle"></span>
                <div class="div-mark div-mark-color">{{board.slot_id}}</div>
            </el-col>
            <el-col :xs="20" :sm="20" :md="20" :lg="22" :xl="22" class="board-panel">
                <div class="cell-panel">
                    <div class="display-in" v-for="(colports,index) in (pickedModule(board.module)).colPorts" :key="index">
                        <div v-if="legendMode">
                            <div class="legend-left" :class="colports[0]?'':'big-legend-left'"><span class="p-size-small port-label" >{{colports[1][0].port_id}}</span></div>
                            <div class="legend-right"><span class="p-size-small" >{{colports[2][0].port_id}}</span></div>
                            <div class="legend-left" :class="colports[1].length>6?'big-legend-right':''" v-if="colports[0]==0"><span class="p-size-small port-label" >{{colports[1][colports[1].length - 1].port_id}}</span></div>
                            <div class="legend-right" v-if="colports[0]==0"><span class="p-size-small" >{{colports[2][colports[2].length - 1].port_id}}</span></div>
                        </div>

                        <div class="module-top" v-if="colports[1].length>0">
                            <div v-for="(port,index) in colports[1]" :class="[port.shape, port.status]"
                                :style="{cursor:(editMode||dragMode?(port.status.indexOf('available')>-1?'pointer':'not-allowed'):'pointer')}"
                                :title="port.name" @click.stop="selectport(port)"  name="cell" :id="board.slot_id+'-'+port.port_id" :key="index"></div>
                        </div>
                        <div class="module-top " v-else>
                            <li class="port-none"></li>
                        </div>

                        <div v-for="count in looptime" :key="count">
                            <div class="module" v-if="colports[0]==1">
                                <i class="fa fa-caret-up fa-color fa-margin-left-2 p-size-small" aria-hidden="true"></i>
                                <i class="fa fa-th-large fa-color fa-margin-left-2 p-size-small" aria-hidden="true"></i>
                                <i class="fa fa-th-large port-margin-left-o fa-color p-size-small" aria-hidden="true"></i>
                                <i class="fa fa-caret-down fa-color fa-margin-left-2 p-size-small" aria-hidden="true"></i>
                            </div>
                            <div v-else class="module">
                                <div v-for="port in colports[count+1] " class="fa-style" :key="port.port_id">
                                    <i class="fa fa-caret-up fa-color p-size-small" aria-hidden="true"></i>
                                    <i class="fa fa-caret-down fa-color p-size-small" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div class="module-middle">
                                <div v-for="port in colports[count+1]" :class="[port.shape, port.status]" :style="{cursor:(editMode||dragMode?(port.status.indexOf('available')>-1?'pointer':'not-allowed'):'pointer')}"
                                    :title="port.name" @click.stop="selectport(port)"  name="cell" :id="board.slot_id+'-'+port.port_id" :key="board.slot_id+'-'+port.port_id"></div>
                            </div>
                        </div>

                        <div class="module" v-if="colports[0]==1 && !singleMode">
                            <div >
                                <i class="fa fa-caret-up fa-color fa-margin-left-2 p-size-small" aria-hidden="true"></i>
                                <i class="fa fa-th-large fa-color fa-margin-left-2 p-size-small" aria-hidden="true"></i>
                                <i class="fa fa-th-large port-margin-left-o fa-color p-size-small" aria-hidden="true"></i>
                                <i class="fa fa-caret-down fa-color fa-margin-left-2 p-size-small" aria-hidden="true"></i>
                            </div>
                        </div>

                        <div v-else-if="!singleMode" class="module">
                            <div v-for="port in colports[arrayLen-1] " class="fa-style" :key="port.port_id">
                                <i class="fa fa-caret-up fa-color p-size-small" aria-hidden="true"></i>
                                <i class="fa fa-caret-down fa-color p-size-small" aria-hidden="true"></i>
                            </div>
                        </div>

                        <div class="module-bottom" v-if="colports[arrayLen-1].length>0 && !singleMode">
                            <div v-for="port in colports[arrayLen-1]" :class="[port.shape, port.status]" :style="{cursor:(editMode||dragMode?(port.status.indexOf('available')>-1?'pointer':'not-allowed'):'pointer')}"
                                    :title="port.name" @click.stop="selectport(port)"  name="cell" :id="board.slot_id+'-'+port.port_id" :key="board.slot_id+'-'+port.port_id">
                            </div>
                        </div>
                        <div class="module-bottom " v-else-if="!singleMode">
                            <li class="port-none"></li>
                        </div>
                    </div>
                </div>
            </el-col>
        </div>
    </el-card>
</template>

<script type="text/javascript">
export default {
  name: 'newBoard',
  props: {
    board: {
		 	type: Object,
		 	default () {
        return {}
      }
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
      interBoard: '',
      cascadeobj: {
        able: false,
        name: '',
        slot: 1,
        port_id: 0
      },
      boardStyle: 'never',
      arrayLen: 0,
      looptime: 0,
      front: true,
      singleMode: false,
      defaultSelectedPort: null
    }
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
      if (this.editMode) {
        this.boardStyle = 'always'
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
        this.$emit('selectportName', port.name)
      }
      if (this.doubleMode && !this.interBoard) {
        this.selectedPort = port
        this.selectBoard()
        return
      }
      if (!this.autoMode) {
        if (this.editMode && this.boardStyle == 'always') {
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
      this.boardStyle = 'never'
      this.initSelect()
    },
    doBoardSelect () {
      this.boardStyle = 'always'
      this.interBoard = this.getSelectBoardStr(this.board)
    },
    selectBoard: function () {
      if (this.disableMode) {
        return
      }
      if (this.doubleMode) {

      } else if (!this.editMode || this.autoMode || this.dragMode) {
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

<style scoped lang="scss">
.el-card.is-always-shadow{
    border:2px solid #fff;
    border-radius:10px
}
.box-card{
    width: calc(87vw - 275px);
    border-radius: 10px;
    background-color: rgba(51.4,51.4,51.4,0.3);
    margin-bottom: 10px;

    .box-body-height{
        height: 115px;
        display: flex;
    }
    .box-board-header{
        display: inline-flex;
        align-self: center;
    }
    .board-power{
        height: 115px;
        display: table;
    }
    .board-panel{
        width: calc(87vw - 410px);
        overflow-y: auto;
        align-self: center;
    }
    .board-panel::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 10px;
        background: #b0b0b0;
        margin: 3px;
    }

    .board-panel::-webkit-scrollbar{
        height:10px;
    }
    .board-panel::-webkit-scrollbar-track{
        background: #d7d7d7;
        border-radius:10px;
    }
    .board-panel::-webkit-scrollbar-thumb:hover{
        background: #8b8b8b;
    }

    .ctitle{
        width: 100%;
        color: #fff;
        font-weight: bold;
        transform: rotate(-90deg);
        -ms-transform: rotate(-90deg);
        -moz-transform: rotate(-90deg);
        -webkit-transform: rotate(-90deg);
        -o-transform: rotate(-90deg);
        align-items:center;
    }

    .powerStyle{
        display:table-cell;
        vertical-align:middle;
        color: #0fde30;
    }

    .div-mark{
        height: 14px;
        width: 18px;
        border-radius: 0 0px 5px 5px;
        margin-top:-10px;
        -webkit-box-shadow: -5px 0px 5px -4px #000;
        box-shadow: -5px 0px 5px -4px #000;
        font-size: 10px;
        text-align: center;
        line-height: 14px;
        color: #fff;
    }

    .div-mark-color{
        background-color: rgba(148, 150, 150, 0.8);
        border: 1px rgba(148, 150, 150, 0.8) solid;
    }

    .board-filter{
        filter: opacity(0.1);
    }
    .cell-panel{
        margin-bottom: 3px;
        width: -webkit-max-content;
        width: -moz-max-content;
        width: max-content;
        white-space: nowrap;

        .display-in{
            display:inline-block;
            text-align: center;
            margin-left:3px;
        }
        .big-legend-left{
            margin-left:0px;
        }
        .big-legend-right{
            margin-left:49px;
        }
        .legend-right {
            border-radius: 0 20% 20% 0/0 50% 50% 0;
            background-size: 50% 50%;
            background-repeat: no-repeat;
            display: inline-block;
            width: 44px;
            height: 14px;
            margin: 0px 0px 0px -9px;
            text-align: center;
            background: linear-gradient(135deg, transparent 12px, #4aa9f3 0);
            line-height: 15px;

            .port-label{
                margin-left: 12px;
            }
        }
        .legend-left {
            border-top-right-radius: 0px;
            border-top-left-radius: 20% 50%;
            border-bottom-left-radius: 20% 50%;
            border-bottom-right-radius: 0px;
            background-size: 50% 50%;
            background-repeat: no-repeat;
            display: inline-block;
            background: linear-gradient(-45deg, transparent 12px, #4aa9f3 0);
            width: 44px;
            height: 14px;
            text-align: center;
            line-height: 15px;
            margin-right: -10px;

        .port-label{
                margin-left: -7px;
            }
        }
        .port-none{
            height: 19px;
            display: inline-block;
            margin: 2px 1px;
        }
        .p-size-small{
            font-size: 10px;
            line-height: 11px;
            vertical-align: text-top;
        }
        .port-label{
            margin-left: -8px;
            color: #fff;
        }
        .module{
            padding: 3px 1px;
            border-left: 1px solid #929292;
            border-right: 1px solid #929292;
            height: 9px;
        }

        .module-top{
            border-radius: 5px 5px 0 0;
            padding: 0 4px 0 2px;
            border: 1px solid #929292;
            height: 23px;
        }

        .module-middle{
            padding: 0 4px 0 2px;
            border: 1px solid #929292;
            height: 23px;
        }

        .module-bottom{
            border-radius: 0 0 5px 5px;
            height:23px;
            padding: 0 4px 0 2px;
            border: 1px solid #929292;
        }
        .fa-style{
            width: 24px;
            text-align: center;
            display: inline-block;
        }
        .fa-color{
            color:#929292;
        }
        .fa-margin-left-2{
            margin-left:2px;
        }
        .port-margin-left-o{
            margin-left:-2px;
        }
        .connect{
            background: rgb(85, 197, 255);
            border: 2px solid #4899bd;
        }
        .available{
            background: #2ACF84;
            border: 2px solid #26B072;
        }
        .unavailable{
            background: #9D9D9D;
            border: 2px solid #7B7B7B;
        }
        .linkup{
            background: #2ACF84;
            border: 2px solid #26B072;
        }
        .disable{
            background: #9D9D9D;
            border: 2px solid #7B7B7B;
        }
        .linkdown{
            background: #9D9D9D;
            border: 2px solid #7B7B7B;
        }
        .down{
            background: #9D9D9D;
            border: 2px solid #7B7B7B;
        }

        .select {
            border: 2px solid #fff;
        }

        .big-port-rectangle{
            width: 72px;
            height: 15px;
            border-radius: 3px;
            display: inline-block;
            margin: 2px 1px;
            cursor: pointer;
        }

        .port_rectangle{
            width: 20px;
            height: 15px;
            border-radius: 3px;
            display: inline-block;
            cursor: pointer;
            margin: 2px 2px;
        }

        .port_square{
            width: 15px;
            height: 15px;
            border-radius: 3px;
            display: inline-block;
            margin: 2px 2px;
            cursor: pointer;
        }
    }
}

</style>
