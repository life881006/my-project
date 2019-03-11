import qs from 'qs'
import moment from 'moment'
//定义变量

export default{
  install(Vue,options)
  {
    Vue.prototype.getData = function (projName,path,json) {//封装请求
			let d = new Object(); 
			d.token= window.btoa(encodeURIComponent(encodeURIComponent(new Date().getTime())));
			d.projName = window.btoa(encodeURIComponent(encodeURIComponent(projName)));
			d.path = window.btoa(encodeURIComponent(encodeURIComponent(path)));
			d.json = window.btoa(encodeURIComponent(encodeURIComponent(JSON.stringify(json))));
			/**
	    d.token="123456";
	    d.projName = projName;
	    d.path = path;
	    d.json = JSON.stringify(json);
	    d.abc = new Date().getTime();
	    **/
	   	return qs.stringify(d);
    }
    Vue.prototype.$trim = function(str){
    	str = str.replace(/\ +/g, "");
			str = str.replace(/[ ]/g, "");
			str = str.replace(/[\r\n]/g, "");
				return str;
		}
		Vue.prototype.formatTreeData = function(list){
			let temp = [];
			let tree = [];
			let trueTree = [];
			for(let i in list){
				temp[list[i].id] = list[i];
			}
			
			for(let i in temp){
				if(temp[i].pid && temp[i].pid!="0") {
				if(!temp[temp[i].pid].children) {
					temp[temp[i].pid].children = [];
				}
				temp[temp[i].pid].children[temp[i].id] = temp[i];
				} else {
				tree[temp[i].id] =  temp[i];
				}
			}

			formatData(tree,trueTree);

			return trueTree;
		}
	
    Vue.prototype.log = function(item){
			console.log(item);
		}

		Date.prototype.Format = function(fmt){
			//调用案例
			//new Date(1552294515381).Format("YYYY年MM月DD日 HH:mm:SS");
			return moment(this).format(fmt);
		}

		Date.prototype.farFromNow = function(){
			//调用案例
			//new Date(1552294515381).farFromNow();
			let fromNowString =  moment(this).fromNow();

			let resultString = "";
			if(fromNowString.indexOf("years")>=0){
				resultString = fromNowString.replace(" years","年");
			}else if(fromNowString.indexOf("days")>=0){
				resultString = fromNowString.replace(" days","天");
			}else if(fromNowString.indexOf("hours")>=0){
				resultString = fromNowString.replace(" hours","小时");
			}else if(fromNowString.indexOf("minutes")>=0){
				resultString = fromNowString.replace(" minutes","分钟");
			}else if(fromNowString.indexOf("seconds")>=0){
				resultString = "刚刚";
			}
			resultString = resultString.replace(" ago","前");
			return resultString;
		}
  }
}

function formatData(parentNode,eArr){
	for(let i in parentNode){
		if(parentNode[i].children){
			let subEmptyArr = [];
			parentNode[i].children = formatData(parentNode[i].children,subEmptyArr);
		}
		eArr.push(parentNode[i]);
	}
	return eArr;
}


