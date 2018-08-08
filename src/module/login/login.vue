<template>
	<el-form id="">
			<el-form-item label="用户名">
				<el-input class="input" size="small" v-model="username"></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input class="input" size="small" v-model="password"></el-input>
			</el-form-item>
			<el-button type="primary" size="small" @click="submit">确定</el-button>
	</el-form>
</template>

<script>
	import userData from "../../assets/user"
	
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
		return mainArr;
	}
	
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
				/*
				let p = {};
				this.axios({
					method:'get',
					url:'../static/test.json',
					data:this.getData("HX_EXT_API","/https/user/loginByPwd.do",p),
					dataType:"json",
				}).then((response)=>{
					this.$options.methods.getUser.bind(this)("userToken.access_token");
				}).catch((error)=>{
					console.log(error);
				});
				*/
				let userObj = userData.data;
				let userModules = formatModules(userObj.functionalModules);
				userObj.functionalModules = userModules;
		  		let userJson = JSON.stringify(userObj);
		  		sessionStorage.setItem("user",userJson);
				this.$router.push("/home/home");
			},
			getUser:function(token){
				let p = {}; 
				/*let _this = this;*/
				console.log(this);
				return false;
				p.access_token=token;
				_this.axios({					
					method: 'post',
					url: global.url_base,
					data: _this.qs.stringify(_this.getData("HX_EXT_API","/https/userToken/getLoginInfoByToken.do",p)),
					dataType: 'JSON'					
				}).then(function(result){
					let data = result.data.data;
					if(data.isValid==0){
					    alert("已在其他地方登录，请重新登录");
					    _this.$router.push('/login');
					}else{
						data = JSON.stringify(data);
						sessionStorage.setItem("user",data);
						_this.$router.push("/");
					}
					
				}).catch(function(error){
					alert("登录错误");
					
				});
			}
		}
	}
</script>

<style scoped="scoped">
	.input{width:100px}
</style>