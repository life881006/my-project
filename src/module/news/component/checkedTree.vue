<template>
    <div class="treeInner">
      <h4 class="title" @click="resetTable">选择发布到的栏目</h4>
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
      const sql =
        "SELECT id,name,pid FROM channel WHERE unitId = '" +
        this.user.unitId +
        "' order by serialNumber asc";
      let p = {};
      p.sql = sql;

      this.axios({
        url: this.baseConfig.url_base,
        dataType: "JSON",
        method: "post",
        data: this.getData("HX_API", "/https/channel/queryForMap.do", p)
      })
        .then(result => {
          this.checkedTreeData = this.formatTreeData(result.data);
          // for (let item of result.data) {//频道全选模式key数组
          //   this.channelsKeyArr.push(item.id);
          // }
        })
        .catch(error => {
          console.log(error);
        });
    },
    resetTable() {
      this.$emit("refreshTableByTreeNode", this.currentNodeIndex);
    },
    nodeChecked(data,checked,indeterminate) {
      //data ：节点数据
      console.log(data);
      console.log(checked);
      console.log(indeterminate);
      //this.$emit("refreshTableByTreeNode", data.index);
    },
    nodeClick(data){
      console.log(data);
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
h4.title 
  cursor: pointer

.treeScroll
  .el-scrollbar__wrap 
    overflow: auto

.el-tree 
  background-color: inherit
  padding: 5px

>>>.el-tree-node__children 
  overflow: inherit

.treeInner 
  .title 
    font-size: 14px
    padding: 14px 0px 14px 20px
    margin: 0px
    color: #666
    font-weight: bolder
    border-bottom: 1px solid #ebeef5

.treeInner 
  .title 
    &:hover 
      color: #409eff
    
</style>