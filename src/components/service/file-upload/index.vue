<template>
  <div>
    <el-upload
      drag
      :data="Data"
      :action="Data.action"
      :on-success="fileUploadSuccess"
      :file-list="fileList"
      :show-file-list="ifShowList"
      multiple
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip"></div>
    </el-upload>

    <div class="el-fileUpload-list">
      <div class="annexItem" v-for="(item,index) in fileList" :key="item.id">
        <div class="serialNumberArea">
          <span class="serialNumer el-dropdown-link">{{index+1}}</span>
        </div>

        <el-button
          class="delete"
          type="text"
          icon="el-icon-close"
          @click="removeAnnexItem(index)"
        ></el-button>

        <el-dropdown class="setting" trigger="click">
          <el-button type="text" class="el-dropdown-link">
            <i class="el-icon-setting"/>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <div v-if="isFirstButton" class="menuItem">
              <span class="label">首选图片</span>
              <el-radio v-model="item.isFirst" label="1">是</el-radio>
              <el-radio v-model="item.isFirst" label="0">否</el-radio>
            </div>
            <div v-if="statusButton" class="menuItem">
              <span class="label">是否显示</span>
              <el-radio v-model="item.status" label="1">是</el-radio>
              <el-radio v-model="item.status" label="0">否</el-radio>
            </div>
          </el-dropdown-menu>
        </el-dropdown>

        <div class="annexImg">
          <a
            v-if="item.dirName==='image'"
            :href="item.contextPath+item.saveUrl+item.newFileName"
            target="_blank"
          >
            <img
              :src="item.contextPath+item.saveUrl+item.newFileName"
            >
          </a>
          
          <a v-else :href="item.contextPath+item.saveUrl+item.newFileName" target="_blank">
            <img
              :src="item.contextPath+'/web2/layout/images/file/'+item.fileType+'.png'"
            >
          </a>
        </div>

        <div class="fileSize">{{Math.ceil(item.fileSize/1024)+"KB"}}</div>

        <template v-if="!item.edit">
          <div
            class="item"
            @mouseover="item.hover=true"
            @mouseleave="item.hover=false"
            @click="editName(item)"
          >
            <a class="itemText">{{item.annexName}}</a>
            <el-button type="text" v-show="item.hover" icon="el-icon-edit"></el-button>
          </div>
        </template>
        <template v-else>
          <div class="item">
            <el-input class="editInput" size="small" v-model="item.annexName"></el-input>

            <el-button class="editBtn" type="button" size="mini" @click="saveName(item)">保存</el-button>
          </div>
          <span class="alertInfo">{{item.info}}</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "upload",
  data() {
    return {
      Data: {
        rootPath: this.rootPath,
        action: this.axios.uploadAction,//上传接口地址
      },
      isFirstButton: true,
      statusButton: true,
      ifShowList: false,
      fileList: this.fileListData, //附件集合
      originalName: ""
    };
  },
  props: ["rootPath", "fileListData"],
  mixins: [],
  components: {},
  methods: {
    fileUploadSuccess(response, file, fileList) {
      //upload上传成功后钩子
      this.$emit("uploadAnnex",response);

    },
    removeAnnexItem(index) {
      this.$emit("removeAnnexItem", index);
    },
    editName(item, name) {
      //编辑文件名
      item.edit = true;
      this.originalName = name;
    },
    saveName(item) {
      //保存文件名
      if (item.name == "") {
        item.info = "请输入名称";
        return false;
      }
      item.info = "";
      item.edit = !item.edit;
    }
  },
  watch: {
    fileListData(val) {
      this.fileList = val;
    }
  }
};
</script>

<style scoped="scoped" lang="stylus" rel="stylesheet/stylus">
@import './style/style.styl';
</style>