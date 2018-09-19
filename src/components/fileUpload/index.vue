<template>
	
</template>

<script>
	/* 
	 * name : keep-alive，组件自身调用、迭代时调用
	 * data* : 组件用到的VUE变量
	 * beforeCreate* : 组件创建（渲染）前，执行(this.$data=undefined,data为上面组件变量对象)
	 * created* : 组件创建（渲染）后，执行(this.$data初始化完成,data为上面组件变量对象)
	 * beforeMount : 挂载到VUE之前,执行
	 * mounted* : 挂载到VUE后执行，一般执行异步方法获取数据，组件对更新后的数据进行重新渲染（组件生命周期中只执行1次）
	 * beforeupdate : 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。
	 * updated : 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
	 * beforeDestroy : 组件销毁前
	 * destroyed : 组件消耗完成后
	 * props : 传递到该组件的变量，字符串形式的参数名
	 * mixins : "混入"，叠加其他组件或者js，mixins的组件或js中的选项必须在VUE选项中，用之前需import，[]组件名数组，非字符串
	 * components : 实例化引入的组件,用之前需import，{}组件名对象，非字符串
	 * methods* : 组件相关方法
	 * watch* : 监控组件值变化，一般是传递到该组件的参数，进而改变组件data中变量值，重新渲染组件
	 * 	 
	 * *为常用的选项
	 */
	export default {
		name:"",		
		data(){
			return {
			
			}
		},
		
		beforeCreate(){
			
		},
		created(){
		
		},
		beforeMount(){
		
		},
		mounted(){
		
		},
		beforeUpdate(){
		
		},
		updated(){
		
		},
		beforeDestroy(){
		
		},
		destroyed(){
		
		},
		props : [''],
		mixins : [],
		components : {},
		methods : {
		
		},
		watch : {
			
		},
		
	}
</script>

<style>
</style>