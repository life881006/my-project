<template>
    <div class="treeInner">
      <h4 class="title">
          选择发布到的栏目
          <span class="reset" @click="resetTable">重置</span>
      </h4>
      <!--展示树-->
      <el-scrollbar class="treeScroll" >
        <el-tree
          ref="elCheckedTree"
          id="elCheckedTree"
          :default-expand-all="isExpandAll"
          node-key="id"
          show-checkbox
          :data="checkedTreeData"
          :props="defaultProps"
          :style="{height:tHeight+'px'}"
          @check-change="nodeChecked"
          @node-click="nodeClick"
        ></el-tree>
      </el-scrollbar>
    </div>
</template>

<script>
export default {
  name: "tree",
  data() {
    return {
      checkedTreeData: [],
      tHeight: this.treeHeight - 35, //树高
      isExpandAll: true,
      defaultProps: {
        //树形结构默认设置
        children: "children",
        label: "name"
      },
      currentNodeIndex: "0",
    };
  },
  mounted() {
    this.loadChannel();
  },
  props: ["treeHeight"],
  methods: {
    loadChannel() {
      const sql = `SELECT id,name,pid FROM channel WHERE unitId = '${this.user.unitId}' order by serialNumber asc`;
      const p = {};
      p.sql = sql;

      this.axios.getObjs(p).then(data=>{
        this.checkedTreeData = this.formatTreeData(data);//按树状结构格式化结果集
      })

    },
    resetTable() {
      this.$refs.elCheckedTree.setCheckedKeys([]);
    },
    nodeChecked(data,checked,indeterminate) {
      //data ：节点数据
      console.log(data);
      //this.$emit("refreshTableByTreeNode", data.index);
    },
    nodeClick(data){
      
    },
  },
  watch: {
    treeHeight(val) {
      document.getElementById("elCheckedTree").style.height = val - 35 + "px";
    },
    treeData(val){
      this.checkedTreeData = val;
    }
  }
};
</script>

<style scoped="scoped" lang="stylus">

.treeScroll
  .el-scrollbar__wrap 
    overflow: auto

.el-tree 
  background-color: inherit
  padding: 5px

>>>.el-tree-node__children 
  overflow: inherit

.treeInner
  margin: 0px 25px 0px 0px

.treeInner 
  .title 
    font-size: 14px
    padding: 14px 0px 14px 20px
    margin: 0px
    color: #666
    font-weight: bolder
    border-bottom: 1px solid #ebeef5

    &:before
      content:'*'
      color:#F56C6C
      margin-right:2px

.treeInner 
  .title 
    .reset
      float:right
      margin-right:10px

      &:hover 
        color: #409eff
        cursor: pointer
    
</style>