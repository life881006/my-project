<template>
	<el-col :xs="24" :sm="24" :md="24" :lg="24" id="moduleClickHistory">
		<span class="visitorTag" v-for="item in history">
			<router-link class="routerTags" :to="{path:item.routerPath}">{{item.moduleItemName}}</router-link><i class="el-icon-close" v-on:click="deleteVisitor(item.moduleItemName)"></i>
		</span>
	</el-col>
</template>

<script>
	let historyList = [];
	export default{
		name:"clickHistory",
		data:function(){
			return {
				history:historyList,
			}
		},
		props:['routerPath','moduleItemName'],
		methods:{
			deleteVisitor(closeItemName){
				for(var i=0;i<historyList.length;i++){
					var item = historyList[i];
					if(closeItemName == item.moduleItemName){
						historyList[i].moduleItemName = "";
						historyList[i].routerPath = "";
					};
				};
			}
		},
		watch:{			
			routerPath(val){
				this.routerPath=val;
				var obj={};
				obj.routerPath = this.routerPath;
				obj.moduleItemName = this.moduleItemName;
				historyList.push(obj);
				console.log(historyList);
			}
		}		
	}
</script>

<style>
	#moduleClickHistory{margin-top:-1px;}
	#moduleClickHistory>.visitorTag{padding:6px 10px;background-color:#42B983;font-size: 12px;display:inline-block;margin:5px}
	#moduleClickHistory>.visitorTag>.routerTags{color:transparent;color:#fff;line-height:2;text-decoration: none;}
	#moduleClickHistory>.visitorTag i{margin-left:10px;width:16px;height:16px;border-radius:50%;color:#fff;}
</style>