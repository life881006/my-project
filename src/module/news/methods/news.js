export default {
  methods: {
    getTreeDatas () { // 获取栏目
      const unitId = this.user.unitId
      this.axios.get('/news/getNewsChannels', { params: unitId }).then(data => {
        this.channelsTreeData = this.formatTreeData(data)// 树结构格式化
      })
    },
    getMainData () { // 获取主表数据
      let p = {}
      p.unitId = this.user.unitId// 登录账号ID
      p.channelId = this.currentNode// 当前频道ID
      p.page = { everyPage: this.pageObj.everyPage, currentPage: this.pageObj.currentPage }
      p.conditions = this.conditions

      this.axios.post('/news/getNewsByPage', p).then(data => {
        this.pageObj = data.page
        this.$store.dispatch('paginationAdd', this.pageObj)// 将页码信息插入
        this.tableData = data.objs
        this.loading = false
      })
    },
    getMainDataByPage () { // 仅获取主表数据
      let p = {}
      p.unitId = this.user.unitId// 登录账号ID
      p.channelId = this.currentNode// 当前频道ID
      p.page = { everyPage: this.pageObj.everyPage, currentPage: this.pageObj.currentPage }
      p.conditions = this.conditions

      this.axios.post('/news/getNewsByCurrentPage', p).then(data => {
        this.$store.dispatch('paginationAdd', this.pageObj)// 将页码信息插入
        this.tableData = data
        this.loading = false
      })
    },
    handleSelectionChange (data) { // 主表数据选中
      this.dataSelections = data
    },
    setPageSize (page) { // 变更每页条数
      this.loading = true
      this.pageObj = page
      this.getMainData()
    },
    setCurrentPage (page) { // 转到指定页
      this.loading = true
      this.pageObj = page
      this.getMainData()
    },
    gotoAdd () { // 打开弹窗
      this.$router.push('/news/newsAdd')
    },
    refreshTable () { // 子组件普通刷新主表
      this.loading = true
      this.pageObj.currentPage = 1
      this.getMainData()
    },
    refreshTableByPages () { // 仅刷新主表数据，不刷新分页
      this.loading = true
      this.getMainDataByPage()
    },
    refreshTableBySearch (conditions) { // 查询组件刷新主表
      this.loading = true
      this.conditions = conditions
      this.pageObj.currentPage = 1
      this.getMainData()
    },
    refreshTableByTreeNode (nodeIndex) { // 树组件刷新主表
      this.loading = true
      this.currentNode = nodeIndex
      this.pageObj.currentPage = 1
      this.getMainData()
    },
    uploadAnnex (response) { // 上传附件
      let p = response.data
      let fileName = p.annexName.substring(0, p.annexName.lastIndexOf('.'))
      p.annexName = fileName
      p.info = ''
      p.hover = false
      p.edit = false
      p.editSerialNumber = false
      if (this.isFirstButton) {
        p.isFirst = '0'
      }
      if (this.statusButton) {
        p.status = '1'
      }

      p.fbScheme = this.unitConfig.fbScheme
      p.fbIp = this.unitConfig.fbIp
      p.fbPort = this.unitConfig.fbPort
      p.fbName = this.unitConfig.fbName
      p.fbRootPath = this.unitConfig.fbRootPath

      this.axios.post('/news/fileUpload', p).then(data => {
        this.$message({
          type: 'info',
          message: '附件上传成功'
        })
        let uploadItem = data
        uploadItem.edit = false
        uploadItem.hover = false
        uploadItem.info = ''
        this.fileListData.push(uploadItem)
      })
    },
    removeAnnexItem (index) { // 删除附件后更新附件列表
      this.$confirm('此操作将永久删除该附件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const annexItem = this.fileListData[index]
        this.axios.delete('/news/deleteUploadFile', { params: annexItem.id }).then(data => {
          if (data) {
            this.fileListData.splice(index, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            this.$message({
              type: 'success',
              message: '删除失败!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      })
    }
  }
}
