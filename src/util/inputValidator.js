

export default{
	
	install(Vue ,options)
	{
		const vUsername = (rule,value,callback)=>{
			if(value!="" && value!=null){
				if(!checkUserName(value)){
					callback(new Error('请输入正确的用户名'));
				}else{
					callback();
				}
			}else{
				callback();
			}
		}
		
		
		Vue.prototype.filter_inputs = function(item){
			let rules = [];
			if(item.required){
				rules.push({ required: true, message: '该输入项为必填项!', trigger: 'blur' });
			}
			
			switch(item.type){
				case "username":
					rules.push({validator: vUsername,trigger: "blur,change"});
				break;
			}
			
			return rules;
		}
	}
}


function checkUserName(value){
	if(value=="321"){
		return false;		
	}else{
		return true;
	}
}
