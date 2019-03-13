<template>
  <el-form :model="ruleForm" ref="ruleForm">
    <!--prop必须与input的username一致，才能验证Input》username 中输入的值-->
    <el-form-item label="用户名" :rules="filter_inputs('required,space')" prop="username">
      <el-input class="input" v-model="ruleForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" :rules="filter_inputs('required,space')" prop="password">
      <el-input class="input" v-model="ruleForm.password" show-password></el-input>
    </el-form-item>
    <div class="auditLine" id="auditLine">
      <span class="textBlock" id="textBlock">请拖动方块到最右侧</span>
      <span class="moveBlock" id="moveBlock" @mousedown="mouseDown"></span>
    </div>
    <el-button type="primary" :disabled="isDisabled" @click="submit">确定
      <i v-show="iconLoading" class="el-icon-loading el-icon--right"></i>
    </el-button>
  </el-form>
</template>

<script>
let flag = false;

export default {
  name: "login",
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      iconLoading: false,
      isDisabled:false,
    };
  },
  mounted(){

  },
  methods: {
    mouseDown: event => {
      //简单的移动验证
      let moveBlock = document.getElementById("moveBlock");
      let disX = event.clientX - moveBlock.offsetLeft;
      let disY = event.clientY - moveBlock.offsetTop;

      if (flag) {
        return false;
      }

      if (event.button > 0) {
        return false;
      }
      
      window.onmousemove = function(event) {
        let l = event.clientX - disX;
        let objOffsetLeft = moveBlock.offsetLeft;
        if (l <= 0) {
          moveBlock.style.left = 0 + "px";
        } else if (l > 249) {
          moveBlock.style.left = 250 + "px";
        } else {
          moveBlock.style.left = l + "px";
        }
      };
      window.onmouseup = function(event) {
        let l = event.clientX - disX;
        let auditLine = document.getElementById("auditLine");
        let textBlock = document.getElementById("textBlock");
        if (l > 249) {
          moveBlock.style.left = 250 + "px";
          flag = true;
          moveBlock.onmousedown = null;
          window.onmousemove = null;
          window.onmouseup = null;
          textBlock.innerHTML = "验证通过";
          auditLine.style.backgroundColor = "#13CE66";
        } else {
          moveBlock.style.left = 0 + "px";
          flag = false;
          textBlock.innerHTML = "验证不通过";
          auditLine.style.backgroundColor = "#FF0000";
        }
        window.onmousemove = null;
        window.onmouseup = null;
      };
    },
    submit: function() {
      this.$refs.ruleForm.validate(valid => {
        //全表验证
        if (!valid) {
          //基本验证不通过
        } else {
          //基本验证通过

          let loginName = this.ruleForm.username;
          let loginPwd = this.ruleForm.password;

          if (!flag || flag === null) {
            document.getElementById("auditLine").style.backgroundColor = "#FF0000";
            return false;
          }

          const p = {};
          //let _this = this;
          p.name = this.ruleForm.username;
          p.pwd = this.ruleForm.password;
          this.iconLoading = true;
          this.isDisabled = true;
          const c = {};
          c.url = this.baseConfig.url_base;
          c.api = 'HX_EXT_API';
          c.handler = '/https/user/loginByPwd.do'

          this.axios._post(c,p).then(data=>{
            let status = data.status;
            let userObj = data.obj;
            let userId = userObj.id;
            let unitId = userObj.unitId;
            sessionStorage.setItem("userId", userId);//sessonStorage保存userId
            sessionStorage.setItem("unitId", unitId);//sessonStorage保存unitId

            if (status == 0) {
                if (userObj.status == 0) {
                  //alert("您的帐号还未审核通过，不能登录系统。");
                  this.isDisabled = false;
                  this.iconLoading = false;
                } else if (userObj.status == 1) {
                  switch (userObj.roleId) {
                    case 1:
                    case 4:
                    case 5:
                    case 6:
                      let userToken = data.userToken.access_token;
                      this.getUserInfoByToken(userToken);
                    break;
                    case 2:
                      this.isDisabled = false;
                      this.iconLoading = false;
                    break;
                    case 3:
                      //window.location.href="../parents/notice.html";
                    break;
                    default:
                      //alert("该角色功能开发中");
                      this.isDisabled = false;
                      this.iconLoading = false;
                  }
                } else {
                  this.$message({
                    title:"提示",
                    message:"您的账号已被停用，不能登录系统"
                  })
                  //alert("您的帐号已被停用，不能登录系统。");
                }
              } else if (status == 1) {
                //alert("登录密码不正确！");
                this.$message({
                  title:"提示",
                  type:"error",
                  message:"登录密码不正确"
                })
              } else if (status == 2) {
                this.$message({
                  title:"提示",
                  type:"error",
                  message:"账号不存在"
                })
                
                
              } else {
                //alert("操作失败");
                this.$message({
                  title:"提示",
                  type:"error",
                  message:"操作失败"
                })
              }

              if(status!=0){
                let auditLine = document.getElementById("auditLine");
                let textBlock = document.getElementById("textBlock");
                let moveBlock = document.getElementById("moveBlock");
                textBlock.innerHTML = "请拖动方块到最右侧";
                moveBlock.style.left = 0 + "px";
                auditLine.style.backgroundColor = "#C0CCDA";
                flag = null;
                this.isDisabled = false;
                this.iconLoading = false;
              }
          })
        }
      });
    },
    getUserInfoByToken(userToken) {
      const p = {};
      const c = {};
      p.access_token = userToken;
      c.url = this.baseConfig.url_base;
      c.api = 'HX_EXT_API';
      c.handler = '/https/userToken/getLoginInfoByToken.do';


      this.axios._get(c,p).then(data=>{
        let infoData = data;
        if (infoData.isValid == 0) {
          this.$message({
            type: "warning",
            message: "已在其他地方登录，请重新登录"
          });
          this.$router.push("../login");
        } else {
          var userToken = infoData[0];
          sessionStorage.setItem(
            "unitConfig",
            JSON.stringify(infoData.unitConfig)
          );
          sessionStorage.setItem("userInfo", JSON.stringify(infoData.user));
          this.getUser(infoData.userId);
        }
      });
    },
    getUser: function(userId) {
      const p = {};
      const c = {};
      
      p.id = userId;

      c.url = this.baseConfig.url_base;
      c.api = 'HX_EXT_API';
      c.handler = '/https/user/queryUserInfo.do';

      this.axios._get(c,p).then(data=>{
          let userObj = data;
          //格式化模块、项目
          let userModules = formatModules(userObj.functionalModules);
          userObj.functionalModules = userModules;
          let userJson = JSON.stringify(userObj);
          sessionStorage.setItem("user", userJson);
          this.iconLoading = false;
          this.isDisabled = false;
          this.$router.push("/home");
      })
    }
  },
  watch: {
    ruleForm: {
      //深度监听表单变化，ruleForm为表单:model，handler不可改变
      handler: function(val, oldVal) {
        let auditLine = document.getElementById("auditLine");
        let textBlock = document.getElementById("textBlock");
        let moveBlock = document.getElementById("moveBlock");
        textBlock.innerHTML = "请拖动方块到最右侧";
        moveBlock.style.left = 0 + "px";
        auditLine.style.backgroundColor = "#C0CCDA";
        flag = null;
      },
      deep: true
    }
  }
};

function formatModules(modulesObj) {
  let moduleArr = modulesObj;
  let moduleListArr = {};
  let serialNumber = 0;
  let pArr = [];
  let mainArr = [];

  for (let m = 0; m < moduleArr.length; m++) {
    let muduleFirstLevelItem = [];
    let muduleFirstLevelObj = moduleArr[m];
    let childrenList = [];
    childrenList = moduleArr[m].functionalItems;
    muduleFirstLevelObj.serialNumber = m;
    //muduleFirstLevelObj.functionalItems = undefined;

    for (let i = 0; i < childrenList.length; i++) {
      let pItem;
      if (childrenList[i].pid === "0") {
        pItem = childrenList[i];
        let cItem = [];
        pItem.serialNumber = m + "-" + i;
        for (let j = 0; j < childrenList.length; j++) {
          if (childrenList[i].id == childrenList[j].pid) {
            cItem.push(childrenList[j]);
            childrenList[j].serialNumber = m + "-" + i + "-" + j;
          }
        }
        pItem.children = cItem;
      }
      if (pItem != undefined) {
        muduleFirstLevelItem.push(pItem);
      }
    }
    muduleFirstLevelObj.children = muduleFirstLevelItem;
    mainArr.push(muduleFirstLevelObj);
  }
  for (let item of mainArr) {
    item.functionalItems = undefined;
  }
  return mainArr;
}
</script>

<style scoped="scoped" lang="stylus">
.input 
  width: 100px

.password
  width: 100px

.auditLine 
  width: 300px;
  border: 1px solid #dcdfe6;
  background-color: #C0CCDA;
  font-size: 12px;
  text-align: center;
  height: 50px;
  position: relative;
  user-select: none;
  transition: background-color 0.5s;

.textBlock 
  position: relative;
  float: left;
  z-index: 200;
  top: 15px;
  min-width: 100px;
  margin-left: 60px;
  text-align: left;
  color: #fff;
  font-size: 14px;

.moveBlock 
  width: 50px;
  height: 50px;
  display: inline-block;
  background-color: #409EFF;
  position: absolute;
  cursor: pointer;
  top: 0px;
  left: 0px;
  transition: left 0.5s;

</style>