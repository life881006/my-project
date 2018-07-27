<template>
	<el-container>
		<sideBar></sideBar>
		
		<el-container>
			<el-header height="48">
				<navBar></navBar>
			</el-header>
			<el-main>
				<viewTags></viewTags>
				<mainContent></mainContent>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import sideBar from './sideBar/sideBar'
	import navBar from './navBar/navBar'
	import viewTags from './viewTags/viewTags'
	import mainContent from './main/main.vue'
	
	export default{
		name:'layout',
		data: function(){
			return {}
		},
		components:{sideBar,navBar,viewTags,mainContent},
		created:function(){
		
		}
	}
</script>

<style scoped="scoped">
	.el-header{border-bottom:1px solid #DCDCDC;}
</style>