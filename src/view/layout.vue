<template>
	<el-container>
		<sideBar :sideBarHeight="sideBarHeight" :sideBarWidth="sideBarWidth"></sideBar>
		<el-container>
			<el-header height="48">
				<navBar></navBar>
				<visitTags></visitTags>
			</el-header>
			<el-main>
				<transition name="fade-transform" mode="out-in">
					<keep-alive :include="keepAliveMenu">
					<router-view :mainContentHeight="mainContentHeight"></router-view>
					</keep-alive>
				</transition>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import sideBar from './sideBar/sideBar'
	import navBar from './navBar/navBar'
	import visitTags from './visitTags/visitTags'
	
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
				mainContentHeight:defaultClientHeight-200,
				keepAliveMenu:"newsAdd",
			}
		},
		components:{sideBar,navBar,visitTags},
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
				this.mainContentHeight=this.screenHeight-210;
			},
			screenWidth(val){
				this.sideBarWidth=val;
			}
		}
	}
</script>

<style lang="stylus" scoped="scoped">
	.el-header
		border-bottom:1px solid #DCDCDC
		padding:0px

	.el-main
		margin:5px
		padding:0px
		background-color: #fff
		overflow: hidden
		position: relative	
	
	.fade-transform-leave-active,
	.fade-transform-enter-active 
		transition: all .3s
	
	.fade-transform-enter 
		opacity: 0
		transform: translateX(-30px)
	

	.fade-transform-leave-to 
		opacity: 0
		transform: translateX(30px)
	
</style>