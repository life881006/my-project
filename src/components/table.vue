<template>
	<router-view :tHeight="tableHeight">
		
	</router-view>
</template>

<script>
	export default{
		data:function(){
			return {
				tHeight:this.tableHeight+"px"
			}
		},
		created:function(){
			
		},
		props:['tableHeight'],
		watch:{
			tableHeight(val){
				this.tHeight = val;
			}
		}
	}
</script>

<style type="text/css">
	

</style>