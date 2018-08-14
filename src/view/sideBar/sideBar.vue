<template>
	
	<div id='menu'>
		<el-scrollbar class="scrollbar-wrapper">
			<el-menu 
				mode="vertical" 
				:default-active="$route.path.split('/').length>3?$route.path.substring(0,$route.path.lastIndexOf('/')):$route.path" 
				background-color="#545c64" 
			    text-color="#fff" 
			    active-text-color="#ffd04b" 
			    :collapse="isCollapse" 
			    :router=true 
				>
				<el-submenu v-for="module in asideModules" :key="module.id" ref="module.id" :index="module.serialNumber+''">
					<template slot="title">
						<i :class="'el-icon-erp-'+module.pcIcon"></i>
						<span slot="title">{{ module.name }}</span>
					</template>
					<el-menu-item-group>
						<el-submenu v-for="modulePItem in module.children" :key="modulePItem.id" ref="modulePItem.id" :index="modulePItem.serialNumber+''">
							<template slot="title">
								<i :class="'el-icon-erp-'+modulePItem.pcIcon"></i>
								<span slot="title" class="submenuTitle">{{ modulePItem.itemName }}</span>
							</template>
							<el-menu-item-group>
								<!--
                                	<span slot="title">{{modulePItem.itemName}}</span>
                                -->
								
								<el-menu-item 
									v-for="moduleItem in modulePItem.children" 
									:key="moduleItem.id" 
									ref="moduleItem.id" 
									:index="moduleItem.pcOpenUrl">
									{{moduleItem.itemName}}
								</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
					</el-menu-item-group>
				</el-submenu>
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<script>
	
	
	export default{
		name:'sideBar',
		data: function(){
			return {
				isCollapse: false,
			}
		},
		props:['sideBarHeight','sideBarWidth'],
		created: function(){
			const user = JSON.parse(sessionStorage.getItem("user"));
			this.asideModules = user.functionalModules;
		},
		mounted: function(){
			document.getElementById('menu').style.height = this.sideBarHeight + "px";
			if(this.sideBarWidth<1440){
				this.isCollapse = true;				
			}			
		},
		methods:{
			
		},
		watch: {
			sideBarHeight(val) {
				document.getElementById('menu').style.height = val + "px";
			},
			sideBarWidth(val) {				
				if(val<1440){
					this.isCollapse = true;
				}else{
					this.isCollapse = false;
				}
			}
		}
	}

</script>

<style scoped="scoped">
	#menu{
		width:250px;
		overflow: hidden;
		background-color: #545c64;
	}
	#menu .el-menu{border-right:0px}
	#menu .scrollbar-wrapper{height:100%;}
	#menu .el-menu-item{font-size:12px;}
	#menu >>> .el-submenu__title i{color:#fafafa}
	#menu >>> .el-scrollbar__thumb{background-color:rgba(240,240,240,0.5)}
	#menu >>> .el-scrollbar__wrap{overflow-x:hidden}
	.routerLink{color:inherit;text-decoration: none;display: block;}
	.submenuBg{background-color:#5d6771}
	.submenuTitle{font-size: 13px;}
	@media only screen and (min-width: 100px) and (max-width: 1440px) {
		#menu {
			width: auto;
			border-right: 0px;
			//transition: width 1s;
		}
	}
</style>