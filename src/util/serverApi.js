import axios from 'axios'
import qs from 'qs'

//实例axios
let $axios = axios.create({
    baseURL: "http://192.168.100.106:8082",
    responseType: "json",
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
})

const base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const base64DecodeChars = new Array(-2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

function getData(projName, path, json) {//封装请求
    let d = new Object();
    d.token = window.btoa(encodeURIComponent(encodeURIComponent(new Date().getTime())));
    d.projName = window.btoa(encodeURIComponent(encodeURIComponent(projName)));
    d.path = window.btoa(encodeURIComponent(encodeURIComponent(path)));
    d.json = window.btoa(encodeURIComponent(encodeURIComponent(JSON.stringify(json))));

    return d;
}

function base64encode(str) {
    var out, i, len;
    var c1, c2, c3;

    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}

function base64decode(str) {
    var c1, c2, c3, c4;
    var i, len, out;

    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        /* c1 */
        do {
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c1 == -1);
        if (c1 == -1)
            break;

        /* c2 */
        do {
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c2 == -1);
        if (c2 == -1)
            break;

        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

        /* c3 */
        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61)
                return out;
            c3 = base64DecodeChars[c3];
        } while (i < len && c3 == -1);
        if (c3 == -1)
            break;

        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

        /* c4 */
        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61)
                return out;
            c4 = base64DecodeChars[c4];
        } while (i < len && c4 == -1);
        if (c4 == -1)
            break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}

function utf16to8(str) {
    var out, i, len, c;

    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}

function utf8to16(str) {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = str.length;
    i = 0;
    while (i < len) {
        c = str.charCodeAt(i++);
        switch (c >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                // 0xxxxxxx 
                out += str.charAt(i - 1);
                break;
            case 12:
            case 13:
                // 110x xxxx 10xx xxxx 
                char2 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
            case 14:
                // 1110 xxxx 10xx xxxx 10xx xxxx 
                char2 = str.charCodeAt(i++);
                char3 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x0F) << 12) |
                    ((char2 & 0x3F) << 6) |
                    ((char3 & 0x3F) << 0));
                break;
        }
    }
    return out;
}

//取消重复请求
let pending = [];
let axiosCancel = axios.CancelToken;
let removePending = function (config) {
    for (let i in pending) {
        const params = config.data == undefined ? config.params : config.data;
        let str = typeof (params) == "string" ? params : qs.stringify(params);
        const jsonString = str.substring(str.indexOf("json="), str.length);

        //从数组中比较本次请求参数
        if (pending[i].jsonStr === jsonString) {
            pending[i].f();
            pending.splice(i, 1);
        }
    }
}

/**
 * 请求拦截器
 */
$axios.interceptors.request.use(config => {
    removePending(config);//清除一次数组中已有的
    config.cancelToken = new axiosCancel((c) => {
        const params = config.data == undefined ? config.params : config.data;
        let str = typeof (params) == "string" ? params : qs.stringify(params);
        const jsonString = str.substring(str.indexOf("json="), str.length);//截取请求参数放入请求数组

        pending.push({ jsonStr: jsonString, f: c });
    })
    return config;
}, error => {
    console.log(error);
    return Promise.reject(error);
})

/**
 * axios响应拦截器，对返回数据解密
 */
$axios.interceptors.response.use(response => { // 拦截请求后的状态
    //通过！
    removePending(response.config);//将请求完成的从数组中清除
    let data = {};
    if (response.status != undefined) {
        data = response.data;
        let s = utf8to16(base64decode(data.data));
        if (/(\{)|(\[)/.test(s)) {
            data.data = JSON.parse(s);
        } else {
            //console.log(s);
            data.data = s;
        }
    }
    return data;
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


/**
 * 请求服务器API
 */
const $api = {
    /**
     * @param {*} dataObj 数据对象
     * @param {url,api,handler} interactionObj 配置参数对象
     * _get：一般用于获取数据
     * _post: 新建记录
     * _delete: 删除数据
     * _put: 更新
     * _patch: 更新，通常为部分更新
     */
    _get: function (interactionObj, dataObj) {
        return new Promise((resolve, reject) => {
            $axios.get(interactionObj.url, {
                params: getData(interactionObj.api, interactionObj.handler, dataObj)
            }).then(result => {
                resolve(result.data);
            }).catch(error => {
                console.log(error);
            });
        });
    },
    _post: function (interactionObj, dataObj) {
        return new Promise((resolve, reject) => {
            $axios.post(interactionObj.url, qs.stringify(getData(interactionObj.api, interactionObj.handler, dataObj))
            ).then(result => {
                resolve(result.data);
            }).catch(error => {
                console.log(error);
            });
        });
    },
    _delete: function (interactionObj, dataObj) {
        return new Promise((resolve, reject) => {
            $axios.delete(interactionObj.url, {
                params: getData(interactionObj.api, interactionObj.handler, dataObj)
            }).then(result => {
                resolve(result.data);
            }).catch(error => {
                console.log(error);
            });
        });
    },
    _put: function (interactionObj, dataObj) {//服务器是否支持？
        return new Promise((resolve, reject) => {
            $axios.put(interactionObj.url, qs.stringify(getData(interactionObj.api, interactionObj.handler, dataObj)), {
                headers: {}
            }).then(result => {
                resolve(result.data);
            }).catch(error => {
                console.log(error);
            });
        });
    },
    _patch: function (interactionObj, dataObj) {//服务器是否支持？
        return new Promise((resolve, reject) => {
            $axios.patch(interactionObj.url, qs.stringify(getData(interactionObj.api, interactionObj.handler, dataObj))
            ).then(result => {
                resolve(result.data);
            }).catch(error => {
                console.log(error);
            });
        });
    },
    _prototype: $axios

}

export default $api

