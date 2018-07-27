<template>
	<div id="moduleClickHistory">
		321321
		<span class="visitorTag" v-for="item in routerHistory">
			<a :class="'routerTags '+item.active" @click="goto(item.routerPath)">{{item.moduleItemName}}
			<span v-if="item.routerPath!=''">
				<i class="el-icon-close"  v-on:click.stop.prevent="deleteVisitor(item.moduleItemName)"></i>
			</span>
			</a>
		</span>
	</div>
</template>

<script>
	export default{
		name:"viewTags",
		data:function(){
			return {
				routerHistory:this.visitList,
			}
		},
		props:['visitList'],
		methods:{
			deleteVisitor(closeItemName){
				let temporaryHistory = this.routerHistory;
				for(let i=0;i<temporaryHistory.length;i++){
					let item = this.routerHistory[i];
					if(closeItemName == item.moduleItemName){
						temporaryHistory.splice(i,1);
						break;
					};
				};
				this.routerHistory = [];
				for(let i=0;i<temporaryHistory.length;i++){
					this.routerHistory.push(temporaryHistory[i]);
				}
			},
			goto(routerP){
				let Items = this.routerHistory.map(function(item){
					if(routerP == item.routerPath){
						item.active = "active";
					}else{
						item.active = "";
					}
					return item;
				});
				this.routerHistory = Items;
				this.$emit("visitList",this.routerHistory)
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
	#moduleClickHistory{margin-top:-1px;clear:both}
	#moduleClickHistory>.visitorTag{display:inline-block;margin:5px;}
	#moduleClickHistory>.visitorTag:hover{cursor: pointer;}
	#moduleClickHistory>.visitorTag>.routerTags{color:#000;line-height:2;text-decoration: none;padding:6px 10px;border:1px solid #ddd;font-size: 12px;opacity: 0.6;}
	#moduleClickHistory>.visitorTag i{margin-left:10px;color:#666;cursor:pointer;text-align: center;line-height:16px;font-size:10px;}
	#moduleClickHistory>.visitorTag>.active{background-color:#42B983;opacity: 1;color:#fff;border:0px}
	#moduleClickHistory>.visitorTag>.active i{color:#fff}
</style>