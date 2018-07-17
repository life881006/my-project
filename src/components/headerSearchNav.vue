<template>
	<el-row>
		<el-col :xs="22" :sm="22" :md="22" :lg="22">
		<el-select ref="ssss" v-model="eee" placeholder="请选择" @change="changeValue">
			<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
		</el-select>
		<el-input placeholder="请输入内容" v-model="input10" clearable>
			
		</el-input>
		<el-button type="primary" icon="el-icon-search">检索</el-button>
		</el-col>
		
		<el-col :xs="2" :sm="2" :md="2" :lg="2">
			<el-button type="primary" icon="el-icon-circle-plus-outline" @click="dialogVisible = true">添加</el-button>
		</el-col>
		<el-dialog
		  title="提示"
		  :visible.sync="dialogVisible"
		  width="50%" 
		  top="5vh"
		  >
		  <!--:before-close="handleClose"-->
		  <div class="dialogMain">
		  <addTable></addTable>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		  </span>
		</el-dialog>
	</el-row>
</template>

<script>
	import addTable from "./addTable"
	
	export default {		
		data(){
			return {
				input10:"",
				options:[{
					value:"aaaaddsadsad",
					label:"bbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
					disabled:true
				},{
					value:"cccdsadsadsa",
					label:"bbbeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
				}],
				eee:"",
				dialogVisible: false 
			}
		},
		components:{addTable},
		methods : {
			changeValue:function(value) {
				let obj = this.options.find(function(item){
					return item.value == value;
				});
			},
//			handleClose(done) {
//		        this.$confirm('确认关闭？').then(_ => {
//		            done();
//		         }).catch(_ => {});
//		    }
		}
	}
</script>

<style scoped="">
	.serText{text-align: center;min-width: 100px;display: inline-block;}
	
	.el-input{
		width: 180px;
		height:40px;
		line-height: 40px;
	}
	.dialogMain{height:320px;overflow-y:auto;}
</style>