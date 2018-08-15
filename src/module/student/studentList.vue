<template>	
	<div class="mainTableArea">
		<el-row class="search">
			<el-col :xs="23" :sm="23" :md="23" :lg="23">
			<el-select size="small" ref="selectOption1" v-model="selectOptions" placeholder="请选择" @change="changeValue">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
			</el-select>
			<el-input size="small" placeholder="请输入内容" v-model="searchText" clearable >
				
			</el-input>
			<el-button size="small" type="primary" icon="el-icon-search">检索</el-button>
			</el-col>
			
			<el-col :xs="1" :sm="1" :md="1" :lg="1">
				<el-button size="small" type="primary" icon="el-icon-plus" @click="addPanel()"></el-button>
			</el-col>
		</el-row>
		<el-row>
			<el-col :xs="4" :sm="4" :md="4" :lg="4">
				<!--展示树-->
				<el-scrollbar>
				<el-tree :data="treeData" :props="defaultProps" :style="{height:treeHeight}" @node-click="handleNodeClick">
					
				</el-tree>
				</el-scrollbar>
			</el-col>
			<el-col :push="1" :xs="19" :sm="19" :md="19" :lg="19">
				<el-table 
					ref="multipleTable" 
					:height="mainTableHeight" 
					:data="tableData" 
					tooltip-effect="dark" 
					style="width: 100%" 
					@selection-change="handleSelectionChange" 
					:default-sort="{prop:'id',order:'ascending'}"
					>
					<el-table-column align="center" type="selection" width="55">
					</el-table-column>
					<el-table-column prop="serialNumber" sortable align="center" label="序号" width="100">
						<template slot-scope="scope">{{ scope.row.serialNumber }}</template>
					</el-table-column>
					<el-table-column prop="icon" align="center" label="荣誉图标" min-width="14%">
						<template slot-scope="scope">
							<img :src="scope.row.icon" min-width="80px" height="80px" />
						</template>
					</el-table-column>
					<el-table-column align="center" prop="name" label="名称" min-width="14%" show-overflow-tooltip>
					</el-table-column>
					<el-table-column align="center" prop="awardRule" label="规则" min-width="16%">
						<template slot-scope="scope">
							<span v-if="scope.row.awardRule==0">按排名</span>
							<span v-else="">按分值</span>
						</template>
					</el-table-column>
					<el-table-column align="center" label="取前几名" prop="ranking" min-width="12%">
			
					</el-table-column>
					<el-table-column align="center" label="起始值" prop="beginValue" min-width="12%">
			
					</el-table-column>
					<el-table-column align="center" label="结束值" prop="endValue" min-width="12%">
			
					</el-table-column>
					<el-table-column align="center" label="操作" min-width="12%">
						<template slot-scope="scope">
						<el-button size="mini" type="danger" @click="deleteThis(scope.$index,scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="paginationArea">
					<el-col :xs="8" :sm="8" :md="8" :lg="8">
						<el-button-group>
							<el-button type="danger" size="small">删除</el-button>
							<el-button type="primary" size="small">排序</el-button>
						</el-button-group>
						<el-dropdown trigger="click">
							<el-button size="small">审核</el-button>
							<el-dropdown-menu slot = "dropdown">
								<el-dropdown-item><a @click="aaa()"><i class="el-icon-erp-pass"></i> 审核通过</a></el-dropdown-item>
								<el-dropdown-item><a @click="bbb()"><i class="el-icon-erp-notPass"></i> 审核不通过</a></el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</el-col>
					<el-col :xs="16" :sm="16" :md="16" :lg="16">
						<div class="paginationComponent">
							<span>总计 {{tCount}} 条</span>
							<el-input id="everpageNumber" size="mini" :value="ePage" maxlength="5" @blur="setEveryPage">
								<template slot="prepend">每页/条</template>
							</el-input>
							<el-pagination 
						      @current-change="handleCurrentChange"
						      :current-page="cPage"
						      :page-size="ePage"
						      layout=" prev, pager, next, jumper"
						      :total="tCount">
						   </el-pagination>
					    </div>
					</el-col>
				</div>
			</el-col>
		</el-row>
		
		<!--弹框-->
		<el-dialog
		  title="提示"
		  :visible.sync="dialogVisible"
		  width="50%" 
		  top="3vh"
		  >
		  <!--:before-close="handleClose"-->
		  
		  <div class="dialogMain">
		 	<router-view :visibleAttr="dialogVisible"></router-view>
		  </div>
		  <!--
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		  </span>
		  -->
		</el-dialog>
	</div>
</template>

<script>
	
	import mainMethod from '@/components/mainMethod'//主表相关公有方法写在这里
	
	const pageInfo =  {
		"hasPrePage": false,
		"hasNextPage": false,
		"totalPage": 1,
		"beginIndex": 0,
		"currentPage": 1,
		"totalCount": 16,
		"everyPage":1,
	};
	const tableInfo = {
		"data": [{
			"serialNumber": 1,
			"endValue": 0,
			"isDeleted": 0,
			"name": "热爱班级星",
			"icon": "",
			"unitId": "c7e1370a-a3f4-4d6e-b513-ae18b1fa8d1e",
			"ranking": 3,
			"id": "1",
			"beginValue": 0,
			"awardRule": 0
		},{
			"serialNumber": 1,
			"endValue": 0,
			"isDeleted": 0,
			"name": "热爱班级星",
			"icon": "",
			"unitId": "c7e1370a-a3f4-4d6e-b513-ae18b1fa8d1e",
			"ranking": 3,
			"id": "2",
			"beginValue": 0,
			"awardRule": 0
		},{
			"serialNumber": 1,
			"endValue": 0,
			"isDeleted": 0,
			"name": "热爱班级星",
			"icon": "",
			"unitId": "c7e1370a-a3f4-4d6e-b513-ae18b1fa8d1e",
			"ranking": 3,
			"id": "3",
			"beginValue": 0,
			"awardRule": 0
		}, {
			"serialNumber": 2,
			"endValue": 0,
			"isDeleted": 0,
			"name": "举止文明星",
			"icon": "http://s1.jshuixue.com:8082/SAASClient/allWeb/huixue/pj_medalicon/2018/3/20180308120251_27.png",
			"unitId": "c7e1370a-a3f4-4d6e-b513-ae18b1fa8d1e",
			"ranking": 3,
			"id": "6e750c0d38a2403ba48523ab0c7b3f8d",
			"beginValue": 0,
			"awardRule": 0
		}, {
			"serialNumber": 3,
			"endValue": 3,
			"isDeleted": 0,
			"name": "学习勤奋星",
			"icon": "",
			"unitId": "c7e1370a-a3f4-4d6e-b513-ae18b1fa8d1e",
			"ranking": 3,
			"id": "4b080f4dae254158a658b91b42c71a73",
			"beginValue": 1,
			"awardRule": 0
		}, {
			"serialNumber": 4,
			"endValue": 3,
			"isDeleted": 0,
			"name": "做操认真星",
			"icon": "",
			"unitId": "c7e1370a-a3f4-4d6e-b513-ae18b1fa8d1e",
			"ranking": 3,
			"id": "150e6808ca2e40318f8be70ee9c05934",
			"beginValue": 1,
			"awardRule": 0
		}, {
			"serialNumber": 5,
			"endValue": 3,
			"isDeleted": 0,
			"name": "劳动积极星",
			"icon": "",
			"unitId": "c7e1370a-a3f4-4d6e-b513-ae18b1fa8d1e",
			"ranking": 3,
			"id": "a20687f683004f7aaec7a0fc966c70b01",
			"beginValue": 1,
			"awardRule": 0
		}, {
			"serialNumber": 6,
			"endValue": 3,
			"isDeleted": 0,
			"name": "遵守纪律星",
			"icon": "",
			"unitId": "c7e1370a-a3f4-4d6e-b513-ae18b1fa8d1e",
			"ranking": 3,
			"id": "94c328b66d0b465a84d1f7b7c2f87b801",
			"beginValue": 1,
			"awardRule": 0
		}, {
			"serialNumber": 7,
			"endValue": 10,
			"isDeleted": 0,
			"name": "保护环境星",
			"icon": "",
			"unitId": "c7e1370a-a3f4-4d6e-b513-ae18b1fa8d1e",
			"ranking": 0,
			"id": "53b212ca9df84d6c9edded8e3676a0c71",
			"beginValue": 5,
			"awardRule": 1
		},{
			"serialNumber": 1,
			"endValue": 0,
			"isDeleted": 0,
			"name": "热爱班级星",
			"icon": "",
			"unitId": "c7e1370a-a3f4-4d6e-b513-ae18b1fa8d1e",
			"ranking": 3,
			"id": "8b46697d43814fe4b63dea5996eeaf761",
			"beginValue": 0,
			"awardRule": 0
		}, {
			"serialNumber": 2,
			"endValue": 0,
			"isDeleted": 0,
			"name": "举止文明星",
			"icon": "http://s1.jshuixue.com:8082/SAASClient/allWeb/huixue/pj_medalicon/2018/3/20180308120251_27.png",
			"unitId": "c7e1370a-a3f4-4d6e-b513-ae18b1fa8d1e",
			"ranking": 3,
			"id": "1",
			"beginValue": 0,
			"awardRule": 0
		}, {
			"serialNumber": 3,
			"endValue": 3,
			"isDeleted": 0,
			"name": "学习勤奋星",
			"icon": "",
			"unitId": "c7e1370a-a3f4-4d6e-b513-ae18b1fa8d1e",
			"ranking": 3,
			"id": "32",
			"beginValue": 1,
			"awardRule": 0
		}, {
			"serialNumber": 4,
			"endValue": 3,
			"isDeleted": 0,
			"name": "做操认真星",
			"icon": "",
			"unitId": "c7e1370a-a3f4-4d6e-b513-ae18b1fa8d1e",
			"ranking": 3,
			"id": "14",
			"beginValue": 1,
			"awardRule": 0
		}, {
			"serialNumber": 5,
			"endValue": 3,
			"isDeleted": 0,
			"name": "劳动积极星",
			"icon": "",
			"unitId": "c7e1370a-a3f4-4d6e-b513-ae18b1fa8d1e",
			"ranking": 3,
			"id": "4214",
			"beginValue": 1,
			"awardRule": 0
		}, {
			"serialNumber": 6,
			"endValue": 3,
			"isDeleted": 0,
			"name": "遵守纪律星",
			"icon": "",
			"unitId": "c7e1370a-a3f4-4d6e-b513-ae18b1fa8d1e",
			"ranking": 3,
			"id": "23131",
			"beginValue": 1,
			"awardRule": 0
		}, {
			"serialNumber": 7,
			"endValue": 10,
			"isDeleted": 0,
			"name": "保护环境星",
			"icon": "",
			"unitId": "c7e1370a-a3f4-4d6e-b513-ae18b1fa8d1e",
			"ranking": 0,
			"id": "252",
			"beginValue": 5,
			"awardRule": 1
		}],
		"status": 0,
		"msg": "0"
	};
	export default {
		
		data() {
			return {
				mainTableHeight:this.mainContentHeight+"px",//主表高度
				treeHeight:this.mainContentHeight+50+"px",
				tableData: tableInfo.data,//主表数据
				multipleSelection: [],//主表选中记录合集
				
				treeData: [{//树形结构数据,label标签名、children子元素
					label:"第一级",
					index:"aaa",
					children:[{
							label:"第二级",
							index:"bbb",
							children:[{
									index:"ccc",
									label:"第三级",
						}]
					}]
				},{//树形结构数据,label标签名、children子元素
					label:"第一级",
					index:"aaa",
					children:[{
							label:"第二级",
							index:"bbb",
							children:[{
									index:"ccc",
									label:"第三级",
						}]
					}]
				}],
				defaultProps: {
		          children: 'children',
		          label: 'label'
		        },
				ePage:pageInfo.everyPage,//每页记录数
				cPage:pageInfo.currentPage,//当前记录数
				tCount:pageInfo.totalCount,
				
				options:[{//select内容
					value:"aaaaddsadsad",
					label:"bbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
				},{
					value:"cccdsadsadsa",
					label:"bbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
				}],
				selectOptions:"",//select选择的值
				searchText:"",//搜索框内容
				pageList: this.$store.state.pagination.paginationList,
				currentPath: this.$router.history.current.path,
				dialogVisible: false,//对话框是否显示 
			}
		},
		props:['mainContentHeight'],
		mixins:[mainMethod],//引用主表公有方法
		created(){
			for(let item of this.pageList){
				if(item.path === this.currentPath){
					this.ePage=item.everyPage;
					this.cPage=item.currentPage;
					return false;
				}
			}
			pageInfo.path=this.$router.history.current.path;
			this.$store.dispatch("paginationAdd",pageInfo);//将页码信息插入
		},
		mounted(){
			const searchList = this.$store.state.search.searchList;
			const path = this.$router.history.current.path;
			for(let item of searchList){
				if(path === item.path){
					this.searchText = item.searchText;
					this.selectOptions = item.selectOption1;
				}
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.cPage = val;
				for(let item of this.pageList){
					if(item.path === this.currentPath){
						item.currentPage=val;
						return false;
					}
				}
			},
			setEveryPage(){
				let inputEveryPage = Number(document.getElementById("everpageNumber").value);
				if(inputEveryPage===0){
					return false;
				}
				if(inputEveryPage>this.tCount){
					let h = this.$createElement;//elementUi创建html元素
					this.$message({
						//h:创建html元素，（）中第一个是html标签，第二个是样式模板，第三个是文本
						message:h('p',null,[
							//h('span',null,'出现错误：'),
							h('i',{style:'color:red;font-weight:bolder'},'您输入每页条数超过总条数,请重新输入')
						])
					});
					document.getElementById("everpageNumber").value="";
					return false;
				}
				
				for(let item of this.pageList){
					if(item.path === this.currentPath){
						this.ePage=inputEveryPage;
						item.everyPage=inputEveryPage;
						this.handleSizeChange(inputEveryPage);
						return false;
					}
				}
			},
			aaa(){
				alert("审核通过");
			},
			bbb(){
				alert("审核不通过");
			},
			handleNodeClick(data) {
		        this.treeHeight = this.mainContentHeight+50+Math.random(0,0.1)+"px";
		    },
			addPanel:function(){
				this.dialogVisible = true;
				this.$router.push("/news/newsList/add");
			},
			changeValue:function(value) {				
				let searchObj = {
					path:this.$router.history.current.path,
					selectOption1:value,
					searchText:this.searchText,
				}
				this.selectOptions = value;
				this.$store.dispatch('searchAdd',searchObj);
				let obj = this.options.find(function(item){
					return item.value == value;
				});
			}
		},
		watch:{
			searchText:function(val){
				if(val==undefined){
					return false;
				}
				this.searchText = val;
				let searchObj = {
					path:this.$router.history.current.path,
					selectOption1:this.selectOptions,
					searchText:val,
				}
				this.$store.dispatch("searchAdd",searchObj);
			}
		}
	}
</script>

<style type="text/css" scoped="scoped">
	@import url("../../style/headerNav.css");
	@import url("../../style/mainList.css");
	
	>>>.el-pagination__jump{margin-left:10px;}
	>>>.el-input-group__prepend{padding:0px 5px;}
	>>>#everpageNumber{text-align: center;padding:0px 5px;}
	>>>.el-pager li{min-width: 30.5px;}
	.paginationComponent{padding-top:2px;display: inline-block;float:right}
	.el-pagination{width:auto;text-align: right;padding:0px 5px;float:left}
	.el-input{width:90px;float:left;}
	span{float:left;margin-right:5px;line-height: 2;font-weight:normal;font-size:14px;color:#888}
	@media only screen and (min-width: 100px) and (max-width: 1200px) {
		>>>.el-pager li {
			min-width: auto;
			padding:0px 5px;
		}
		>>>.el-pagination__jump{margin-left:5px}
	}
</style>