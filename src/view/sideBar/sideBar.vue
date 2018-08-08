<template>
	
	<div id='menu'>
		<el-scrollbar class="scrollbar-wrapper">
			<el-menu 
				:default-openeds="defaultSerialNumber" 
				:default-active="defaultActive" 
				background-color="#545c64" 
			    text-color="#fff" 
			    active-text-color="#ffd04b" 
			    :collapse="isCollapse" 
				unique-opened-router>
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
								
								<el-menu-item v-for="moduleItem in modulePItem.children" :key="moduleItem.id" ref="moduleItem.id" :index="moduleItem.serialNumber+''">
									<router-link class="routerLink" @click.native="goto(moduleItem)" :to="{path:moduleItem.pcOpenUrl}">
									{{moduleItem.itemName}}
									</router-link>
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
		name:'sideBar',
		data: function(){
			return {
				isCollapse: false
			}
		},
		props:['sideBarHeight','sideBarWidth'],
		created: function(){
			const user = JSON.parse(sessionStorage.getItem("user"));
			const functionalModules = user.functionalModules;
			this.asideModules = formatModules(functionalModules);
			if(this.$store.state.currentMenu){
				const currentMenus = this.$store.state.currentMenu.split("-");
				this.defaultSerialNumber = [""+currentMenus[0],currentMenus[0]+"-"+currentMenus[1]];
				this.defaultActive = this.$store.state.currentMenu;
			}else{
				this.defaultSerialNumber = ["-1"];//获取默认打开菜单的序号
				this.defaultActive = "-1";//给默认打开菜单的第一项加样式	
			}	
		},
		mounted: function(){
			document.getElementById('menu').style.height = this.sideBarHeight + "px";
			if(this.sideBarWidth<1160){
				this.isCollapse = true;				
			}			
		},
		methods:{
			goto(obj){
				this.defaultActive = obj.serialNumber;
				this.$store.state.currentMenu = obj.serialNumber;
			}
		},
		watch: {
			sideBarHeight(val) {
				document.getElementById('menu').style.height = val + "px";
			},
			sideBarWidth(val) {
				if(val<1160){
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
	#menu .el-submenu__title i{color:#fafafa}
	#menu .el-scrollbar__thumb{background-color:rgba(240,240,240,0.5)}
	#menu .el-scrollbar__wrap{overflow-x:hidden}
	.routerLink{color:inherit;text-decoration: none;display: block;}
	.submenuBg{background-color:#5d6771}
	.submenuTitle{font-size: 13px;}
	@media only screen and (min-width: 100px) and (max-width: 1159px) {
		#menu {
			width: auto;
			border-right: 0px;
			//transition: width 1s;
		}
	}
</style>