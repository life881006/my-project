<template>
	<div id="">
			用户名：<el-input class="input" v-model="username"></el-input>
			密码：<el-input class="input" v-model="password"></el-input>
			<el-button type="primary" @click="submit">确定</el-button>
	</div>
</template>

<script>
	
	
	export default{
		name:"login",
		data(){
			return {
				username:"",
				password:""
			}
		},
		methods:{
			submit:function(){
		  		let p = {};
		  		//let _this = this;
		  		p.name = this.username;
		  		p.pwd = this.password;
		  		
		  		
		  		this.axios({
		             method: 'post',
		             url: global.url_base,//url_base为全局变量，调用时前面加global,参数在util->config.js中
		             data: this.getData("HX_EXT_API","/https/user/loginByPwd.do",p),//getData为全局方法，方法加入到vue中，调用前需加this，方法在util->methods.js中
		             dataType: 'JSON'
		             /*
		            transformRequest: [//这里可以在发送请求之前对请求数据做处理
				      function (data) { // 解决传递数组变成对象的问题
				        return data
				      }
				    ],
				    transformResponse: [function (data) {// 这里提前处理返回的数据
						return data;
					}],
				    */
				 
		        }).then((result)=> {
		        	let status = result.data.data.status; 
    			    let userObj = result.data.data.obj;
    			    let userToken = result.data.data.userToken;  			 
					let userId = userObj.id;
	    			let unitId = userObj.unitId;
					sessionStorage.setItem("userId",userId);
					sessionStorage.setItem("unitId",unitId);	
					if(status == '0'){
    				    if (userObj.status == 0){
    				       alert("您的帐号还未审核通过，不能登录系统。");
    				    } else if (userObj.status == 1){ 
    				       	
						   switch(userObj.roleId){
						       case 1:
							   case 4:
							   case 5:
							   case 6:
							   		this.$options.methods.getUser.bind(this)(userId);//bind(this)很重要，不然获取不到原本数据
									break;
							   case 2:
						       case 3:
							        //window.location.href="../parents/notice.html";
							  		break;
							   default:
							   		alert("该角色功能开发中");
						   }					  				       

    				    } else {
    				       alert("您的帐号已被停用，不能登录系统。");
    				    }    					
    				}else if(status == '1'){
    					alert("登录密码不正确！");
    				}else if(status == '2'){
    					alert("帐号不存在！");
    				}else{
    					alert("操作失败");
    				}
    				return false;
		       }).catch(function(error) {
		        	console.log(error);
		        });
		        
		        /*均完成后返回
		        axios.all([get1(), get2()]).then(
		        axios.spread(function (res1, res2) {
				// 只有两个请求都完成才会成功，否则会被catch捕获
				})
				);
				*/
			},
			getUser:function(userId){
				let p = {};
				p.id = userId;
				this.axios({
					method:'post',
					url:global.url_base,
					data: this.getData("HX_EXT_API","/https/user/queryUserInfo.do",p),
					dataType:"json",
				}).then((result)=>{
					let userObj = result.data.data;
					//格式化模块、项目
					let userModules = formatModules(userObj.functionalModules);
					userObj.functionalModules = userModules;
			  		let userJson = JSON.stringify(userObj);
			  		sessionStorage.setItem("user",userJson);
					this.$router.push("/home/home");
				}).catch((error)=>{
					console.log(error);
					
				});
			}
			
		}
	}
	
	function formatModules(modulesObj) {
		let moduleArr = modulesObj;
		let moduleListArr = {};
		let serialNumber = 0;
		let pArr = [];
		let mainArr = [];
		
		for(let m = 0; m < moduleArr.length; m++) {
			let muduleFirstLevelItem = [];
			let muduleFirstLevelObj = moduleArr[m];
			let childrenList = [];
				childrenList = moduleArr[m].functionalItems;
				muduleFirstLevelObj.serialNumber = m;
				//muduleFirstLevelObj.functionalItems = undefined;
				
				for(let i = 0; i < childrenList.length; i++) {
					
					let pItem ;
					if(childrenList[i].pid === "0") {
						
						pItem = childrenList[i];
						let cItem = [];
						pItem.serialNumber = m+"-"+i;
						for(let j = 0; j < childrenList.length; j++) {
							if(childrenList[i].id == childrenList[j].pid) {
								cItem.push(childrenList[j]);
								childrenList[j].serialNumber = m+"-"+i+"-"+j;
							}
						}
						pItem.children = cItem;
					}
					if(pItem!=undefined){
					muduleFirstLevelItem.push(pItem);
					}
				}
				muduleFirstLevelObj.children = muduleFirstLevelItem;
				mainArr.push(muduleFirstLevelObj);
		}
		for(let item of mainArr){
			item.functionalItems = undefined;
		}
		return mainArr;
	}
</script>

<style scoped="scoped">
	.input{width:100px}
</style>