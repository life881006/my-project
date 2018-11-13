<template>
	<div>
		<!--柱状图-->
		<div id="barChart" :style="{'width':chartWidth,'height':chartHeight}"></div>
	</div>
</template>

<script>
	//import * as echarts from 'echarts';
	let echarts = require('echarts');

	require('echarts/lib/chart/bar')
	require('echarts/lib/component/tooltip')
	require('echarts/lib/component/title')

	export default {
		name: "barChart",
		data: function() {
			return {
				chartWidth:this.chartSize.width+"px",
				chartHeight:this.chartSize.height+"px",
				title:this.chartData.title,
				xLineNames:this.chartData.xLineNames,
				cData:this.chartData.data
			}			
		},
		props:['chartSize','chartData'],
		mounted(){
			this.initCharts();
		},
		methods:{
			initCharts(){
			    this.setBarOptions();
			},
			setBarOptions() {
				echarts.init(document.getElementById("barChart")).setOption({
					title: {
						text: this.title
					},
					tooltip: { //弹窗组件

					},
					toolbox: { //可视化的工具箱
			            show: true,
			            feature: {
			                dataView: { //数据视图
			                    show: true
			                },
			                restore: { //重置
			                    show: true
			                },
			                dataZoom: { //数据缩放视图
			                    show: true
			                },
			                saveAsImage: {//保存图片
			                    show: true
			                },
			                magicType: {//动态类型切换
			                    type: ['bar', 'line']
			                }
			            }
			        },
					xAxis: {
						axisLabel:{
							interval:0,
						},
						data: this.xLineNames
					},
					yAxis: {},
					series: [{
						name: '销量',
						type: 'bar',
						data: this.cData
					}]
				})
			}
		}
	}
</script>

<style type="stylesheet/stylus" lang="stylus">
	#barChart
		margin-left:20px
</style>