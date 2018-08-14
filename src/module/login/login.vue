<template>
	<el-form :model="ruleForm" ref="ruleForm">
		<!--prop必须与input的username一致，才能验证Input》username 中输入的值-->
		<el-form-item label="用户名" :rules="filter_inputs({required:true,type:'username'})" prop="username">
			<el-input class="input" size="small" v-model="ruleForm.username"></el-input>
		</el-form-item>
		<el-form-item label="密码" :rules="filter_inputs({required:true,type:'password'})" prop="password">
			<el-input class="input" size="small" v-model="ruleForm.password"></el-input>
		</el-form-item>
		<div class="auditLine" id="auditLine">
			<span class="textBlock" id="textBlock">请拖动方块到最右侧</span>
			<span class="moveBlock" id="moveBlock" @mousedown="mouseDown">
			</span>
		</div>
		<el-button type="primary" size="small" @click="submit">确定</el-button>
	</el-form>
</template>

<script>
	import userData from "../../assets/user"

	let flag;

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

				let pItem;
				if(childrenList[i].pid === "0") {

					pItem = childrenList[i];
					let cItem = [];
					pItem.serialNumber = m + "-" + i;
					for(let j = 0; j < childrenList.length; j++) {
						if(childrenList[i].id == childrenList[j].pid) {
							cItem.push(childrenList[j]);
							childrenList[j].serialNumber = m + "-" + i + "-" + j;
						}
					}
					pItem.children = cItem;
				}
				if(pItem != undefined) {
					muduleFirstLevelItem.push(pItem);
				}
			}
			muduleFirstLevelObj.children = muduleFirstLevelItem;
			mainArr.push(muduleFirstLevelObj);
		}
		return mainArr;
	}

	export default {
		name: "login",
		data() {
			return {
				ruleForm: {
					username: "",
					password: "",
				}
			}
		},
		methods: {
			submit: function() {
				
				
				this.$refs.ruleForm.validate((valid)=>{//全表验证
					if(!valid){//基本验证不通过
						
					}else{//基本验证通过
						if(!flag || flag===null){
				  			document.getElementById("auditLine").style.backgroundColor="#FF0000";
				  			return false;
				  		}
												
						let p = {};
						p.name = this.ruleForm.username;
						p.pwd = this.ruleForm.password;
						
						let userObj = userData.data;
						let userModules = formatModules(userObj.functionalModules);
						userObj.functionalModules = userModules;
						let userJson = JSON.stringify(userObj);
						
						/*
						 * 加密
						 let formatJSON = this.getData("HX_EXT_API","/https/user/loginByPwd.do",p)
						*/
						sessionStorage.setItem("user", userJson);
						this.$router.push("/home/home");
					}
				})
				
			},
			mouseDown: (event) => { //简单的移动验证
				let moveBlock = document.getElementById("moveBlock");
				let disX = event.clientX - moveBlock.offsetLeft;
				let disY = event.clientY - moveBlock.offsetTop;

				if(flag) {
					return false;
				}
				
				if(event.button>0){
					return false;
				}

				window.onmousemove = function(event) {
					let l = event.clientX - disX;
					let objOffsetLeft = moveBlock.offsetLeft;
					if(l <= 0) {
						moveBlock.style.left = 0 + 'px';
					} else if(l > 249) {
						moveBlock.style.left = 250 + 'px';
					} else {
						moveBlock.style.left = l + 'px';
					}

				}
				window.onmouseup = function(event) {
					let l = event.clientX - disX;
					let auditLine = document.getElementById("auditLine");
					let textBlock = document.getElementById("textBlock");
					if(l > 249) {
						moveBlock.style.left = 250 + 'px';
						flag = true;
						moveBlock.onmousedown = null;
						window.onmousemove = null;
						window.onmouseup = null;
						textBlock.innerHTML = "验证通过";
						auditLine.style.backgroundColor = "#13CE66";
					} else {
						moveBlock.style.left = 0 + 'px';
						flag = false;
						textBlock.innerHTML = "验证不通过";
						auditLine.style.backgroundColor = "#FF0000";
					}
					window.onmousemove = null;
					window.onmouseup = null;
				}
			}
		},
		watch:{			
			ruleForm:{//深度监听表单变化，ruleForm为表单:model，handler不可改变
				handler:function(val,oldVal){
					let auditLine = document.getElementById("auditLine");
					let textBlock = document.getElementById("textBlock");
					let moveBlock = document.getElementById("moveBlock");
					textBlock.innerHTML = "请拖动方块到最右侧";
					moveBlock.style.left = 0 + "px";
					auditLine.style.backgroundColor = "#C0CCDA";
					flag = null;
				},
				deep:true,
			}
		}
	}
</script>

<style scoped="scoped">
	.input {
		width: 100px
	}
	
	.auditLine {
		width: 300px;
		border: 1px solid #dcdfe6;
		background-color: #C0CCDA;
		font-size: 12px;
		text-align: center;
		height: 50px;
		position: relative;
		user-select: none;
		transition: background-color 0.5s;
	}
	
	.textBlock {
		position: relative;
		float:left;
		z-index: 200;
		top: 15px;
		min-width: 100px;
		margin-left:60px;
		text-align: left;
		color: #fff;
		font-size: 14px;
		/*background: -webkit-gradient(linear, left top, right top, color-stop(0, #C0CCDA), color-stop(.4, #C0CCDA), color-stop(.5, white), color-stop(.6, #C0CCDA), color-stop(1, #C0CCDA));
		animation: slidetounlock 3s infinite;
		-webkit-animation: slidetounlock 3s infinite;*/
	}
	/*
	@keyframes slidetounlock {
		0% {
			background-position: -300px 0
		}
		100% {
			background-position: 300px 0
		}
	}
	
	@-webkit-keyframes slidetounlock {
		0% {
			background-position: -300px 0
		}
		100% {
			background-position: 300px 0
		}
	}
	*/
	.moveBlock {
		width: 50px;
		height: 50px;
		display: inline-block;
		background-color: #409EFF;
		position: absolute;
		cursor: pointer;
		top: 0px;
		left: 0px;
		transition: left 0.5s;
	}
</style>