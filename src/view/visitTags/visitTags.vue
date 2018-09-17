<template>
	<div @click="hideMenu">
		<div class="visitTagContainer" ref="visitTagContainer" @wheel.prevent="handleScroll">
			<div class="visitTags" ref="visitTags" :style="{left:left+'px'}">
				<router-link 
					:class="[isActive(item.path)?'active':'','routerTags']" 
					:key="item.path" 
					ref="item" 
					:to="item.path" 
					v-for="item in Array.from(routerHistory)" 
					@contextmenu.native.prevent="showTagsMenu" 
					>{{item.title}}
				<i class="el-icon-close"  v-on:click.stop.prevent="deleteVisitor(item.path)"></i>
				</router-link>
			</div>
		</div>
		<div id="tagMenu" class="tagsMenu" :style="{'display':tagsMenuShow?'block':'none'}">
			<ul>
				<li><a @click="deleteCurrentTag">关闭</a></li>
				<li><a @click="">关闭其他</a></li>
				<li><a @click="deleteAllTag">全部关闭</a></li>
			</ul>
		</div>
	</div>
</template>

<script>
	const padding=15;
	export default{
		name:"visitTags",
		beforeCreate(){//直接访问三级路由跳转到二级路由
			const path = this.$router.history.current.path;
			if(path.split("/").length>3){
				const pathArr = path.split("/");
				this.$router.push("/"+pathArr[1]+"/"+pathArr[2]);
				return false;
			}
		},
		data:function(){
			return {
				left: 0,
				routerHistory:this.$store.state.visitTags.visitedTags,
				tagsMenuShow: false,
				currentTagPath:"",
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
			deleteVisitor(path){
				this.$store.dispatch('deleteSingleTag',path).then((items)=>{
					if(this.isActive(path)){
						const lastVisited = items.slice(-1)[0];
						if(lastVisited){
							this.$router.push(lastVisited);
						}else{
							this.$router.push("/");
						}
					}else{
						
					}
				});//再继续操作
			},			
			isActive(path){
				return this.$router.history.current.path === path;
			},
			moveToCurrentTag() {
			    const items = this.$refs.item;			    
			    this.$nextTick(() => {			    	
				    for (const item of items) {
				        if (item.to === this.$route.path) {
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
		    	document.getElementById("tagMenu").style.left = event.x+"px";
		    	document.getElementById("tagMenu").style.top = event.y+"px";
		    	this.tagsMenuShow = true;
		    },
		    deleteCurrentTag(){
		    	const path = this.currentTagPath.substr(this.currentTagPath.indexOf("#")+1,this.currentTagPath.length);
		    	this.deleteVisitor(path);
		    },
		    deleteAllTag(){
		    	this.$store.dispatch("deleteAllTags").then((data)=>{
		    		this.routerHistory = data;		    		
		    		this.$router.push(data[0].path);
		    	});
		    }
		},
		watch:{
			$route(to,from){
				//if(to.path.split("/").length>3){
				//	return false;
				//}
				this.addViewTags();
				this.moveToCurrentTag();
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
	
	.tagsMenu{width: 150px;height: 100px;position: absolute;background-color: #fff;border-radius: 3px;border:1px solid #fafafa;z-index: 20;}
	.tagsMenu ul{margin:0px;padding:0px;}
	.tagsMenu ul li{list-style: none;height:33px;line-height:33px;margin:0px;font-size:12px;color:#666;}
	.tagsMenu ul li a{padding-left:10px;display: block;}
	.tagsMenu ul li a:hover{cursor: pointer;background-color: #fdfdfd;}
</style>