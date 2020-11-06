<template>
    <chart :name="'radar'" :option="option" :width="width" :height="height"></chart>
</template>

<script type="text/javascript">
import Chart from './Chart'
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  name: 'KpiOverview',
  mixins: [resize],
  components: { Chart },
  props: {
    width: {
      type: String,
      default: '260px'
    },
    height: {
      type: String,
      default: '260px'
    },
    chartData: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      option: {}
    }
  },
  watch: {
    chartData () {
      console.log('this.chartData:', this.chartData)
      this.draw(this.chartData)
    }
  },
  created () {
    var _self = this
    this.$nextTick(() => {
      console.log('in created this.chartData:', _self.chartData)

      _self.initChart()
    })
  },
  methods: {
    // initData () {
    // 	var _self = this;
    // 	fetchHeath().then(response => {
    // 		_self.dataList = [resData.interface,
    //                 resData.warning,
    //                 resData.bandwidth,
    //                 resData.disk,
    //                 resData.cpu,
    //                 resData.memory,
    //                 resData.temprature ];
    // 	}).then(function() {
    //         _self.draw(_self.dataList);
    //     })
    // },
    initChart () {
      this.chart = echarts.init(this.$el)
      this.draw(this.chartData)
    },
    draw (data) {
      this.option = {
        backgroundColor: 'rgba(0,0,0,0)',
        normal: {
          top: 200,
          left: 300,
          width: 500,
          height: 400,
          zIndex: 6,
          backgroundColor: ''
        },
        color: ['rgba(245, 166, 35, 1)', 'rgba(19, 173, 255, 1)'],
        title: {
          show: true,
          text: '全网不健康设备数量雷达图',
          left: 'center',
          top: '1%',
          textStyle: {
            fontSize: '100%',
            color: '#fff',
            fontStyle: 'normal',
            fontWeight: 600
          }
        },
        tooltip: {
          show: true,
          trigger: 'item'
          // "formatter": "{a},{d}:{c}台"
        },
        radar: {
          center: ['49%', '53%'],
          radius: '55%',
          startAngle: 90,
          splitNumber: 4,
          shape: 'circle',
          splitArea: {
            areaStyle: {
              color: ['transparent']
            }
          },
          axisLabel: {
            show: false,
            fontSize: 18,
            color: '#fff',
            fontStyle: 'normal',
            fontWeight: 'normal'
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#fff'//
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#fff'//
            }
          },
          indicator: [{
            name: '端口异常设备'
          }, {
            name: '告警异常设备'
          }, {
            name: '带宽异常设备'
          }, {
            name: '硬盘异常设备'
          }, {
            name: 'CPU异常设备'
          }, {
            name: '内存异常设备'
          }, {
            name: '温度异常设备'
          }]
        },
        series: [{
          name: '异常设备数',
          type: 'radar',
          symbol: 'circle',
          symbolSize: 10,
          areaStyle: {
            normal: {
              color: 'rgba(245, 166, 35, 0.4)'
            }
          },
          itemStyle: {
            color: 'rgba(245, 166, 35, 1)',
            borderColor: 'rgba(245, 166, 35, 0.3)',
            borderWidth: 5
          },
          lineStyle: {
            normal: {
              type: 'dashed',

              color: 'rgba(245, 166, 35, 1)',
              width: 2
            }
          },
          data: [{
            value: data,
            name: '全网不健康设备数'
          }]
        }]
      }
    }
  }
}
</script>
