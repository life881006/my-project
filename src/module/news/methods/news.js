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
	}
}
