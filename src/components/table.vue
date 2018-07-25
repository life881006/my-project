<template>
	<div class="mainTableArea">
		<headerNav></headerNav>
		<el-table 
			ref="multipleTable" 
			:height="tHeight" 
			:data="tableData3.slice((currentPage-1)*everyPage,currentPage*everyPage)" 
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
				<pagination @pSize="getPageSize" @cPage="getCurrentPage" :currentPage="currentPage" :everyPage="everyPage" :totalCount="totalCount"></pagination>
			</el-col>
		</div>
		
	</div>
</template>

<script>
	
	import headerNav from './headerSearchNav'
	import pagination from './mainFooter'
	const pageInfo =  {
		"hasPrePage": false,
		"hasNextPage": false,
		"totalPage": 1,
		"beginIndex": 0,
		"currentPage": 1,
		"totalCount": 14,
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
				tableData3: tableInfo.data,
				multipleSelection: [],
				tHeight:this.tableHeight+"px",
				totalCount:tableInfo.data.length,
				currentPage:pageInfo.currentPage,
			}
		},
		created(){
			if(pageInfo.totalCount<global.everyPage){
				this.everyPage = pageInfo.totalCount;
			}else{
				this.everyPage = global.everyPage;				
			}
			//console.log(pageInfo.everyPage);
			//this.everyPage = number;
		},
		props:['tableHeight'],
		components:{headerNav,pagination},
		methods: {
			toggleSelection(rows) {
				if(rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			deleteThis(index,row){
				this.tableData3.splice(index,1);
			},
			handleSizeChange(val) {
				this.everyPage = val;
			},
			handleCurrentChange(val) {
				this.currentPage = val;
			},
			aaa(){
				alert("审核通过");
			},
			bbb(){
				alert("审核不通过");
			},
			getPageSize(pageSize){
				this.everyPage=pageSize;
			},
			getCurrentPage(cPage){
				this.currentPage = cPage;
			}
		},
		watch:{
			tableHeight(val){
				this.tHeight = val;
			}
			
		}
	}
</script>

<style type="text/css" scoped="scoped">
	.paginationArea{margin-top:10px;display: inline-block;width: 100%;}
	.el-pagination{text-align: right;}
</style>