<template>
  <el-form :model="ruleForm" ref="ruleForm">
    <!--prop必须与input的username一致，才能验证Input》username 中输入的值-->
    <el-form-item label="用户名" :rules="filter_inputs('required,space')" prop="username">
      <el-input class="input" size="small" v-model="ruleForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" :rules="filter_inputs('required,space')" prop="password">
      <el-input class="input" size="small" v-model="ruleForm.password"></el-input>
    </el-form-item>
    <div class="auditLine" id="auditLine">
      <span class="textBlock" id="textBlock">请拖动方块到最右侧</span>
      <span class="moveBlock" id="moveBlock" @mousedown="mouseDown"></span>
    </div>
    <el-button type="primary" size="small" @click="submit">确定
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
      iconLoading: false
    };
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
            document.getElementById("auditLine").style.backgroundColor =
              "#FF0000";
            return false;
          }

          let p = {};
          //let _this = this;
          p.name = this.ruleForm.username;
          p.pwd = this.ruleForm.password;
          this.iconLoading = true;

          this.axios({
            method: "post",
            url: this.baseConfig.url_base, //url_base为全局变量，调用时前面加global,参数在util->config.js中
            data: this.getData("HX_EXT_API", "/https/user/loginByPwd.do", p), //getData为全局方法，方法加入到vue中，调用前需加this，方法在util->methods.js中
            dataType: "JSON"
          })
            .then(result => {
              let status = result.data.data.status;
              let userObj = result.data.data.obj;
              let userToken = result.data.data.userToken.access_token;
              let userId = userObj.id;
              let unitId = userObj.unitId;
              sessionStorage.setItem("userId", userId);
              sessionStorage.setItem("unitId", unitId);
              if (status == "0") {
                if (userObj.status == 0) {
                  alert("您的帐号还未审核通过，不能登录系统。");
                } else if (userObj.status == 1) {
                  switch (userObj.roleId) {
                    case 1:
                    case 4:
                    case 5:
                    case 6:
                      this.getUserInfoByToken(userToken);
                      break;
                    case 2:
                    case 3:
                      //window.location.href="../parents/notice.html";
                      break;
                    default:
                      alert("该角色功能开发中");
                  }
                } else {
                  alert("您的帐号已被停用，不能登录系统。");
                }
              } else if (status == "1") {
                alert("登录密码不正确！");
              } else if (status == "2") {
                alert("帐号不存在！");
              } else {
                alert("操作失败");
              }
              return false;
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
    },
    getUserInfoByToken(userToken) {
      let p = {};
      p.access_token = userToken;
      this.axios({
        method: "post",
        url: this.baseConfig.url_base,
        dataType: "JSON",
        data: this.getData(
          "HX_EXT_API",
          "/https/userToken/getLoginInfoByToken.do",
          p
        )
      })
        .then(result => {
          let infoData = result.data.data;
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
        })
        .catch(error => {
          console.log(error);
        });
    },
    getUser: function(userId) {
      let p = {};
      p.id = userId;
      this.axios({
        method: "post",
        url: this.baseConfig.url_base,
        data: this.getData("HX_EXT_API", "/https/user/queryUserInfo.do", p),
        dataType: "json"
      })
        .then(result => {
          let userObj = result.data.data;
          //格式化模块、项目
          let userModules = formatModules(userObj.functionalModules);
          userObj.functionalModules = userModules;
          let userJson = JSON.stringify(userObj);
          sessionStorage.setItem("user", userJson);
          this.$router.push("/home");
        })
        .catch(error => {
          console.log(error);
        });
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
.input {
  width: 100px;
}

.auditLine {
  width: 300px;
  border: 1px solid #dcdfe6;
  background-color: #C0CCDA;
  font-size: 12px;
  text-align: center;
  height: 50px;
  position: relative;
  user-select: none;
  transition: background-color 0.5s;
}

.textBlock {
  position: relative;
  float: left;
  z-index: 200;
  top: 15px;
  min-width: 100px;
  margin-left: 60px;
  text-align: left;
  color: #fff;
  font-size: 14px;
}

.moveBlock {
  width: 50px;
  height: 50px;
  display: inline-block;
  background-color: #409EFF;
  position: absolute;
  cursor: pointer;
  top: 0px;
  left: 0px;
  transition: left 0.5s;
}
</style>