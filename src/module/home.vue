<template>
	<div id="homePage" >
		<div :style="{height:mainTableHeight+'px',overflow:'auto'}">
			3<br>1<br>3<br>1<br>3<br>1<br>3<br>1<br>3<br>1<br>3<br>1<br>3<br>1<br>3<br>1<br>3<br>1<br>3<br>1<br>3<br>1<br>3<br>1<br>3<br>1<br>3<br>1<br>3<br>1<br>
			3<br>1<br>3<br>1<br>3<br>1<br>3<br>1<br>3<br>1<br>3<br>1<br>3<br>1<br>3<br>1<br>3<br>1<br>3<br>1<br>
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