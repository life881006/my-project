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
							   		this.$options.methods.getUserInfo.bind(this)(userToken.access_token);//bind(this)很重要，不然获取不到原本数据
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
		            alert("系统维护中.....");
		        });
		        
		        /*均完成后返回
		        axios.all([get1(), get2()]).then(
		        axios.spread(function (res1, res2) {
				// 只有两个请求都完成才会成功，否则会被catch捕获
				})
				);
				*/
			},
			getUserInfo:function(token){
				let p = {}; 
				//let _this = this;
				p.access_token=token;
				this.axios({					
					method: 'post',
					url: global.url_base,
					data: this.getData("HX_EXT_API","/https/userToken/getLoginInfoByToken.do",p),
					dataType: 'JSON'					
				}).then((result)=>{
					let data = result.data.data;
					if(data.isValid==0){
					    alert("已在其他地方登录，请重新登录");
					    this.$router.push('/login');
					}else{
						console.log(data.userId);
						this.$options.methods.getUser.bind(this)(data.userId);//待修改
					}
					
				}).catch((error)=>{
					alert(error);					
				});
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
					var data = result.data.data;
					//格式化模块、项目
					data = JSON.stringify(data);
					sessionStorage.setItem("user",data);
					this.$router.push("/");
					
				}).catch((error)=>{
					console.log(error);
					
				});
			}
			
		}
	}
</script>

<style scoped="scoped">
	.input{width:100px}
</style>