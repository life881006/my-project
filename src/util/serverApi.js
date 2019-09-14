import axios from 'axios'
import qs from 'qs'

//实例axios
let $axios = axios.create({
    baseURL: "http://127.0.0.1:3000/",
    responseType: "json",
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
})

let $axios_upload = axios.create({
    baseURL: "http://192.168.0.6:8082/",
    responseType: "json",
    headers: { "Content-Type": "multipart/form-data" },
})

$axios.interceptors.request.use(config=>{
    if(config.method=="post" || config.method=="put"){
        config.data = qs.stringify(config.data);
    }
    return config;
});

/**
 * axios响应拦截器，对返回数据解密
 */
$axios.interceptors.response.use(response => { // 拦截请求后的状态
    return response.data;
}, error => {
    if (error && error.response) {
        switch (error.response.status) {
            case 404:
                console.log("请求资源不存在")
                break;

            case 500:
                console.log("服务器出错")
                break;

            case 504:
                console.log("请求服务器超时")
                break;
        }
    }
});

const uploadAction = window.location.protocol+"//"+window.location.host + "/net/updateFile3.do";

export {$axios,uploadAction}
