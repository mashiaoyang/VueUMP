<template>
    <div :class="className" :style="{height:height,width:width}" />
</template>

<script type="text/javascript">
import echarts from 'echarts'
import { bytesToSize, financial } from '@/utils'
import resize from './mixins/resize'

export default {
  name: 'GradientLineChart',
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
          data1: {},
          data2: {},
          color: [] // 如果不传则使用默认的颜色
        }
      }
    }
  },
  watch: {
    'chartData.xData' (val, oldVal) {
      this.initChart()
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
      this.chart = echarts.init(this.$el)
      var statsType = 'dbm'
      if (this.chartData.data1.name.indexOf('bps') >= 0) {
        statsType = 'bps'
      }
      if (this.chartData.data1.name.indexOf('pps') >= 0) {
        statsType = 'pps'
      }

      this.chart.setOption({
        title: {
          show: true,
          text: this.chartData.title,
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
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        legend: {
          top: 20,
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          // data: ['CMCC', 'CTCC', 'CUCC'],
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: '#00fdff'
          }
        },
        grid: {
          top: '14%',
          left: '2%',
          right: '6%',
          bottom: '12%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            textStyle: {
              color: '#00fdff'
            },
            formatter: function (params) {
              return params.split(' ')[0] + '\n' + params.split(' ')[1]
            }
          },
          axisLine: {
            lineStyle: {
              color: '#00fdff'
            }
          },
          data: this.chartData.xData
        },
        yAxis: {
          type: 'value',
          max: function (value) {
            var maxV = 100
            if (value.max !== 0) {
              maxV = value.max
            }
            return maxV
          },
          boundaryGap: false,
          splitLine: {
            lineStyle: {
              color: '#0fb0a8'
            }
          },
          axisLine: {
            lineStyle: {
              color: '#00fdff'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#00fdff'
            },
            formatter: function (data) {
              if (statsType === 'dbm') {
                return financial(data)
              } else {
                return bytesToSize(data)
              }
            }
          }
        },
        series: [{
          name: this.chartData.data1.name,
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(0, 253, 255, 0.3)'
              }, {
                offset: 0.8,
                color: 'rgba(0, 253, 255, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(0, 253, 255)',
              borderColor: 'rgba(0, 253, 255,0.27)',
              borderWidth: 12

            }
          },
          data: this.chartData.data1.values // [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122]
        },
        {
          name: this.chartData.data2.name,
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(219, 50, 51, 0.3)'
              }, {
                offset: 0.8,
                color: 'rgba(219, 50, 51, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(219,50,51)',
              borderColor: 'rgba(219,50,51,0.2)',
              borderWidth: 12
            }
          },
          data: this.chartData.data2.values // [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122]
        }]
      })
    },
    kbpsFormat (a) {
      var val = +a
      if (isFinite(val)) {
        if (val >= 1000) {
          var unitObj = bytesToSize(val, 0)
          val = echarts.format.addCommas(unitObj.val) + unitObj.unit
        }
      }
      // 无单位的情况下增加单位
      if (/\D/.test(val + '') === false) {
        val = val + 'K'
      }
      return val
    },
    dbmFormat (a) {
      return financial(a)
    }
  }
}
</script>

<style scoped>
</style>
