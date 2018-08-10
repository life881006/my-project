import qs from 'qs'
import CryptoJS from 'crypto-js/crypto-js'

const KEY = CryptoJS.enc.Utf8.parse("1234567890123456");
const IV = CryptoJS.enc.Utf8.parse('1234567890123456');

export default{
  install(Vue,options)
  {
    Vue.prototype.getData = function (projName,path,json) {//封装请求
      let d = new Object(); 
	    d.token="123456";
	    d.projName = projName;
	    d.path = path;
	    d.json = JSON.stringify(json);
	    d.abc = new Date().getTime();
	    let dataJsonStr = qs.stringify(d);
	    /**加密**/
		  var encrypted = CryptoJS.AES.encrypt(dataJsonStr, KEY, {
		    iv: IV,
		    mode: CryptoJS.mode.CBC,
		    padding: CryptoJS.pad.ZeroPadding
		  });
	    let encodeObj = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
	    console.log(encodeObj);
	    /**加密结束**/
	    
	    /**解密
	   	let decodeStr = CryptoJS.AES.decrypt(encodeObj,KEY,
        {
            iv:IV,
            mode:CryptoJS.mode.CBC,
            padding:CryptoJS.pad.ZeroPadding
        });
      console.log(decodeStr.toString(CryptoJS.enc.Utf8));
	   	**/
	   	return dataJsonStr;
    },
    Vue.prototype.getUser = function (){
    	let user = JSON.parse(sessionStorage.getItem("user"));
    	return user;
    }
  }
}