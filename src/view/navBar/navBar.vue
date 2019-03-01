<template>
	<div id="" class="headerNav">
		<el-col :xs="16" :sm="16" :md="16" :lg="16">
			{{user.unitName}}
		</el-col>
		<el-col :xs="8" :sm="8" :md="8" :lg="8" class="pull-right">
			<img class="photo" :src="userInfo.photoPath" width="30px" height="30px"/>
			
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
			
					<el-dropdown-item @click.native="modifyUserInfo()"><i class="el-icon-edit"></i>修改信息</el-dropdown-item>
					<el-dropdown-item @click.native="gotoModifyPwd()"><i class="el-icon-edit"></i>修改密码</el-dropdown-item>
					<el-dropdown-item @click.native="unitChange()"><i class="el-icon-edit"></i>单位设置</el-dropdown-item>
					<el-dropdown-item @click.native="gotoBindSchoolClassSubject()"><i class="el-icon-edit"></i>我的任课</el-dropdown-item>
					<div class="clear"></div>
					<el-dropdown-item @click.native="openHelpDocument()"><i class="el-icon-document"></i>帮助文档</el-dropdown-item>

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
	import cropper from "@/components/cropper/index"//裁切图片
	
	export default {
		name:"navBar",
		data (){
			return {
				noticeNumber:102,//消息数
				isVisible:screenfull.enabled,
				cropperSize:{//裁切框大小
					width:450,
					height:360
				},
				configData:{//附件上传参数（任意附件形式及裁切框公用）
					isFirstButton:false,//首选图按钮
					statusButton:false,//是否显示按钮
					api:"HX_API",
					action:this.baseConfig.url_base2,
					rootPath : "/allWeb/huixue/user/photo",
					addAnnexHandle:"/https/newsAnnex/add.do",
					deleteAnnexHandle:"/https/newsAnnex/delete.do"
				},
				fileListData:[],//附件列表（任意附件形式及裁切框公用）
			}
		},
		components:{cropper},
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
			modifyUserInfo:function(){
				this.$router.push("/user/modifyUserInfo");
			},
			openHelpDocument(){
				console.log("aaa");
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
	
	.photo
		border-radius:50%
		vertical-align:middle
</style>