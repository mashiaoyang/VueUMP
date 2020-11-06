<template>
    <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  name: 'ColumChart',
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '400px'
    },
    chartData: {
      type: Object,
      required: true,
      default () {
        return {
          title: '',
          xData: [],
          yData: [],
          color: [], // 如果不传则使用默认的颜色
          direction: 1 // 0: virtical; 1: horizontal
        }
      }
    }
  },
  watch: {
    chartData: {
      handler: function (val, oldVal) {
            	this.initChart()
      },
      deep: true
    }
  },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart () {
		    let option = {}
      this.chart = echarts.init(this.$el)
      if (this.chartData.hasOwnProperty('options') && (Object.keys(this.chartData.options)).length > 0) {
        option = this.chartData.options
      } else {
			    if (!this.chartData.yData) { var yData = [] } else { var yData = this.chartData.yData }
        if (!this.chartData.title) { var title = '' } else { var title = this.chartData.title }
        if (!this.chartData.xData) { var xData = [] } else { var xData = this.chartData.xData }
        var xAxis = [
          {
            type: 'value',
            axisLabel: {
              textStyle: {
                color: '#fff'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            }
          }
        ]
        var yAxis = [
          {
            type: 'category',
            data: xData,
            axisLabel: {
              show: true
            },
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            splitNumber: 10,
            position: 'bottpm'
          }
        ]
        option = {
          title: {
            show: true,
            text: title,
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
            trigger: 'axis'
          },
          calculable: true,
          grid: {
            // top: '5%',
            left: '2%',
            right: '5%',
            // bottom: '20%',
            containLabel: true
          },
          series: [
            {
              // name:'告警数',
              type: 'bar',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#83bff6'},
                      {offset: 0.5, color: '#188df0'},
                      {offset: 1, color: '#188df0'}
                    ]
                  )
                },
                emphasis: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      {offset: 0, color: '#2378f7'},
                      {offset: 0.7, color: '#2378f7'},
                      {offset: 1, color: '#83bff6'}
                    ]
                  )
                }
              },
              data: yData
            }
          ]
        }
        if (this.chartData.direction == 1) {
          option.xAxis = xAxis
          option.yAxis = yAxis
        } else if (this.chartData.direction == 0) {
          option.xAxis = yAxis
          option.yAxis = xAxis
        }
      }

      this.chart.setOption(option)
    }
  }
}
</script>
