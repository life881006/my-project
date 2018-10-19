<template>
	<div id="homePage" >
		<div :style="{height:mainTableHeight+'px',overflow:'auto'}">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	export default {
		name: "homePage",
		data: function() {
			return {
				mainTableHeight:this.mainContentHeight
			}			
		},
		props:["mainContentHeight"],
		mounted(){
			
		}
	}
</script>

<style>
</style>