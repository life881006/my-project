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
			 * transmitObj: 为请求路径
			 */
			const transmitObj = {};
			const p = {};
			
			let sql = "SELECT DISTINCT a.id,a.title,a.status,a.author,a.transfer,a.editor,a.editTime,a.appearDate,a.readTimes,a.releaseSite,a.releaseApp,a.releaseWx,a.releaseMicroblog,a.isTop FROM news AS a";
			sql += " left join channelNewsAssociate as b on a.id = b.newsId left join channel as c on b.channelId = c.id";
									
			p.sql = sql;
			p.everyPage = this.pageObj.everyPage;
			p.currentPage = this.pageObj.currentPage;
			p.whereStr = this.getWhereStr();
			p.orderStr = "order by a.editTime desc";
			
					
			transmitObj.url = this.baseConfig.url_base;
			transmitObj.api = "HX_API";
			transmitObj.handler = "/https/news/getPageInfo.do";
			
			this.getPageData(p,transmitObj).then((data)=> {	
				this.pageObj.everyPage = data.everyPage;
				this.pageObj.currentPage = data.currentPage;
				this.pageObj.totalCount = data.totalCount;
				this.$store.dispatch("paginationAdd",this.pageObj);//将页码信息插入
				transmitObj.handler = "/https/news/getNewssByPage.do";
				return this.getPageData(p,transmitObj);//获取主表具体条数
			}).then((data)=>{
				this.tableData = data;
				this.loading = false;
			});
		},
		handleSelectionChange(data){//主表数据选中
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
