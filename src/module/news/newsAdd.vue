<template>
  <el-form
    ref="newsAddform"
    :model="newsAddform"
    label-width="100px"
    :style="{'height':formHeight+65+'px',overflow:'hidden'}"
  >
    <!--基础设置栏-->
    <el-row class="toolBar">
      <el-col :xs="18" :sm="18" :md="18" :lg="18">
        <el-dropdown trigger="click">
          <el-button class="el-dropdown-link">置顶
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </el-button>
          <el-dropdown-menu class="dropDownMenu" slot="dropdown">
            <el-form-item label-width="0px" prop="isTop">
              <el-radio v-model="newsAddform.isTop" label="0">否</el-radio>
              <el-radio v-model="newsAddform.isTop" label="1">是</el-radio>
            </el-form-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown trigger="click">
          <el-button class="el-dropdown-link">发布到
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </el-button>
          <el-dropdown-menu class="dropDownMenu" slot="dropdown">
            <el-form-item label-width="0px">
              <el-checkbox-group v-model="newsAddform.releaseTo">
                <el-checkbox label="releaseSite" key="releaseSite">网站</el-checkbox>
                <el-checkbox label="releaseWx" key="releaseWx">微信</el-checkbox>
                <el-checkbox label="releaseMicroblog" key="releaseMicroblog">微博</el-checkbox>
                <el-checkbox label="releaseApp" key="releaseApp">APP</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown trigger="click">
          <el-button class="el-dropdown-link">自动发布
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </el-button>
          <el-dropdown-menu class="dropDownMenu" slot="dropdown">
            <el-form-item label-width="0px" prop="isAutoAppear">
              <el-radio v-model="newsAddform.isAutoAppear" label="0">否</el-radio>
              <el-radio v-model="newsAddform.isAutoAppear" label="1">是</el-radio>
            </el-form-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown trigger="click">
          <el-button class="el-dropdown-link">允许评论
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </el-button>
          <el-dropdown-menu class="dropDownMenu" slot="dropdown">
            <el-form-item label-width="0px" prop="isReview">
              <el-radio v-model="newsAddform.isReview" label="0">否</el-radio>
              <el-radio v-model="newsAddform.isReview" label="1">是</el-radio>
            </el-form-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown trigger="click">
          <el-button class="el-dropdown-link">大图稿件
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </el-button>
          <el-dropdown-menu class="dropDownMenu" slot="dropdown">
            <el-form-item label-width="0px" prop="isBigImage">
              <el-radio v-model="newsAddform.isBigImage" label="0">否</el-radio>
              <el-radio v-model="newsAddform.isBigImage" label="1">是</el-radio>
            </el-form-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown trigger="click">
          <el-button class="el-dropdown-link">电视稿件
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </el-button>
          <el-dropdown-menu class="dropDownMenu" slot="dropdown">
            <el-form-item label-width="0px" prop="isOriginal">
              <el-radio v-model="newsAddform.isOriginal" label="0">否</el-radio>
              <el-radio v-model="newsAddform.isOriginal" label="1">是</el-radio>
            </el-form-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown trigger="click">
          <el-button class="el-dropdown-link">外链
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </el-button>
          <el-dropdown-menu class="dropDownMenu" slot="dropdown">
            <el-form-item label-width="0px" prop="linkUrl">
              <el-input
                style="width:400px"
                v-model="newsAddform.linkUrl"
               
                placeholder="填写外链地址"
              >
                <template slot="prepend">外链地址</template>
              </el-input>
            </el-form-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>

      <el-col :xs="6" :sm="6" :md="6" :lg="6" class="operations">
        <el-button type="primary" icon="el-icon-success" @click="add('newsAddform')">提交</el-button>
        <el-button @click="reset('newsAddform')">重置</el-button>
      </el-col>
    </el-row>

    <breadCom></breadCom>
				<el-row>
				<el-col :xs="5" :sm="5" :md="5" :lg="5">
					<tree :treeData="channels" :treeHeight="treeHeight"></tree>
				</el-col>
      
				<el-col :xs="19" :sm="19" :md="19" :lg="19" :style="{'height':formHeight+10+'px','overflow':'hidden'}">
          <el-scrollbar class="mainScroll">

				<!--         
				<el-form-item label="文章分类" :rules="filter_inputs('required')" prop="checkedChannels">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group
            v-model="newsAddform.checkedChannels"
            @change="handleCheckedChannelChange"
          >
            <el-checkbox
              v-for="channel in channels"
              :label="channel.id"
              :key="channel.id"
            >{{channel.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item> 
				-->

        <el-form-item label="标题" :rules="filter_inputs('required')" prop="title">
          <el-input v-model="newsAddform.title" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="正文">
          <editor ref="tinyMce" :tinyMce="tinyMceParams"></editor>
          <transition name="el-zoom-in-top">
            <span class="tinyMeceInfo">{{newsAddform.tinyMceInfo}}</span>
          </transition>
        </el-form-item>

        <el-row>
          <el-col :span="8">
            <el-form-item label="作者" :rules="filter_inputs('required')" prop="author">
              <el-input v-model="newsAddform.author"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="来源" prop="transfer">
              <el-input v-model="newsAddform.transfer"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="编辑" prop="editor">
              <el-input v-model="newsAddform.editor"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="发布时间" :rules="filter_inputs('required')" prop="appearDate">
              <el-date-picker
                v-model="newsAddform.appearDate"
                type="datetime"
                placeholder="请选择发布时间"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="编辑时间" :rules="filter_inputs('required')" prop="editTime">
              <el-date-picker
                v-model="newsAddform.editTime"
                type="datetime"
                placeholder="请选择发布时间"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <!--
			elementUi普通附件上传
        -->
        <el-form-item label="上传附件">
          <upload
            :configData="configData"
            :fileListData="fileListData"
            @getUploadedAnnex="getUploadedAnnex"
          ></upload>
        </el-form-item>
        
        </el-scrollbar>
				</el-col>
				</el-row>
        <!--
			cropper图片裁切上传组件
		
		<el-form-item label="裁剪图片">
			<cropper :configData="configData" :fileListData="fileListData" :cropperSize="cropperSize" @getUploadedAnnex="getUploadedAnnex"></cropper>
		</el-form-item>
        -->
        <!--嵌套的dialog必须加append-to-body
		<el-dialog title="3313" :visible.sync="see" width="60%" top="5vh" append-to-body>
			
		</el-dialog>
        -->
      
  </el-form>
</template>

<script>
//引入编辑器
import editor from "@/components/tinyMce/tinyMce";
import breadCom from "@/components/breadComponent/breadCom";
import upload from "@/components/fileUpload/index"; //任意格式图片上传
import tree from '@/module/news/component/checkedTree'
//import cropper from "@/components/cropper/index"//裁切图片

export default {
  name: "newsAdd",
  data() {
    return {
      formHeight: this.mainContentHeight + 50,
      treeHeight: this.mainContentHeight,
      cropperSize: {
        //裁切框大小
        width: 700,
        height: 360
      },
      configData: {
        //附件上传参数（任意附件形式及裁切框公用）
        isFirstButton: true, //首选图按钮
        statusButton: true, //是否显示按钮
        api: "HX_API",
        action: this.baseConfig.url_base2,
        rootPath: "/allWeb/huixue/news",
        addAnnexHandle: "/https/newsAnnex/add.do",
        deleteAnnexHandle: "/https/newsAnnex/delete.do"
      },
      fileListData: [], //附件列表（任意附件形式及裁切框公用）
      newsAddform: {
        title: "",
        checkedChannels: [],
        type: "0",
        linkUrl: "",
        tinyMceInfo: "",
        author: this.user.realName,
        transfer: this.user.realName,
        appearDate: this.moment(new Date().getTime()).format(
          "YYYY-MM-DD HH:MM:SS"
        ),
        editTime: this.moment(new Date().getTime()).format(
          "YYYY-MM-DD HH:MM:SS"
        ),
        editor: this.user.realName,
        isAutoAppear: "0",
        isReview: "0",
        isBigImage: "0",
        releaseTo: [],
        isTop: "0",
        isOriginal: "0"
      },
      tinyMceParams: {
        //编辑器参数设置
        name: "newsTinyMce",
        width: "99.7%",
        height: "200px",
        plugins: [], //编辑器插件,不填写加载默认插件
        toolBar: [], //工具栏图标显示，不填写加载默认图标
        styleFormats: [], //文本编辑器中内容样式
        isShowMenuBar: true //是否显示菜单栏
      },
      editorText: {},
      channels: [],
      //channelsKeyArr: [],//全选数组
      checkAll: false,
      isIndeterminate: false,
      annexesList: []
    };
  },
  props: ["mainContentHeight"],
  components: { editor, breadCom, upload, tree }, //cropper
  mounted: function() {
    this.loadChannel();
  },
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
          this.channels = this.formatTreeData(result.data);
          // for (let item of result.data) {//频道全选模式key数组
          //   this.channelsKeyArr.push(item.id);
          // }
        })
        .catch(error => {
          console.log(error);
        });
    },
    add(formName) {
      //表单添加方法
      this.editorText = this.$refs.tinyMce.getMceContent(); //获取文本编辑器内容
      if (this.editorText.text === "") {
        //文本编辑器纯文本内容验证
        this.newsAddform.tinyMceInfo = "请填写文章正文";
        return false;
      } else {
        this.newsAddform.tinyMceInfo = "";
      }
      this.$refs[formName].validate(valid => {
        //验证
        if (valid) {
          //验证通过后操作
          var p = {};

          p.releaseSite = 0;
          p.releaseApp = 0;
          p.releaseWx = 0;
          p.releaseMicroblog = 0;

          const releaseToArr = this.newsAddform.releaseTo;
          for (const item of releaseToArr) {
            switch (item) {
              case "releaseSite":
                p.releaseSite = 1;
                break;

              case "releaseApp":
                p.releaseApp = 1;
                break;

              case "releaseWx":
                p.releaseWx = 1;
                break;

              case "releaseMicroblog":
                p.releaseMicroblog = 1;
                break;
            }
          }

          p.unitId = this.user.unitId;
          p.title = this.newsAddform.title;
          p.content = this.editorText.html;
          p.status = 0;
          p.author = this.newsAddform.author;
          p.transfer = this.newsAddform.transfer;
          p.editor = this.newsAddform.editor;
          p.editTime = this.newsAddform.editTime;
          p.appearDate = this.newsAddform.appearDate;
          p.readTimes = 0;
          p.appearUserId = this.user.id;

          p.isTop = this.newsAddform.isTop;
          p.type = this.newsAddform.linkUrl == "" ? 0 : 1;

          p.linkUrl = this.newsAddform.linkUrl;
          p.isBigImage = this.newsAddform.isBigImage;
          p.isReview = this.newsAddform.isReview;
          p.isAutoAppear = this.newsAddform.isAutoAppear;
          p.isOriginal = this.newsAddform.isOriginal;
          p.lastTime = this.moment(new Date().getTime()).format(
            "YYYY-MM-DD HH:MM:SS"
          );

          this.axios({
            method: "post",
            url: this.baseConfig.url_base,
            data: this.getData("HX_API", "/https/news/add.do", p),
            dataType: "json",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            }
          })
            .then(result => {
              const newsId = result.data;
              this.addChannelNewsAssociate(
                newsId,
                this.newsAddform.checkedChannels
              );
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          //验证不通过
          return false;
        }
      });
    },
    addChannelNewsAssociate(newsId, checked_channelId) {
      for (const channelId of checked_channelId) {
        var p = {};
        p.newsId = newsId;
        p.channelId = channelId;
        this.axios({
          method: "post",
          url: this.baseConfig.url_base,
          data: this.getData("HX_API", "/https/channelNewsAssociate/add.do", p),
          dataType: "json"
        })
          .then(result => {})
          .catch(error => {
            console.log(error);
          });
      }

      this.updateAnnexMsg(newsId);
    },
    // handleCheckAllChange(val) {
    //   //全选频道
    //   this.newsAddform.checkedChannels = val ? this.channelsKeyArr : [];
    //   this.isIndeterminate = false;
    // },
    // handleCheckedChannelChange(value) {
    //   //单选频道
    //   let checkedCount = value.length;
    //   this.checkAll = checkedCount === this.channels.length;
    //   this.isIndeterminate =
    //     checkedCount > 0 && checkedCount < this.channels.length;
    // },
    reset(formName) {
      //重置表单
      this.newsAddform.tinyMceInfo = "";
      this.newsAddform.checkedChannels = [];
      this.newsAddform.releaseTo = [];
      this.checkAll = false;
      this.isIndeterminate = false;
      this.$refs.tinyMce.claerMce();
      this.$refs[formName].resetFields();
      this.fileListData = [];
      this.$store.dispatch("dropTextarea", this.$router.history.current.path);
    },
    getUploadedAnnex(p) {
      //获取文件上传后返回的数据
      const annex = new Object();
      annex.newsId = "";
      annex.annexName = p.fileName;
      annex.fileType = p.fileType;
      annex.fileSize = p.fileSize;
      annex.dirName = p.dirName;
      annex.contextPath = p.contextPath;
      annex.saveUrl = p.saveUrl;
      annex.newFileName = p.newFileName;
      annex.originalFileName = p.newFileName;

      this.axios({
        method: "post",
        url: this.baseConfig.url_base,
        data: this.getData("HX_API", this.configData.addAnnexHandle, annex),
        dataType: "json",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
      })
        .then(result => {
          const fileId = result.data;
          p.id = fileId;
          this.fileListData.push(p);
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateAnnexMsg(newsId) {
      //更新附件上传后的newsId
      let annexes = {};
      for (const [i, item] of this.fileListData.entries()) {
        const annex = {};
        annex.id = item.id;
        annex.serialNumber = i + 1;
        annex.newsId = newsId;
        annex.annexName = item.annexName + "." + item.fileType;
        annex.content = "";
        annex.isFirst = item.isFirst;
        annex.status = item.status;
        annexes[i] = annex;
      }

      this.axios({
        method: "post",
        url: this.baseConfig.url_base,
        dataType: "JSON",
        data: this.getData(
          "HX_EXT_API",
          "/https/newsAnnex/updateAnnex.do",
          annexes
        ),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        }
      })
        .then(data => {
          this.$message({
            type: "success",
            message: "添加成功"
          });
          this.reset("newsAddform");
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteAnnex(annexList) {
      //删除附件后更新附件列表
      this.fileListData = annexList;
    },
    resTree() {
      console.log("aaa");
    }
  },
  watch: {
    mainContentHeight(val) {
      this.formHeight = val + 50;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.mainScroll 
  height: 100%
  overflow-y: auto
  overflow-x: hidden

.controll 
  text-align: center

.tinyMeceInfo 
  font-size: 12px
  color: #f56c6c
  transition: height 0.5s

.mainScroll
  .el-scrollbar__wrap 
    overflow: auto

.toolBar
  height:50px
  line-height:50px
  width:auto
  background-color: #ededed
  padding:0px 10px

.toolBar 
  .operations 
    text-align: right
  
.toolBar .el-form-item, .dropDownMenu .el-form-item 
  margin-bottom: 0px


.dropDownMenu 
  padding: 5px 20px
  margin-top: 0px


.releaseToIcon 
  font-size: 20px

</style>