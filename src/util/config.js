const webName = "/HX_WEB";
const req_path = "/net/requestHandle.do";
const config = {
	url_proj:window.location.protocol+"//"+window.location.host+webName,
	url_base:window.location.protocol+"//"+window.location.host+webName+req_path,
	url_base2:window.location.protocol+"//"+window.location.host+webName+"/net/updateFile2.do",
	url_transferFile:window.location.protocol+"//"+window.location.host+webName+"/net/transferFile.do",
	url_baseDownload:window.location.protocol+"//"+window.location.host+webName+"/net/downloadFile.do",
	url_baseDelete:window.location.protocol+"//"+window.location.host+webName+"/net/deleteFile.do",
	url_import:window.location.protocol+"//"+window.location.host+webName+"/net/readXls.do",
	url_export:window.location.protocol+"//"+window.location.host+webName+"/net/writeXls.do",
	everyPage:parseInt((window.innerHeight-208)/53),
}

export default config;