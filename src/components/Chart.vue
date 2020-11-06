<template>
	<div :id="name"></div>
</template>

<script type="text/javascript">
import echarts from 'echarts'

export default {
	name: 'Chart',
	props: [ 'option', 'name', 'width', 'height' ],
	data () {
		return {
			myChart: null,
			opt: {}
		}
	},	
	watch:{
		option () {
			if(this.myChart != null) {
				this.myChart.clear();
			}
			this.draw();	
		},
		width () {
			if(this.myChart != null) {
				this.myChart.resize({width: this.width});
			}
		}
	},
	mounted () {
		this.$nextTick(() => {
			document.getElementById(this.name).style.height = this.height;
		    document.getElementById(this.name).style.width = this.width;
		    this.draw();	
		})		
	},
	methods: {
		draw () {
			this.myChart = null;
            this.opt = this.option;
            if ( this.myChart == null ) {
			    this.myChart = echarts.init(document.getElementById(this.name));
            }                
	        this.myChart.setOption(this.option);
		}
	}
}
</script>