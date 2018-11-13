<template>
	<div>
		<!--饼图-->
		<div id="pieTable"></div>
	</div>
</template>

<script>
	//import * as echarts from 'echarts';
	let echarts = require('echarts');

	require('echarts/lib/chart/pie')
	require('echarts/lib/component/tooltip')
	require('echarts/lib/component/title')

	export default {
		name: "pieTable",
		data: function() {
			return {
			}			
		},
		props:[],
		mounted(){
			this.initCharts();
		},
		methods:{
			initCharts(){
			    this.setPieOptions();
			},
			setPieOptions(){
				echarts.init(document.getElementById("pieTable")).setOption({
					title: {
						text: 'ECharts 入门示例'
					},
					tooltip: {},
					series: [{
						name: '销量',
						type: 'pie',
						radius : '55%',//pie必须参数，
            			center: ['50%', '50%'],
            			labelLine:{
            				normal:{
            					length:5,
            					length2:5
            				}
            			},
						data: [
						{name:"衬衫",value:5},
						{name:"羊毛衫",value:20},
						{name:"雪纺衫",value:36},
						{name:"裤子",value:10},
						{name:"高跟鞋",value:10},
						{name:"袜子",value:20},
						],
					}]
				})
			}
		}
	}
</script>

<style type="stylesheet/stylus" lang="stylus">
	#pieTable
		width:350px
		height:250px
		margin-left:20px
</style>