<template>
	<div class="row col-12" style="margin-bottom: 15px;">
		<component :is="devShape" :disableMode="disableMode"
			:boards="boards" :doubleMode="doubleMode" :selectedBoard="selectedBoard"
			@selectport="selectPort" @selectboard="selectBoard"
			@selectportName="selectportName"
			:selectedPort="selectedPort" @finishMounted="finishMounted" >
		</component>
	</div>
</template>
<script type="text/javascript">
import stack from '@/components-v2/BoardCharts/AtcaBoard'
import box from '@/components-v2/BoardCharts/BoxShow'
import cascade from '@/components-v2/BoardCharts/CascadeShow'
import cascadeMsg from '@/message/cascade-msg.js'
import { mapState } from 'vuex'
export default {
  name: 'ShowBoard',
  // components: { SingleBox, MultiBoard,CascadeBoard },
  components: { stack, box, cascade },
  computed: {
    ...mapState({
      interfaceList: state => state.device.interfaceList
    })
  },
  props: {
    eqptId: {
      type: String,
      default: ''
    },
    portId: {
      type: String,
      default: ''
    },
    disableMode: { // 查看模式
      type: Boolean,
      default: false
    }
  },
  data () {
    Array.prototype.flat = function (count) {
      let c = count || 1
      let len = this.length
      let exe = []
      if (this.length == 0) return this
      while (c--) {
        let _arr = []
        let flag = false
        if (exe.length == 0) {
          flag = true
          for (let i = 0; i < len; i++) {
            if (this[i] instanceof Array) {
              exe.push(...this[i])
            } else {
              exe.push(this[i])
            }
          }
        } else {
          for (let i = 0; i < exe.length; i++) {
            if (exe[i] instanceof Array) {
              flag = true
              _arr.push(...exe[i])
            } else {
              _arr.push(exe[i])
            }
          }
          exe = _arr
        }
        if (!flag && c == Infinity) {
          break
        }
      }
      return exe
    }
    return {
      devShape: '',
      boards: null,
      ifAlways: 1,
      doubleMode: true,
      selectedBoard: '',
      selectedPort: '',
      stId: 0
    }
  },
  watch: {
    eqptId () {
      this.init(1)
    },
    portId (val) {
      if (this.selectedPort) {
        var tmp = this.selectedPort.split('-')
        if (val != tmp[1]) {
          tmp.splice(1, 1, val)
          this.selectedPort = tmp.join('-')
        }
      }
    }
  },
  beforeDestroy () {
    this.ifAlways = 0
    clearTimeout(this.stId)
  },
  created () {
    this.init(0)
  },
  methods: {
    init (first) {
      if (first == 0) {
        this.initBoard(1, 1)
      } else {
        this.initBoard(0, 1)
      }
    },
    initBoard (interval, flag) {
      var _self = this
      cascadeMsg.getDevice(this.eqptId, 'type=0&&slot_id=-1', function (resData) {
        _self.boards = resData.devices
        _self.devShape = resData['shape']
        if (flag) {
          _self.setInterfaceList(_self.boards)
        }
      }, function () {
        if (_self.ifAlways && interval) {
          _self.stId = setTimeout(function () { _self.initBoard(1, 0) }, 5000)
        }
          	})
    },
    finishMounted () {
      this.selectedBoard = 'board' + this.boards[0].slot_id
      this.selectedPort = this.boards[0].slot_id + '-' + this.boards[0].module[0].colPorts[0][1][0].port_id
    },
    setInterfaceList (boards) {
      if (this.interfaceList.length > 1) {

      } else {
        var arr1 = boards.map(item => {
          return item.module[0].colPorts.map(col => {
            var tmpArray = []
            for (var i = 1; i < col.length; i++) {
              var tmp = col[i].map(port => {
                return {id: port.port_id, desc: port.name}
              })
              tmpArray = [...tmpArray, ...tmp]
            }
            return tmpArray
          })
        })
        var finalArr = arr1.flat(Infinity)
        finalArr.sort(function (a, b) {
          return a.id - b.id
        })

        this.$store.commit('device/SET_INTERFACE_LIST', finalArr)
        sessionStorage.setItem('interfaceList', JSON.stringify(finalArr.sort()))
      }
      this.$emit('finish')
    },
    selectportName (val) {
      this.$store.commit('device/SET_PORT', {name: val})
    },
    selectPort: function (val) {
      this.selectedPort = val
      this.$store.commit('device/SET_SLOT_ID', val.split('-')[0])
      this.$store.commit('device/SET_PORT', {id: val.split('-')[1]})
      this.$emit('selectport', val)
    },
    selectBoard: function (val) {
      this.selectedBoard = val
      this.$emit('selectboard', val)
    }
  }
}
</script>
