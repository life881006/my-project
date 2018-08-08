<template>
	<div id="" class="headerNav">
		<el-col :xs="16" :sm="16" :md="16" :lg="16">
			汇学云镇江市中山路小学平台
		</el-col>
		<el-col :xs="8" :sm="8" :md="8" :lg="8" class="pull-right">
			<el-dropdown class="functionalIcon" trigger="click">
				<el-tooltip class="el-dropdown-link" effect="dark" content="修改基本信息">
					<i class="el-icon-erp-headPortrait el-icon-big"></i>
				</el-tooltip>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item><a @click="modifyUserInfo()"><i class="el-icon-edit"></i>修改信息</a></el-dropdown-item>
					<el-dropdown-item><a @click="unitChange()"><i class="el-icon-edit"></i>单位设置</a></el-dropdown-item>
					<el-dropdown-item><a @click="gotoBindSchoolClassSubject()"><i class="el-icon-edit"></i>我的任课</a></el-dropdown-item>
					<el-dropdown-item><a @click="gotoModifyPwd()"><i class="el-icon-edit"></i>修改信息</a></el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
			<div class="functionalIcon">
				<a @click="">
					<i class="el-icon-erp-message el-icon-big"></i>
				</a>
				<sub class="noticeNumber">{{noticeNumber}}</sub>
			</div>
			
			<div class="functionalIcon">
				<a @click="" content="下载文档"><i class="el-icon-erp-nrgl el-icon-big"></i></a>
			</div>
			<div class="functionalIcon">
				<a @click="exit" content="退出"><i class="el-icon-erp-exit el-icon-big"></i></a>
			</div>
		</el-col>
		
	</div>
</template>

<script>
	
	export default {
		name:"navBar",
		data (){
			return {
				noticeNumber:12,
			}
		},
		methods:{
			exit:function(){
				sessionStorage.clear();
				this.$store.state.user = {};
				this.$router.push("/login");
			}
			
		}
		
	}
</script>

<style scoped="scoped">
	@import "../../assets/iconfont/iconfont.css";  
	.el-icon-big{
		font-size:28px;
		vertical-align: "middle";
	}
	.headerNav{height:48px;line-height: 48px;padding:0px 20px;}
	.functionalIcon{height:43px;margin-right:20px;display: inline-block;position: relative;cursor:pointer}
	.functionalIcon:first-of-type{text-align: right;}
	.el-dropdown-li-a{text-align:center;text-decoration: none;}
	.pull-right{text-align:right}
	.noticeNumber{width:30px;height:18px;font-size:12px;color:#fff;position: absolute;top:2px;right:-15px;line-height:18px;background-color: #f56c6c;border-radius: 15px;text-align: center;}
</style>