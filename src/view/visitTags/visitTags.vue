<template>
	<div class="visitTagContainer" ref="visitTagContainer" @wheel.prevent="handleScroll">
		<div class="visitTags" ref="visitTags" :style="{left:left+'px'}">
			<router-link :class="[isActive(item)?'active':'','routerTags']" :key="item.path" ref="item" :to="item.path" v-for="item in Array.from(routerHistory)">{{item.title}}
			<i class="el-icon-close"  v-on:click.stop.prevent="deleteVisitor(item)"></i>
			</router-link>
		</div>
	</div>
</template>

<script>
	const padding=15
	export default{
		name:"visitTags",
		data:function(){
			return {
				left: 0,
				routerHistory:this.$store.state.visitTags.visitedTags
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
			deleteVisitor(item){
				this.$store.dispatch('deleteSingleTag',item).then((items)=>{
					if(this.isActive(item)){
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
			isActive(Obj){
				return this.$router.history.current.path === Obj.path;
			},
			moveToCurrentTag() {
			    const items = this.$refs.item
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
		    }
		},
		watch:{
			$route(to,from){
				if(to.path.split("/").length>3){
					return false;
				}
				this.addViewTags();
				this.moveToCurrentTag();
			}
		}		
	}
</script>

<style >
	
</style>