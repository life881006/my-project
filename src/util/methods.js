export default{
  install(Vue,options)
  {
    Vue.prototype.getData = function (projName,path,json) {//封装请求
      var d = new Object(); 
	    d.token="123456";
	    d.projName = projName;
	    d.path = path;
	    d.json = JSON.stringify(json);
	    d.abc = new Date().getTime();
	    return d;
    }
  }
}