<template>
	<div id="homePage" >
		<div :style="{height:mainTableHeight+'px',overflow:'auto'}">
			<router-view></router-view>
			<div id="mainTable"></div>


		</div>
	</div>
</template>

<script>
	const echarts = require('echarts/lib/echarts');

	require('echarts/lib/chart/bar');
	require('echarts/lib/component/tooltip');
	require('echarts/lib/component/title');

	export default {
		name: "homePage",
		data: function() {
			return {
				mainTableHeight:this.mainContentHeight,
				chart:{}
			}			
		},
		props:["mainContentHeight"],
		mounted(){
			this.initCharts();
		},
		methods:{
			initCharts(){
			    this.setOptions();
			},
			setOptions() {
				echarts.init(document.getElementById("mainTable")).setOption({
					title: {
						text: 'ECharts 入门示例'
					},
					tooltip: {},
					xAxis: {
					data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
					},
					yAxis: {},
					series: [{
						name: '销量',
						type: 'bar',
						data: [5, 20, 36, 10, 10, 20]
					}]
				})
			}
		}
	}
</script>

<style type="stylesheet/stylus" lang="stylus">
	#mainTable
		width:300px
		height:250px
		margin-left:20px
</style>