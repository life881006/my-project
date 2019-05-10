<template>
  
    <div class="treeInner">
      <h4 class="title" @click="resetTable">频道管理</h4>
      <!--展示树-->
      <el-scrollbar class="treeScroll">
        <el-tree
          ref="elTree"
          id="elTree"
          :data="treeData"
          default-expand-all
          :props="defaultProps"
          :style="{height:tHeight+'px'}"
          @node-click="handleNodeClick"
        ></el-tree>
      </el-scrollbar>
    </div>
  
</template>

<script>
export default {
  name: "tree",
  data() {
    return {
      treeData: [],
      tHeight: this.treeHeight, //树高
      defaultProps: {
        //树形结构默认设置
        children: "children",
        label: "name"
      },
      currentNodeIndex: "0",
    };
  },
  mounted() {
    /*
     * 获取树结构channels
     * news.js
     * this.loadChannelTree().then(data => {
     * this.treeData = data;
     * });
     */
    this.loadChannel();
  },
  props: ['treeHeight'],
  methods: {
    loadChannel() {
      // const sql =
      //   "SELECT id,name,pid FROM channel WHERE unitId = '" +
      //   this.user.unitId +
      //   "' order by serialNumber asc";

      const sql = `SELECT id,name,pid FROM channel WHERE unitId = '${this.user.unitId}' order by serialNumber asc`;
      
      const p = {};
      p.sql = sql;
      
      this.axios.getObjs(p).then(data=>{
        this.treeData = this.formatTreeData(data);//按树状结构格式化结果集
      });
    },
    resetTable() {
      this.currentNodeIndex = "0";
      this.$emit("refreshTableByTreeNode", this.currentNodeIndex);
    },
    handleNodeClick(data) {
      //data ：节点数据
      this.$emit("refreshTableByTreeNode", data.id);
    },
    /**
     * //动态加载树结构子节点
    loadNode(node, resolve) {
      
      if (!this.$refs.elTree) {
        return false;
      }

      this.currentNodeIndex = this.$refs.elTree.getCurrentNode().index;
      this.loadChannelTree().then(data => {
        if (data.length === 0) {
          resolve([]);
        } else {
          resolve(data);
          this.random = Math.random(0, 1);
        }
      });
    },
    根据当前节点id获取树结构子节点
    loadChannelTree() {
     
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
    */
  },
  watch: {
    treeHeight(val) {
      document.getElementById("elTree").style.height = val + "px";
    }
  }
};
</script>

<style scoped="scoped" lang="stylus">
h4.title 
  cursor: pointer;


.el-tree 
  background-color: inherit;
  padding: 5px;


>>>.el-tree-node__children 
  overflow: inherit;


.treeInner 
  margin: 0px 25px 0px 0px;
  background-color: #FAFAFA;
  
.treeScroll
  .el-scrollbar__wrap 
    overflow: auto

.treeInner 
  .title 
    font-size: 14px;
    padding: 14px 0px 14px 20px;
    margin: 0px;
    color: #666;
    font-weight: bolder;
    border-bottom: 1px solid #ebeef5;
  


.treeInner 
  .title 
    &:hover 
      color: #409eff;
    
  

</style>