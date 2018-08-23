export default {
	methods: {
		getWhereStr(){
			/*			 
			 * 主表条件语句 
			 */
			let whereStr = document.getElementById("whereStr").value;
			let unitId = this.user.unitId;
			let currentChannelId = this.currentNodeIndex;
			
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
			
					
			this.transmitObj.url = global.url_base;
			this.transmitObj.api = "HX_API";
			this.transmitObj.handler = "/https/news/getPageInfo.do";
			
			this.getPageData(this.pageObj,this.transmitObj).then((data)=> {	
				this.ePage = data.everyPage;
				this.cPage = data.currentPage;
				this.tCount = data.totalCount;
				this.$store.dispatch("paginationAdd",this.pageObj);//将页码信息插入
				this.transmitObj.handler = "/https/news/getNewssByPage.do";
				return this.getPageData(this.pageObj,this.transmitObj);//获取主表具体条数
			}).then((data)=>{
				this.tableData = data;
			});
		}
	}
}
