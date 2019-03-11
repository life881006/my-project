

export default {// 表单提交信息验证模块

  install (Vue, options) {
    const checkInput = (rule, value, callback) => { // validator对应的参数
      if (!checkInputValue(value)) { // 调用校验方法
        callback(new Error('输入内容中存在非法字符'))
      } else {
        callback()
      }
    }

    Vue.prototype.filter_inputs = function (item) { // 统一调用的方法，在main.js里调用
      let rules = []

      rules.push({ validator: checkInput, trigger: 'blur' })// 写判断方法

      const validateList = item.split(',')
      for (let item of validateList) {
        if (item.indexOf('required') >= 0) {
          rules.push({ required: true, message: '该项为必填项', trigger: 'blur' })// 必填项
        } else if (item.indexOf('space') >= 0) {
          rules.push({ pattern: /^(\S)+$/, message: '请勿输入空格', trigger: 'blur' })
        } else if (item.indexOf('length') >= 0) {
          var minIndex = Number(item.split('_')[1])
          var maxIndex = Number(item.split('_')[2])
          rules.push({ min: minIndex, max: maxIndex, message: '长度在' + minIndex + '到' + maxIndex + '之间', trigger: 'blur' })
        } else if (item.indexOf('email') >= 0) {
          rules.push({ type: 'email', message: '输入的邮箱格式不正确', trigger: 'blur' })
        }
      }
      return rules
    }
  }
}

function checkInputValue (value) { // 校验调用的方法
  let patt = new RegExp('select|insert|update|delete')
  if (patt.test(value)) {
    return false
  } else {
    return true
  }
}
