<template>
	<el-form :model="ruleForm" ref="ruleForm" :rules="rules">
			<!--prop为验证条件？-->
			<el-form-item label="用户名" prop="username">
				<el-input class="input" size="small" v-model="ruleForm.username"></el-input>
			</el-form-item>
			<el-form-item label="密码" >
				<el-input class="input" size="small" v-model="ruleForm.password"></el-input>
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
				ruleForm:{
					username:"",
					password:"",
				},
				rules:{
					username:[
						{required:true,trigger:"blur",message:"输入用户名"}
					]
				}
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
				let p = {};
				p.sql = "select a.* from user as a left join admin as b on a.id = b.userId";
				
				let userObj = userData.data;
				let userModules = formatModules(userObj.functionalModules);
				userObj.functionalModules = userModules;
		  		let userJson = JSON.stringify(userObj);
		  		/*
		  		 * 加密
		  		let formatJSON = this.getData("HX_EXT_API","/https/user/loginByPwd.do",p)
		  		*/
		  		sessionStorage.setItem("user",userJson);
				this.$router.push("/home/home");
			}
		}
	}
</script>

<style scoped="scoped">
	.input{width:100px}
</style>