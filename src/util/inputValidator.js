export default{//表单提交信息验证模块
	
	install(Vue ,options)
	{
		const checkInput = (rule,value,callback)=>{//validator对应的参数
			if(!checkInputValue(value)){//调用校验方法
				callback(new Error('输入内容中存在非法字符'));
			}else{
				callback();
			}
		}
		
		Vue.prototype.filter_inputs = function(item){//统一调用的方法，在main.js里调用
			let rules = [];
			
			if(item.required){
				rules.push({ required: true,message:'该项为必填项', trigger: 'blur' });//必填项
			}
			rules.push({validator:checkInput,trigger:'blur'});//写判断方法
			
			switch(item.type){
				case "username":
					rules.push({ pattern: /^(\S)+$/,message: '请勿输入空格', trigger: 'blur' });	//直接写正则
				break;
				case "password":
					rules.push({ pattern: /^(\S)+$/,message: '请勿输入空格', trigger: 'blur' });	//直接写正则
				break;
			}
			
			return rules;
		}
	}
}


function checkInputValue(value){//校验调用的方法
	let patt = new RegExp("select|add|update|delete");
	if(patt.test(value)){
		return false;	
	}else{
		return true;
	}
}
