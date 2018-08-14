export default {
	getWhereStr(){
		let whereStr = document.getElementById("whereStr").value;
		let unitId = JSON.parse(sessionStorage.getItem("user")).unitId;
		
		if (unitId != ''){
			if (whereStr != ''){
				whereStr += " and a.unitId = '"+unitId+"'";
			}else{
				whereStr += " where a.unitId = '"+unitId+"'";
			}
		}
		/*
		if (currentPid!=""){
			if (whereStr != ''){
				whereStr += " and c.id = '"+channelId+"'";
			}else{
				whereStr += " where c.id = '"+channelId+"'";
			}
		}*/
		return whereStr;
	}
}
