<template>
  <div class="treeInner">
    <h4 class="title">
      选择发布到的栏目
      <span class="reset" @click="resetTable">重置</span>
    </h4>
    <!--展示树-->
    <el-scrollbar class="treeScroll">
      <el-tree
        ref="elCheckedTree"
        id="elCheckedTree"
        :default-expand-all="checkTree?true:false"
        node-key="id"
        :show-checkbox="checkTree"
        :expand-on-click-node="checkTree?false:true"
        :data="data"
        :props="defaultProps"
        :default-checked-keys="selectedNodes"
        :style="{height:tHeight+'px'}"
        @node-click="nodeClick"
      ></el-tree>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'checkedTree',
  data () {
    return {
      data: this.treeData,
      checkTree: this.isCheckTree,
      checkedNodes: [],
      tHeight: this.treeHeight - 35, // 树高
      defaultProps: {
        // 树形结构默认设置
        id: 'id',
        children: 'children',
        label: 'name'
      },
      currentNodeIndex: ''
    }
  },
  mounted () {},
  props: ['treeData', 'treeHeight', 'selectedNodes', 'isCheckTree'],
  methods: {
    resetTable () {
      this.$refs.elCheckedTree.setCheckedKeys([])
    },
    nodeClick (datas, node, self) {
      if (this.checkTree) {
        this.setNodeChecked(datas, node, self)
      } else {
        this.handleNodeClick(datas, node, self)
      }
    },
    setNodeChecked (datas, node, self) {
      if (node.checked) {
        // 取消
        this.$refs.elCheckedTree.setChecked(node, false, true)
      } else {
        // 添加
        this.$refs.elCheckedTree.setChecked(node, true, true)
      }
      this.checkedNodes = this.$refs.elCheckedTree.getCheckedNodes(true)
      this.$emit('getCheckedNodes', this.checkedNodes)
      // this.$emit("refreshTableByTreeNode", data.index);
    },
    handleNodeClick (data) {
      // data ：节点数据
      this.$emit('refreshTableByTreeNode', data.id)
    }
  },
  watch: {
    treeHeight (val) {
      document.getElementById('elCheckedTree').style.height = val - 35 + 'px'
    },
    treeData (val) {
      this.data = val
    },
    selectedNodes (val) {
      if (val.length === 0) {
        this.$refs.elCheckedTree.setCheckedKeys(val)
      } else {
        this.$nextTick(() => {
          let arr = []
          for (const item of val) {
            arr.push(item.id)
          }
          this.$refs.elCheckedTree.setCheckedKeys(arr)
        })
      }
    }
  }
}
</script>

<style scoped="scoped" lang="stylus">
.treeScroll {
  .el-scrollbar__wrap {
    overflow: auto;
  }
}

.el-tree {
  background-color: inherit;
  padding: 5px;
}

>>>.el-tree-node__children {
  overflow: inherit;
}

.treeInner {
  margin: 0px 25px 0px 0px;
}

.treeInner {
  .title {
    font-size: 14px;
    padding: 14px 0px 14px 20px;
    margin: 0px;
    color: #666;
    font-weight: bolder;
    border-bottom: 1px solid #ebeef5;

    &:before {
      content: '*';
      color: #F56C6C;
      margin-right: 2px;
    }
  }
}

.treeInner {
  .title {
    .reset {
      float: right;
      margin-right: 10px;

      &:hover {
        color: #409eff;
        cursor: pointer;
      }
    }
  }
}
</style>
