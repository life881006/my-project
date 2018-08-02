<template>
	<el-container>
		<sideBar></sideBar>
		<el-container>
			<el-header height="48">
				<navBar></navBar>
			</el-header>
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import sideBar from './sideBar/sideBar'
	import navBar from './navBar/navBar'
	
	export default {
		name: "home",
		data: ()=>{
			return {
				
			}
		},
		components:{sideBar,navBar},
	}
</script>

<style>
</style>