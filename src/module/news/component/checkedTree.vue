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
          :load="loadNode"
        ></el-tree>
      </el-scrollbar>
    </div>
</template>

<script>
export default {
  name: "tree",
  data() {
    return {
      checkedTreeData: this.treeData,
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
    
  },
  props: ["treeHeight","treeData"],
  methods: {
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
    loadNode(node, resolve) {
      //动态加载树结构子节点
      if (!this.$refs.elTree) {
        return false;
      }

      this.currentNodeIndex = this.$refs.elCheckedTree.getCurrentNode().index;
      this.loadChannelTree().then(data => {
        if (data.length === 0) {
          resolve([]);
        } else {
          resolve(data);
          this.random = Math.random(0, 1);
        }
      });
    },
    loadChannelTree() {
      /*
       * 根据当前节点id获取树结构子节点
       */
      return new Promise((resolve, reject) => {
        let p = {};
        let unitId = this.user.unitId;
        p.sql =
          "SELECT a.id,a.name,a.pid,b.id AS childId FROM channel AS a LEFT JOIN channel AS b ON a.id = b.pid WHERE a.unitId = '" +
          unitId +
          "' AND a.pid = '" +
          this.currentNodeIndex +
          "' group by a.id ORDER BY a.serialNumber asc";

        this.axios({
          method: "post",
          url: this.baseConfig.url_base,
          data: this.getData("HX_API", "/https/channel/queryForMap.do", p),
          dataType: "JSON"
        })
          .then(result => {
            let resultData = result.data;
            let temporaryTree = [];
            for (let item of resultData) {
              let temporaryTreeItem = {};
              temporaryTreeItem.index = item.id;
              temporaryTreeItem.label = item.name;
              temporaryTree.push(temporaryTreeItem);
            }
            resolve(temporaryTree);
          })
          .catch(error => {
            console.log(error);
          });
      });
    }
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