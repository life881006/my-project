<template>
	<div @click="hideMenu">
		<div class="visitTagContainer" ref="visitTagContainer" @wheel.prevent="handleScroll">
			<div class="visitTags" ref="visitTags" :style="{left:left+'px'}">
				<router-link 
					:class="[isActive(item.path)?'active':'','routerTags']" 
					:key="item.path" 
					ref="item" 
					:to="isQuery(item)" 
					v-for="item in Array.from(routerHistory)" 
					@contextmenu.native.prevent="showTagsMenu" 
					>{{item.title}}
				<i class="el-icon-close"  v-on:click.stop.prevent="deleteTag(item.path)"></i>
				</router-link>
			</div>
		</div>
		<div id="tagMenu" class="tagsMenu" :style="{'display':tagsMenuShow?'block':'none'}">
			<ul>
				<li>
					<el-button type="text" @click="deleteCurrentTag" size="small" icon="el-icon-caret-right">关闭</el-button>
				</li>
				<li>
					<el-button type="text" @click="deleteOthersTag" size="small" icon="el-icon-caret-right">关闭其他</el-button>
				</li>
				<li>
					<el-button type="text" @click="deleteAllTag" size="small" icon="el-icon-caret-right">全部关闭</el-button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	const padding=15;
	export default{
		name:"visitTags",
		beforeCreate(){
		},
		data:function(){
			return {
				left: 0,
				routerHistory:this.$store.state.visitTags.visitedTags,
				tagsMenuShow: false,
				currentTagPath:"",
				isHomePage:false,
			}
		},
		created:function(){
		},
		computed:{
			
		},
		mounted() {
		    this.addViewTags()
		},
		props:['visitList'],
		methods:{
			generateRoute() {
		      if (this.$route.name) {
		        return this.$route
		      }
		      return false
		    },
		    addViewTags() {
		      const route = this.generateRoute()
		      if (!route) {
		        return false
		      }
		      this.$store.dispatch('addVistedTags', route)
		    },
			deleteTag(path){
				
				if(path.indexOf("/home")>=0 && this.routerHistory.length===1){
					return false;
				}
				
				this.$store.dispatch('deleteSingleTag',path).then((items)=>{
					if(this.isActive(path)){
						const lastVisited = items.slice(-1)[0];
						if(lastVisited){
							this.$router.push(lastVisited);
						}else{
							this.$router.push("/home");
						}
					}else{
						
					}
				});
			},			
			isActive(path){
				return this.$router.history.current.path === path;
			},
			isQuery(routeItem){
				if(JSON.stringify(routeItem.query)==="{}"){//验证是否带参数
					return {name:routeItem.name};
				}else{
					return {name:routeItem.name,query:routeItem.query};
				}
			},
			moveToCurrentTag() {
			    const items = this.$refs.item;			    
			    this.$nextTick(() => {			    	
				    for (const item of items) {
				        if (item.to.name === this.$route.name) {
				          this.moveToTarget(item.$el);
				          //this.routerHistory = this.$route;
				          break
				        }
				    }
			    });
		    },
			handleScroll(e) {
		      const eventDelta = e.wheelDelta || -e.deltaY * 3
		      const $container = this.$refs.visitTagContainer
		      const $containerWidth = $container.offsetWidth
		      const $wrapper = this.$refs.visitTags
		      const $wrapperWidth = $wrapper.offsetWidth
		
		      if (eventDelta > 0) {
		        this.left = Math.min(0, this.left + eventDelta)
		      } else {
		        if ($containerWidth - padding < $wrapperWidth) {
		          if (this.left < -($wrapperWidth - $containerWidth + padding)) {
		            this.left = this.left
		          } else {
		            this.left = Math.max(this.left + eventDelta, $containerWidth - $wrapperWidth - padding)
		          }
		        } else {
		          this.left = 0
		        }
		      }
		    },
		    moveToTarget($target) {
		      const $container = this.$refs.visitTagContainer
		      const $containerWidth = $container.offsetWidth
		      const $targetLeft = $target.offsetLeft
		      const $targetWidth = $target.offsetWidth
		      
		      if ($targetLeft < -this.left) {
		        // tag in the left
		        this.left = -$targetLeft + padding
		      } else if ($targetLeft + padding > -this.left && $targetLeft + $targetWidth < -this.left + $containerWidth - padding) {
		        // tag in the current view
		        // eslint-disable-line
		        this.left = Math.random(0,0.1);//刷新组件
		      } else {
		        // tag in the right
		        this.left = -($targetLeft - ($containerWidth - $targetWidth) + padding)
		      }
		    },
		    hideMenu(){
		    	this.tagsMenuShow = false;
		    },
		    showTagsMenu(event){
		    	this.currentTagPath = event.currentTarget.href;
		    	if(this.currentTagPath.indexOf("/home/index")>=0){
		    		this.isHomePage = true;
		    	}else{
		    		this.isHomePage = false;
		    	}
		    	document.getElementById("tagMenu").style.left = event.x+"px";
		    	document.getElementById("tagMenu").style.top = event.y+"px";
		    	this.tagsMenuShow = true;
		    },
		    deleteCurrentTag(){
				let pathStart = this.currentTagPath.indexOf("#")+1;
				let pathEnd = this.currentTagPath.indexOf("?")<0?this.currentTagPath.length:this.currentTagPath.indexOf("?");
		    	const path = this.currentTagPath.substring(pathStart,pathEnd);
				this.deleteTag(path);
		    },
		    deleteOthersTag(){
				let pathStart = this.currentTagPath.indexOf("#")+1;
				let pathEnd = this.currentTagPath.indexOf("?")<0?this.currentTagPath.length:this.currentTagPath.indexOf("?");
		    	const path = this.currentTagPath.substring(pathStart,pathEnd);
		    	this.$store.dispatch("deleteOthersTag",path).then((data)=>{
		    		this.routerHistory = data;
		    		this.$router.push(data[0]);
		    	});
		    },
		    deleteAllTag(){
		    	this.$store.dispatch("deleteAllTags").then((data)=>{
		    		this.routerHistory = data;
	    			this.$router.push(data[0]);//返回默认首页
		    	});
		    }
		},
		watch:{
			$route(to,from){
				this.addViewTags();
				this.moveToCurrentTag();
				this.routerHistory=this.$store.state.visitTags.visitedTags;
			}
		}		
	}
</script>

<style scoped="scoped">
	.visitTagContainer{clear:both;border-top:1px solid #dcdcdc;height:34px;line-height:32px;overflow:hidden;position:relative;white-space: nowrap;}
	.visitTags{position:absolute}
	.visitTags .routerTags{display:inline-block;margin:0px 5px;color:#000;line-height:2;text-decoration: none;padding:2px 10px;border:1px solid #ddd;font-size: 12px;}
	.visitTags .routerTags:hover{cursor: pointer;}
	.visitTags .routerTags i{margin-left:5px;color:#666;cursor:pointer;text-align: center;line-height:16px;font-size:10px;}
	.visitTags .active{background-color:#42B983;opacity: 1;color:#fff;border:0px}
	.visitTags .active:before{content: "";width: 8px;height:8px;border-radius: 50%;background-color: #fff;display: inline-block;top:12px;margin-right:5px}
	.visitTags .active i{color:#fff}
	
	.tagsMenu{
		width: 150px;
		height: auto;
		position: absolute;
		background-color: #fdfdfd;
		border-radius: 3px;
		border:1px solid #eee;
		z-index: 20;
		-moz-box-shadow: 3px 3px 5px #ddd; /* 老的 Firefox */
		box-shadow: 3px 3px 3px #ddd;
		}
	.tagsMenu ul{margin:0px;padding:0px;}
	.tagsMenu ul li{list-style: none;height:33px;line-height:33px;margin:0px;font-size:12px;}
	.tagsMenu ul li button{padding-left:10px;display: block;width: 100%;text-align: left;color:#999}
	.tagsMenu ul li button:hover{color:#666;background-color:#fafafa}
</style>