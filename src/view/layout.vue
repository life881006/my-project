<template>
	<el-container>
		<sideBar :sideBarHeight="sideBarHeight" :sideBarWidth="sideBarWidth"></sideBar>
		<el-container>
			<el-header height="48">
				<navBar></navBar>
				<visitTags></visitTags>
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
	import visitTags from './visitTags/visitTags'
	
	const defaultClientWidth = document.documentElement.clientWidth;
	const defaultClientHeight = document.documentElement.clientHeight;
	
	export default{
		name:'layout',
		beforeCreate:function(){
			const userObj = JSON.parse(sessionStorage.getItem("user"));
			if(userObj===null){
				this.$router.push("/login");
			}
		},
		data: function(){
			return {
				screenWidth:defaultClientWidth,
				screenHeight:defaultClientHeight,
				sideBarWidth:defaultClientWidth,
				sideBarHeight:defaultClientHeight,
				mainContentHeight:defaultClientHeight-230
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
				this.mainContentHeight=this.screenHeight-230;
			},
			screenWidth(val){
				this.sideBarWidth=val;
			}
		}
	}
</script>

<style scoped="scoped">
	.el-header{border-bottom:1px solid #DCDCDC;padding:0px}
	.el-header >>> .visitTagContainer{clear:both;border-top:1px solid #dcdcdc;height:30px;line-height:28px;overflow:hidden;position:relative;white-space: nowrap;}
	.el-header >>> .visitTags{position:absolute}
	.el-header >>> .visitTags .routerTags{display:inline-block;margin:0px 5px;color:#000;line-height:2;text-decoration: none;padding:2px 10px;border:1px solid #ddd;font-size: 12px;opacity: 0.6;}
	.el-header >>> .visitTags .routerTags:hover{cursor: pointer;}
	.el-header >>> .visitTags .routerTags i{margin-left:10px;color:#666;cursor:pointer;text-align: center;line-height:16px;font-size:10px;}
	.el-header >>> .visitTags .active{background-color:#42B983;opacity: 1;color:#fff;border:0px}
	.el-header >>> .visitTags .active i{color:#fff}
	.el-main{padding:15px;background-color: fafafa;}
</style>