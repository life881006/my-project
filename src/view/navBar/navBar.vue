<template>
	<div id="" class="headerNav">
		<el-col :xs="16" :sm="16" :md="16" :lg="16">
			{{user.unitName}}
		</el-col>
		<el-col :xs="8" :sm="8" :md="8" :lg="8" class="pull-right">
			<a @click="ddd">
					<img :src="userInfo.photoPath" width="30px" height="30px"/>
			</a>
			<el-dropdown class="functionalIcon headBtn" trigger="click">
				<el-button type="text">
				{{userInfo.realName}}
				<i class="el-icon-arrow-down"></i>
				</el-button>
				<el-dropdown-menu slot="dropdown">

					<el-dropdown-item class="message">
						<el-badge :value="noticeNumber" :max="99">
							<i class="el-icon-message"></i>消息
						</el-badge>
					</el-dropdown-item>
			
					<el-dropdown-item><a @click="modifyUserInfo()"><i class="el-icon-edit"></i>修改信息</a></el-dropdown-item>
					<el-dropdown-item><a @click="gotoModifyPwd()"><i class="el-icon-edit"></i>修改密码</a></el-dropdown-item>
					<el-dropdown-item><a @click="unitChange()"><i class="el-icon-edit"></i>单位设置</a></el-dropdown-item>
					<el-dropdown-item><a @click="gotoBindSchoolClassSubject()"><i class="el-icon-edit"></i>我的任课</a></el-dropdown-item>
					<div class="clear"></div>
					<el-dropdown-item><a @click="" content="下载文档"><i class="el-icon-document"></i>帮助文档</a></el-dropdown-item>

				</el-dropdown-menu>
			</el-dropdown>
			
			<div class="functionalIcon" v-if="isVisible">
				<a @click="fullScreen">
					<i class="el-icon-erp-fullscreen el-icon-big"></i>
				</a>
			</div>
			
			<div class="functionalIcon">
				<a @click="exit" content="退出"><i class="el-icon-erp-exit el-icon-big"></i></a>
			</div>
		</el-col>
		
	</div>
</template>

<script>
	
	import screenfull from 'screenfull'
	
	export default {
		name:"navBar",
		data (){
			return {
				noticeNumber:102,
				isVisible:screenfull.enabled
			}
		},
		methods:{
			exit:function(){
				sessionStorage.clear();
				localStorage.clear();
				this.$router.push("/login");
				window.location.reload();
			},
			fullScreen:function(){
				screenfull.toggle();
				
			},
			ddd:function(){
				alert("aaa");
			}
			
		}
		
	}
</script>

<style lang="stylus">
	
	.el-icon-big
		font-size:20px
		margin-top:3px
		
	.headerNav
		height:48px
		line-height: 48px
		padding:0px 20px
	
	.headBtn
		img
			border-radius:50%
			vertical-align:middle
		
	.functionalIcon
		margin-right:20px
		display: inline-block
		position: relative
		cursor:pointer

	.message
		.el-badge__content.is-fixed
			top:10px
			right:0px

	.functionalIcon:first-of-type
		text-align: right

	.el-dropdown-li-a
		text-align:center
		text-decoration: none
	
	.pull-right
		text-align:right

	.noticeNumber
		width:30px
		height:18px
		font-size:12px
		color:#fff
		position: absolute
		top:2px
		right:-15px
		line-height:18px
		background-color: #f56c6c
		border-radius: 15px
		text-align: center
		
</style>