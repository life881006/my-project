<template>
	<div id="visitTags">
		<span class="visitorTag" v-for="item in routerHistory">
			<a :class="'routerTags '+item.active" @click="goto(item.routerPath)">{{item.itemName}}
			<span v-if="item.routerPath!=''">
				<i class="el-icon-close"  v-on:click.stop.prevent="deleteVisitor(item.itemName)"></i>
			</span>
			</a>
		</span>
	</div>
</template>

<script>
	export default{
		name:"visitTags",
		data:function(){
			return {
				routerHistory:global.visitTagsList,
			}
		},
		created:function(){
			
		},
		props:['visitList'],
		methods:{
			deleteVisitor(closeItemName){
				let temporaryHistory = global.visitTagsList;
				for(let i=0;i<temporaryHistory.length;i++){
					let item = temporaryHistory[i];
					if(closeItemName == item.itemName){
						temporaryHistory.splice(i,1);
						break;
					};
				};
				global.visitTagsList = [];
				for(let i=0;i<temporaryHistory.length;i++){
					global.visitTagsList.push(temporaryHistory[i]);
				}
				this.routerHistory = global.visitTagsList;
				console.log(global.visitTagsList);
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
				this.$router.push(routerP);
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
	#visitTags{height:40px;border-top:1px solid #DCDCDC}
	#visitTags>.visitorTag{display:inline-block;margin:-20px 5px 5px;}
	#visitTags>.visitorTag:hover{cursor: pointer;}
	#visitTags>.visitorTag>.routerTags{color:#000;line-height:2;text-decoration: none;padding:6px 10px;border:1px solid #ddd;font-size: 12px;opacity: 0.6;}
	#visitTags>.visitorTag i{margin-left:10px;color:#666;cursor:pointer;text-align: center;line-height:16px;font-size:10px;}
	#visitTags>.visitorTag>.active{background-color:#42B983;opacity: 1;color:#fff;border:0px}
	#visitTags>.visitorTag>.active i{color:#fff}
</style>