<template>
	<el-container>
		<sideBar :sideBarHeight="sideBarHeight" :sideBarWidth="sideBarWidth"></sideBar>
		<el-container>
			<el-header height="48">
				<navBar></navBar>
			</el-header>
			<el-main>
				<router-view :mainContentHeight="mainContentHeight"></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import sideBar from './sideBar/sideBar'
	import navBar from './navBar/navBar'
	
	const defaultClientWidth = document.documentElement.clientWidth;
	const defaultClientHeight = document.documentElement.clientHeight;
	
	export default{
		name:'layout',
		data: function(){
			return {
				screenWidth:defaultClientWidth,
				screenHeight:defaultClientHeight,
				sideBarWidth:defaultClientWidth,
				sideBarHeight:defaultClientHeight,
				mainContentHeight:defaultClientHeight-110
			}
		},
		components:{sideBar,navBar},
		mounted:function(){
			window.onresize = () => {
				return(() => {
					this.screenWidth = document.documentElement.clientWidth;
					this.screenHeight = document.documentElement.clientHeight;
				})()
			}
		},
		created:function(){
		
		},
		watch:{
			screenHeight(val){
				this.screenHeight=val;
				this.sideBarHeight=this.screenHeight;
				this.mainContentHeight=this.screenHeight-110;
			},
			screenWidth(val){
				this.sideBarWidth=val;
			}
		}
	}
</script>

<style>
</style>