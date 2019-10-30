<template>
  <el-form
    ref="newsEditform"
    :model="newsEditform"
    label-width="100px"
    :style="{'height':mainContentHeight+105+'px',overflow:'hidden'}"
  >
    <!--基础设置栏-->
    <div class="toolBar">
      <el-dropdown trigger="click">
        <el-button class="el-dropdown-link">
          置顶
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </el-button>
        <el-dropdown-menu class="dropDownMenu" slot="dropdown">
          <el-form-item label-width="0px" prop="isTop">
            <el-radio v-model="newsEditform.isTop" label="0">否</el-radio>
            <el-radio v-model="newsEditform.isTop" label="1">是</el-radio>
          </el-form-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-dropdown trigger="click">
        <el-button class="el-dropdown-link">
          发布到
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </el-button>
        <el-dropdown-menu class="dropDownMenu" slot="dropdown">
          <el-form-item label-width="0px">
            <el-checkbox-group v-model="newsEditform.releaseTo">
              <el-checkbox label="releaseSite" key="releaseSite">网站</el-checkbox>
              <el-checkbox label="releaseWx" key="releaseWx">微信</el-checkbox>
              <el-checkbox label="releaseMicroblog" key="releaseMicroblog">微博</el-checkbox>
              <el-checkbox label="releaseApp" key="releaseApp">APP</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-dropdown trigger="click">
        <el-button class="el-dropdown-link">
          自动发布
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </el-button>
        <el-dropdown-menu class="dropDownMenu" slot="dropdown">
          <el-form-item label-width="0px" prop="isAutoAppear">
            <el-radio v-model="newsEditform.isAutoAppear" label="0">否</el-radio>
            <el-radio v-model="newsEditform.isAutoAppear" label="1">是</el-radio>
          </el-form-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-dropdown trigger="click">
        <el-button class="el-dropdown-link">
          允许评论
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </el-button>
        <el-dropdown-menu class="dropDownMenu" slot="dropdown">
          <el-form-item label-width="0px" prop="isReview">
            <el-radio v-model="newsEditform.isReview" label="0">否</el-radio>
            <el-radio v-model="newsEditform.isReview" label="1">是</el-radio>
          </el-form-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-dropdown trigger="click">
        <el-button class="el-dropdown-link">
          大图稿件
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </el-button>
        <el-dropdown-menu class="dropDownMenu" slot="dropdown">
          <el-form-item label-width="0px" prop="isBigImage">
            <el-radio v-model="newsEditform.isBigImage" label="0">否</el-radio>
            <el-radio v-model="newsEditform.isBigImage" label="1">是</el-radio>
          </el-form-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-dropdown trigger="click">
        <el-button class="el-dropdown-link">
          电视稿件
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </el-button>
        <el-dropdown-menu class="dropDownMenu" slot="dropdown">
          <el-form-item label-width="0px" prop="isOriginal">
            <el-radio v-model="newsEditform.isOriginal" label="0">否</el-radio>
            <el-radio v-model="newsEditform.isOriginal" label="1">是</el-radio>
          </el-form-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-dropdown trigger="click">
        <el-button class="el-dropdown-link">
          外链
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </el-button>
        <el-dropdown-menu class="dropDownMenu" slot="dropdown">
          <el-form-item label-width="0px" prop="linkUrl">
            <el-input
              style="width:400px"
              v-model="newsEditform.linkUrl"
              size="small"
              placeholder="填写外链地址"
            >
              <template slot="prepend">外链地址</template>
            </el-input>
          </el-form-item>
        </el-dropdown-menu>
      </el-dropdown>

      <div class="operations">
        <el-form-item label-width="0px" class="right">
          <el-button type="primary" icon="el-icon-success" @click="update">提交</el-button>
          <el-button @click="reloadData">重置</el-button>
        </el-form-item>
      </div>
    </div>

    <breadCom></breadCom>
    <el-row>
      <el-col :xs="5" :sm="5" :md="5" :lg="5">
        <hx-tree
          :treeData="channelsTreeData"
          :isCheckTree="true"
          :selectedNodes="selectedChannels"
          :treeHeight="mainContentHeight+10"
          @getCheckedNodes="getCheckedNodes"
        ></hx-tree>
      </el-col>
      <el-col
        :xs="19"
        :sm="19"
        :md="19"
        :lg="19"
        :style="{'height':mainContentHeight+50+'px','overflow':'hidden'}"
      >
        <el-scrollbar class="mainScroll">
          <el-form-item label="标题" :rules="filter_inputs('required')" prop="title">
            <el-input v-model="newsEditform.title" placeholder="请输入内容"></el-input>
          </el-form-item>

          <el-form-item label="正文">
            <editor ref="tinyMce" :tinyMce="tinyMceParams" :content="editorText"></editor>
            <transition name="el-zoom-in-top">
              <span class="tinyMeceInfo">{{newsEditform.tinyMceInfo}}</span>
            </transition>
          </el-form-item>

          <el-row>
            <el-col :span="8">
              <el-form-item label="作者" :rules="filter_inputs('required')" prop="author">
                <el-input v-model="newsEditform.author"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="来源" prop="transfer">
                <el-input v-model="newsEditform.transfer"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="编辑" prop="editor">
                <el-input v-model="newsEditform.editor"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item label="发布时间" :rules="filter_inputs('required')" prop="appearDate">
                <el-date-picker
                  v-model="newsEditform.appearDate"
                  type="datetime"
                  placeholder="请选择发布时间"
                  value-format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="编辑时间" :rules="filter_inputs('required')" prop="editTime">
                <el-date-picker
                  v-model="newsEditform.editTime"
                  type="datetime"
                  placeholder="请选择发布时间"
                  value-format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="上传附件">
            <upload
              :rootPath="annexRootPath"
              :fileListData="fileListData"
              @uploadAnnex="uploadAnnex"
              @removeAnnexItem="removeAnnexItem"
            ></upload>
          </el-form-item>
        </el-scrollbar>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import editor from '@/components/util/tinyMce/tinyMce'
import breadCom from '@/components/service/Breadcrumbs'
import upload from '@/components/service/file-upload/index' // 任意格式图片上传
import HxTree from '@/components/util/Tree'

import newsMethods from './methods/news' // news公用方法

export default {
  name: '',
  data () {
    return {
      newsId: this.$route.query.id,
      annexRootPath:
        '/allWeb/huixue/' + this.unitConfig.siteGroupAccountNumber + '/news', // 上传文件存放路径
      tinyMceParams: {
        // 编辑器参数设置
        name: 'newsTinyMce',
        width: '99.7%',
        height: '200px',
        plugins: [], // 编辑器插件,不填写加载默认插件
        toolBar: [], // 工具栏图标显示，不填写加载默认图标
        styleFormats: [], // 文本编辑器中内容样式
        isShowMenuBar: true // 是否显示菜单栏
      },
      fileListData: [], // 附件列表
      newsEditform: {
        id: '',
        title: '',
        checkedChannels: [],
        type: '0',
        linkUrl: '',
        tinyMceInfo: '',
        author: '',
        transfer: '',
        appearDate: '',
        editTime: '',
        editor: '',
        isAutoAppear: '0',
        isReview: '0',
        isBigImage: '0',
        releaseTo: [],
        isTop: '0',
        isOriginal: '0'
      },
      editorText: {
        // 保存到VUEX的编辑器内容，参数path：调用组件路径，content：编辑器内容
        path: this.$route.path,
        content: ''
      },
      channelsKeyArr: [],
      checkAll: false,
      isIndeterminate: false,
      channelsTreeData: [],
      selectedChannels: []
    }
  },
  mounted () {
    this.getTreeDatas()
    this.laodNewsMsg()
  },
  activated () {
    this.$store.dispatch('updateRouter', this.$route)

    this.newsId = this.$route.query.id
    this.selectedChannels = []
    this.channelsKeyArr = []
    this.channelsTreeData = []

    this.fileListData = []
    this.getTreeDatas()
    this.laodNewsMsg()
  },
  props: ['mainContentHeight'],
  mixins: [newsMethods],
  components: { editor, upload, breadCom, HxTree },
  methods: {
    laodNewsMsg () {
      const p = {}

      p.id = this.newsId
      p.tableName = 'news'

      this.axios.get('/news/getNews', { params: this.newsId }).then(data => {
        this.newsEditform.id = data.id
        this.newsEditform.type = data.type
        this.newsEditform.linkUrl = data.linkUrl
        this.newsEditform.tinyMceInfo = ''
        this.newsEditform.author = data.author
        this.newsEditform.transfer = data.transfer
        this.newsEditform.editor = data.editor
        this.newsEditform.isAutoAppear = data.isAutoAppear + ''
        this.newsEditform.isReview = data.isReview + ''
        this.newsEditform.isBigImage = data.isBigImage + ''

        if (data.releaseSite === 1) {
          this.newsEditform.releaseTo.push('releaseSite')
        }
        if (data.releaseWx === 1) {
          this.newsEditform.releaseTo.push('releaseWx')
        }
        if (data.releaseMicroblog === 1) {
          this.newsEditform.releaseTo.push('releaseMicroblog')
        }
        if (data.releaseApp === 1) {
          this.newsEditform.releaseTo.push('releaseApp')
        }
        this.newsEditform.isTop = data.isTop + ''
        this.newsEditform.isOriginal = data.isOriginal + ''
        this.newsEditform.title = data.title

        this.newsEditform.appearDate = new Date(data.appearDate).Format(
          'YYYY-MM-DD HH:mm:ss'
        )
        this.newsEditform.editTime = new Date(data.editTime).Format(
          'YYYY-MM-DD HH:mm:ss'
        )
        this.editorText.content = data.content
        this.$refs.tinyMce.setContent(data.content)

        let channels = []

        data.channels.forEach(element => {
          const item = {}
          item.id = element.channelId
          channels.push(item)
        })
        this.selectedChannels = channels

        let annexes = []

        data.annexes.forEach(element => {
          element.info = ''
          element.isFirst = element.isFirst ? '0' : '1'
          element.status = element.status ? '1' : '0'
          element.hover = false
          element.edit = false
          element.editSerialNumber = false
          annexes.push(element)
        })
        this.fileListData = annexes
      })
    },
    reloadData () {
      // 重置表单
      this.laodNewsMsg()
    },
    update () {
      // 表单更新方法
      this.editorText = this.$refs.tinyMce.getMceContent() // 获取文本编辑器内容

      if (this.editorText.html === '') {
        // 文本编辑器纯文本内容验证
        this.newsEditform.tinyMceInfo = '请填写文章正文'
        return false
      } else {
        this.newsEditform.tinyMceInfo = ''
      }

      if (this.selectedChannels.length === 0) {
        this.$message({
          type: 'error',
          message: '请选择发布到的栏目'
        })
        return false
      }

      this.$refs['newsEditform'].validate(valid => {
        // 验证
        if (valid) {
          // 验证通过后操作
          const json = this.newsEditform

          json.channels = this.selectedChannels
          json.annexes = this.fileListData
          json.content = this.editorText.html
          json.unitId = this.user.unitId
          json.userId = this.user.userId

          this.axios.put('/news/updateNews', json).then(data => {
            if (data.data === 'true') {
              this.$message({
                type: 'success',
                message: '已更新'
              })
              let path = this.$route.path
              this.$store.dispatch('deleteSingleTag', path).then(items => {
                this.$router.push({
                  name: 'newsList',
                  params: { refresh: true }
                })
                this.$route.meta.keepAlive = false
              })
            }
          })
        }
      })
    },
    getCheckedNodes (checkedNodes) {
      this.selectedChannels = checkedNodes
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.mainScroll {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}

.controll {
  text-align: center;
}

.tinyMeceInfo {
  font-size: 12px;
  color: #f56c6c;
  transition: height 0.5s;
}

.mainScroll {
  .el-scrollbar__wrap {
    overflow: auto;
  }
}

.toolBar {
  height: 50px;
  line-height: 50px;
  width: auto;
  background-color: #ededed;
  padding: 0px 10px;
}

.toolBar {
  .operations {
    display: inline-block;
    float: right;
    margin-top: 5px;
  }
}

.toolBar .el-form-item, .dropDownMenu .el-form-item {
  margin-bottom: 0px;
}

.dropDownMenu {
  padding: 5px 20px;
  margin-top: 0px;
}

.releaseToIcon {
  font-size: 20px;
}
</style>
