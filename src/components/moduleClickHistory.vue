<template>
	<el-col :xs="24" :sm="24" :md="24" :lg="24" id="moduleClickHistory">
		<span class="visitorTag" v-for="item in routerHistory">
			<a :class="'routerTags '+item.active" @click="goto(item.routerPath,$event)">{{item.moduleItemName}}
			<span v-if="item.routerPath!=''">
				<i class="el-icon-close"  v-on:click="deleteVisitor(item.moduleItemName)"></i>
			</span>
			</a>
		</span>
	</el-col>
</template>

<script>
	export default{
		name:"clickHistory",
		data:function(){
			return {
				routerHistory:this.visitList,
			}
		},
		props:['visitList'],
		methods:{
			deleteVisitor(closeItemName){
				for(var i=0;i<this.routerHistory.length;i++){
					var item = this.routerHistory[i];
					if(closeItemName == item.moduleItemName){
						this.routerHistory.splice(i,1);
					};
				};
			},
			goto(routerP,e){
				this.$router.push("/"+routerP);				
			}
		},
		watch:{			
			visitList(val){				
				this.routerHistory=val;
			}
		}		
	}
</script>

<style>
	#moduleClickHistory{margin-top:-1px;}
	#moduleClickHistory>.visitorTag:hover{background-color:#42B983;opacity: 1;cursor: pointer;}
	#moduleClickHistory>.visitorTag>.routerTags{color:transparent;color:#fff;line-height:2;text-decoration: none;padding:6px 10px;background-color:#42B983;font-size: 12px;display:inline-block;margin:5px;opacity: 0.8;}
	#moduleClickHistory>.visitorTag i{margin-left:10px;width:16px;height:16px;border-radius:50%;color:#fff;cursor:pointer;text-align: center;line-height:16px;font-size:12px}
	#moduleClickHistory>.visitorTag i:hover{background-color:#fafafa;color:#333}
	
	#moduleClickHistory>.visitorTag>.active{background-color:#42B983;opacity: 1;}
</style>