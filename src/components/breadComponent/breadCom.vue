<template>
	<el-breadcrumb separator="/" class="breadStyle">
		<el-breadcrumb-item :to="{ name: 'home' }">首页</el-breadcrumb-item>
		<el-breadcrumb-item :to="{ name: item.name }" v-for="item in breadList" :key="item.path">{{item.meta.title}}</el-breadcrumb-item>
	</el-breadcrumb>
</template>

<script>
	export default {
		name:"breadCp",
		data(){
			return {
				breadList:[],
			}
		},		
		beforeCreate(){

		},
		mounted(){
			this.breadList = this.$route.matched;
		},
		props : [''],
		mixins : [],
		components : {},
		methods : {
		
		},
		watch : {
			
		},
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.breadStyle
		padding:10px 20px
</style>