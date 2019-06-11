export default {
	methods: {
		getWhereStr() {
			/*			 
			 * 主表条件语句 
			 */
			let whereStr = this.whereStr;
			let unitId = this.user.unitId;
			let currentChannelId = this.currentNode;


			if (unitId != '') {
				if (whereStr != '') {
					whereStr += " and a.unitId = '" + unitId + "'";
				} else {
					whereStr += " where a.unitId = '" + unitId + "'";
				}
			}

			if (currentChannelId != "0") {
				if (whereStr != '') {
					whereStr += " and b.channelId = '" + currentChannelId + "'";
				} else {
					whereStr += " where b.channelId = '" + currentChannelId + "'";
				}
			}
			return whereStr;
		},
		getMainData() {
			/*
			 * 获取主表数据
			 * 固定
			 * transmitObj: 为请求路径
			 */
			const transmitObj = {};
			const p = {};

			let sql = `SELECT DISTINCT a.id,a.title,a.author,a.status,a.appearDate,a.appearUserId,
			a.releaseSite,a.releaseApp,a.releaseWx,a.releaseMicroblog,a.isTop,a.type,a.linkUrl FROM news AS a 
			left join channelNewsAssociate as b on a.id = b.newsId 
			left join channel as c on b.channelId = c.id`;

			p.sql = sql;
			p.whereStr = this.getWhereStr();
			p.orderStr = " order by a.appearDate desc";
			p.countSql = `select count(distinct a.id) as count from news AS a 
			left join channelNewsAssociate as b on a.id = b.newsId 
			left join channel as c on b.channelId = c.id ${p.whereStr}`;
			p.page = { everyPage: this.pageObj.everyPage, currentPage: this.pageObj.currentPage };
			
			this.axios.getPageObjs(p).then(data => {
				this.pageObj = data.page;
				this.$store.dispatch("paginationAdd", this.pageObj);//将页码信息插入
				this.tableData = data.objs;
				this.loading = false;
			});
		},
		handleSelectionChange(data) {//主表数据选中
			this.dataSelections = data;
		},
		setPageSize(page) {//变更每页条数
			this.loading = true;
			this.pageObj = page;
			this.getMainData();
		},
		setCurrentPage(page) {//转到指定页
			this.loading = true;
			this.pageObj = page;
			this.getMainData();
		},
		gotoAdd() { //打开弹窗
			this.$router.push("/news/newsAdd");
		},
		refreshTable() {//子组件普通刷新主表
			this.loading = true;
			this.pageObj.currentPage = 1;
			this.getMainData();
		},
		refreshTableBySearch(whereStr) {//子查询组件刷新主表
			this.loading = true;
			this.whereStr = whereStr;
			this.pageObj.currentPage = 1;
			this.getMainData();
		},
		refreshTableByTreeNode(nodeIndex) {//子树组件刷新主表
			this.loading = true;
			this.currentNode = nodeIndex;
			this.pageObj.currentPage = 1;
			this.getMainData();
		},

		/** 
		 * 附件相关：
		 * getUploadedAnnex：附件上传完毕后显示
		 * updateAnnexMsg：表单提交后更新附件
		 * removeAnnexItem：删除单个附件
		 */
		getUploadedAnnex(p) {
			//获取文件上传后返回的数据
			const annex = new Object();
			annex.newsId = "";
			annex.annexName = p.fileName;
			annex.fileType = p.fileType;
			annex.fileSize = p.fileSize;
			annex.dirName = p.dirName;
			annex.contextPath = p.contextPath;
			annex.saveUrl = p.saveUrl;
			annex.newFileName = p.newFileName;
			annex.originalFileName = p.newFileName;
	  
			const obj = {};
			obj.json = annex;
			obj.tableName = "newsAnnex";
	  
			this.axios.add(obj).then(data=>{
			  const fileId = data;
			  p.id = fileId;
			  this.fileListData.push(p);
			});
		},
		updateAnnexMsg(newsId) {
			//更新附件上传后的newsId
			if(this.fileListData.length==0){
				this.$message({
					type: "success",
					message: "添加成功"
				});
				this.reset("newsAddform");
				return false;
			}
			let annexes = [];
			const c = {};
			for (const [i, item] of this.fileListData.entries()) {
				const annex = {};
				annex.id = item.id;
				annex.serialNumber = i + 1;
				annex.newsId = newsId;
				annex.annexName = item.annexName + "." + item.fileType;
				annex.content = "";
				annex.isFirst = item.isFirst;
				annex.status = item.status;
				annex.fileType = item.fileType;
				annex.fileSize = item.fileSize;
				annex.dirName = item.dirName;
				annex.contextPath = item.contextPath;
				annex.saveUrl = item.saveUrl;
				annex.newFileName = item.newFileName;
				annex.smallPicture = item.smallPicture;
				annex.createTime = new Date().Format("YYYY-MM-DD HH:mm:ss");
				annexes[i] = annex;
			}
		
			const p = {};
			p.array = annexes;
			p.tableName = "newsAnnex";
		
			this.axios.updates(p).then(data=>{
				this.$message({
				type: "success",
				message: "添加成功"
				});
				this.reset("newsAddform");
		
			});
		},
		removeAnnexItem(index) {
			//删除附件后更新附件列表
			this.$confirm("此操作将永久删除该附件, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			}).then(() => {
				const annexItem = this.fileListData[index];
				const p = {};
				p.id = annexItem.id;
				p.tableName = "newsAnnex";
		
				this.axios.delete(p).then(data=>{
				this.fileListData.splice(index, 1);
				this.$message({
					type: "success",
					message: "删除成功!"
				});
				});      
			}).catch(error => {
				this.$message({
				type: "info",
				message: "已取消删除"
				});
			});
		},
	}
}
