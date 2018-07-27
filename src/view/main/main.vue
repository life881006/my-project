<template>
	<router-view></router-view>
</template>

<script>
	export default{
		data:function(){
			return {
				tHeight:this.tableHeight+"px"
			}
		},
		created:function(){
			console.log("aaaa");
		},
		props:[],
		watch:{
			
		}
	}
</script>

<style type="text/css">
	

</style>