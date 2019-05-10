<template>
  <div>
    <breadCom></breadCom>

    <el-tabs v-model="tabsActive" type="card" @tab-click="tabHandleClick">
      <el-tab-pane label="用户信息" name="userInfo">
        <el-form :model="userInfoForm" label-width="80px">
          <el-row :gutter="10">
            <el-col :xs="8" :sm="8" :md="8" :lg="8">
              <el-form-item label="所属单位">
                <span class="editLabel" v-if="!editUserNameInput">{{userInfoForm.schoolName}}</span>

                <el-input
                  class="editInput"
                  v-if="editUserNameInput"
                  v-model="userInfoForm.schoolName"
                  maxlength="10"
                  placeholder="请填写单位名称"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :xs="8" :sm="8" :md="8" :lg="8">
              <el-form-item label="真实姓名">
                <span class="editLabel" v-if="!editUserNameInput">{{userInfoForm.realName}}</span>

                <el-input
                  class="editInput"
                  v-if="editUserNameInput"
                  v-model="userInfoForm.realName"
                  maxlength="10"
                  placeholder="请填写真实姓名"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :xs="8" :sm="8" :md="8" :lg="8">
              <el-form-item label="性别">
                <span class="editLabel" v-if="!editUserNameInput">{{userInfoForm.sex===1?"女":"男"}}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :xs="8" :sm="8" :md="8" :lg="8">
              <el-form-item label="登录名">
                <span class="editLabel" v-if="!editUserNameInput">{{userInfoForm.loginName}}</span>

                <el-input
                  class="editInput"
                  v-if="editUserNameInput"
                  v-model="userInfoForm.loginName"
                  maxlength="15"
                  placeholder="请填写用户名"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <div class="operation">
            <el-button
              v-if="editUserName"
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="editUserNameInput=true;editUserName=false"
            >修改</el-button>
            <el-button
              v-else
              type="success"
              size="small"
              icon="el-icon-check"
              @click="editUserNameInput=false;editUserName=true"
            >保存</el-button>
          </div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="教师信息" name="teacherInfo">教师信息</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import breadCom from "@/components/service/Breadcrumbs";

export default {
  name: "modifyUserInfo",
  data() {
    return {
      editUserName: true,
      editUserNameInput: false,

      tabsActive: "userInfo",
      userInfoForm: {
        schoolName: "dsadsa",
        loginName: "aaaaa",
        realName: "dsadsa",
        sex: 1
      }
    };
  },
  components: { breadCom },
  methods: {
    tabHandleClick(tab, event) {}
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.editLabel {
  width: 80%;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.operation {
  margin-top: 20px;
  padding-left: 20px;
}

.editInput {
  margin-bottom: 20px;
}
</style>