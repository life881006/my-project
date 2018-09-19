export default {
	methods: {
		getWhereStr(){
			/*			 
			 * 主表条件语句 
			 */
			let whereStr = this.whereStr;
			let unitId = this.user.unitId;
			let currentChannelId = this.currentNode;
			
			
			if (unitId != ''){
				if (whereStr != ''){
					whereStr += " and a.unitId = '"+unitId+"'";
				}else{
					whereStr += " where a.unitId = '"+unitId+"'";
				}
			}
									
			if (currentChannelId!="0"){
				if (whereStr != ''){
					whereStr += " and b.channelId = '"+currentChannelId+"'";
				}else{
					whereStr += " where b.channelId = '"+currentChannelId+"'";
				}
			}
			return whereStr;
		},
		getNewsMainData(){
			/*
			 * 获取主表数据
			 * pageObj: 为数据对象
			 * transmitObj: 为请求路径
			 */
			
			let sql = "SELECT DISTINCT a.id,a.title,a.status,a.author,a.transfer,a.editor,a.editTime,a.appearDate,a.readTimes,a.releaseSite,a.releaseApp,a.releaseWx,a.releaseMicroblog,a.isTop FROM news AS a";
			sql += " left join channelNewsAssociate as b on a.id = b.newsId left join channel as c on b.channelId = c.id";
									
			this.pageObj.sql = sql;			
			this.pageObj.whereStr = this.getWhereStr();
			this.pageObj.orderStr = "order by a.editTime desc";			
			
					
			this.transmitObj.url = this.baseConfig.url_base;
			this.transmitObj.api = "HX_API";
			this.transmitObj.handler = "/https/news/getPageInfo.do";
			
			this.getPageData(this.pageObj,this.transmitObj).then((data)=> {	
				this.pageObj.everyPage = data.everyPage;
				this.pageObj.currentPage = data.currentPage;
				this.pageObj.totalCount = data.totalCount;
				this.$store.dispatch("paginationAdd",this.pageObj);//将页码信息插入
				this.transmitObj.handler = "/https/news/getNewssByPage.do";
				return this.getPageData(this.pageObj,this.transmitObj);//获取主表具体条数
			}).then((data)=>{
				this.tableData = data;
				this.loading = false;
			});
		},
		handleSelectionChange(data){//主表数据选中
			console.log(data);
			this.dataSelections = data;
		},
		getPageSize(page){//变更每页条数
			this.loading = true;
			this.pageObj= page;
			this.getNewsMainData();
		},
		getCurrentPage(page){//转到指定页
			this.loading = true;
			this.pageObj = page;
			this.getNewsMainData();
		},
	    addPanel() { //打开弹窗
			this.$router.push("/news/newsAdd");
		},
		refreshTable(){//子组件普通刷新主表
			this.getNewsMainData();
		},
		refreshTableBySearch(whereStr){//子查询组件刷新主表
	    	this.loading = true;
			this.whereStr = whereStr;
			this.pageObj.currentPage = 1;
	    	this.getNewsMainData();
	    },
	    refreshTableByTreeNode(nodeIndex){//子树组件刷新主表
	    	this.loading = true;
			this.currentNode = nodeIndex;
			this.pageObj.currentPage = 1;
	    	this.getNewsMainData();
	    },
	}
}
