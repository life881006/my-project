<template>
	<el-col class="treeObj" :xs="5" :sm="5" :md="5" :lg="5">
		<div class="treeInner">	
			<h4 class="title">频道管理</h4>
			<!--展示树-->
			<el-scrollbar>
			<el-tree ref="elTree1" lazy :data="treeData" :props="defaultProps" :style="{height:tHeight}" @node-click="handleNodeClick" :load="loadNode" >
				
			</el-tree>
			</el-scrollbar>
		</div>
	</el-col>
</template>

<script>
	export default {
		
		data(){
			return {
				treeData: [],	
				tHeight:this.treeHeight,//树高
				defaultProps: {//树形结构默认设置
		          children: 'children',
		          label: 'label'
		        },
		        currentNodeIndex:"0",
			}
		},
		mounted() {			
			/*
			 * 获取树结构channels
			 * news.js
			 */
			this.loadChannelTree().then((data)=>{
				this.treeData = data;
			});
		},
		props:['treeHeight'],
		methods:{
			handleNodeClick(data) {//data ：节点数据
				this.$emit("refreshTableByTreeNode",data.index);
		    },
			loadNode(node, resolve) {//动态加载树结构子节点
				if(!this.$refs.elTree1){
					return false;
				}
				
				this.currentNodeIndex = this.$refs.elTree1.getCurrentNode().index;
				this.loadChannelTree().then((data)=>{
					if(data.length===0){
						resolve([]);
					}else{					
					    resolve(data);
					}
				});
		    },
			loadChannelTree(){
		    	/*
		    	 * 根据当前节点id获取树结构子节点
		    	 */
		    	return new Promise((resolve,reject)=>{
			    	let p = {};
			    	let unitId = this.user.unitId;
			    	p.sql = "SELECT a.id,a.name,a.pid,b.id AS childId FROM channel AS a LEFT JOIN channel AS b ON a.id = b.pid WHERE a.unitId = '"+unitId+"' AND a.pid = '"+this.currentNodeIndex+"' group by a.id ORDER BY a.serialNumber asc";
			    	
			    	this.axios({
			            method: 'post',
			            url: global.url_base,
			            data: this.getData("HX_API","/https/channel/queryForMap.do",p),
			            dataType: 'JSON'						 
			        }).then((result)=> {
			        	let resultData = result.data.data;
			        	let temporaryTree = [];
						for(let item of resultData){
							
							let temporaryTreeItem = {};
							temporaryTreeItem.index = item.id;
							temporaryTreeItem.label = item.name;
							temporaryTree.push(temporaryTreeItem);
						}
			        	resolve(temporaryTree);
			        }).catch((error)=> {
			        	console.log(error);
			        });
		    	});
		    }
			
		},
		watch:{
			treeHeight(val){
				this.tHeight = val;
			}
			
		}
		
	}
</script>

<style>
	
	.el-tree{background-color:inherit;padding:5px;}
	/*.treeObj{background-color: #fefefe;}*/
	.treeInner{margin:0px 20px 0px 10px;background-color: #FAFAFA;}
	.treeInner>.title{font-size:14px;padding:14px 0px 14px 20px;margin:0px;color:#333;font-weight:bolder;border-bottom:1px solid #ebeef5}
	
</style>