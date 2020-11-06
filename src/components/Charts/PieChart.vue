<template>
    <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  name: 'PieChart',
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
          legend: [], // 如果不传入则默认都data中的name值
          color: [], // 如果不传则使用默认的颜色
          data: []
        }
      }
    }
  },
  watch: {
    'chartData.data' () {
      console.log('i am in deep watch data')
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
      if (!this.chartData.data) { var data = [] } else { var data = this.chartData.data }
      if (!this.chartData.title) { var title = '' } else { var title = this.chartData.title }
      if (!this.chartData.legend) { var legend = [] } else { var legend = this.chartData.legend }
      if (!this.chartData.color) {
        var color = ['#2f8ee0', '#ffbb44', '#f24734']
      } else {
        var color = this.chartData.color
      }
      this.chart = echarts.init(this.$el)
      var i = 0
      var pushFg = (legend.length === 0) // legend如果组件外不传值进来就默认去data中的name
      for (i = 0; i < data.length; i++) {
        if (pushFg) {
          legend.push(data[i].name)
        }
        data[i].itemStyle = {}
        data[i].itemStyle.color = color[i]
      }
      		this.chart.setOption({
			    backgroundColor: 'rgba(0,0,0,0)',
			    title: {
			        text: title,
			        left: '5%',
			        top: '1%',
			        textStyle: {
			            fontSize: '90%',
			            color: '#fff',
			            fontStyle: 'normal',
            fontWeight: 200,
            fontFamily: 'sans-serif'
			        }
			    },
			    //  legend: {
			    //     data: legend,
			    //     bottom: 8,
			    //     textStyle: {
			    //         color: '#fff',
			    //     }
			    // },
			    tooltip: {
			        trigger: 'item',
			        formatter: '{b} : {c} ({d}%)'
			    },
			    series: [{
			        type: 'pie',
			        radius: '70%',
			        center: ['49%', '53%'],
			        data: data,
			        label: {
            show: false,
            position: 'center'
		                // normal: {
		                //     position: 'outside',
		                //      formatter: "{d}%"
		                // }
		            },

			        labelLine: {
			            normal: {
			                lineStyle: {
			                    color: 'rgb(98,137,169)'
			                },
			                smooth: 0.2,
			                length: 3,
			                length2: 5
			            }
			        }

			    }]
      })
    }
  }
}
</script>
