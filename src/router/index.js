import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/view/layout'
import home from '@/view/home'
import {Notification} from 'element-ui'

Vue.use(Router);

Vue.prototype.$notify = Notification;//挂载elemtn-ui通知组件

const router = new Router({
    routes:[
    {
    	path:'/news',
    	name:'news',
    	redirect:'/news/newsList',
    	component: layout ,
    	children:[
    		{
    			path:'newsList',
    			name:'newsList',
    			meta:{title:'新闻频道'},
    			component:() => import('@/module/news/newsList'),
    			children:[
    			{
    				path:'add',
	    			name:'table_add',
	    			meta:{title:'添加',keepAlive:true},
	    			component:() => import('@/module/news/newsAdd'),
    			},
    			{
    				path:'edit',
	    			name:'table_edit',
	    			meta:{title:'修改'},	    			
	    			component:() => import('@/module/news/newsAdd'),
    			},
    			]
    		}
    	]
    },{
    	path:'/home',
    	redirect: 'home',
    	component: layout ,
    	children:[
    		{
    			path:'home',
    			name:'homePage',
    			meta:{title:'首页'},
    			component:() => import('@/module/home')
    		}
    	]
    },{
    	path:'/student',
    	redirect: 'studentList',
    	component: layout ,
    	children:[
    		{
    			path:'studentList',
    			name:'studentList',
    			meta:{title:'学生管理'},
    			component:() => import('@/module/student/studentList'),
    			children:[
    				{
    					path:'add',
    					name:'add',
    					meta:{title:'添加'},
    					component:()=> import('@/module/student/studentAdd')
    				}
    			]
    		}
    	]
    },{
    	path:'/login',
    	name:'login',
    	title:'登录',
    	component: () => import('@/module/login/login'),	
    },{
    	path:'/loginServer',
    	name:'loginServer',
    	title:'登录',
    	component: () => import('@/module/login/login_server'),	
    },{
    	path:'/tinyMce',
    	name:'tinyMce',
    	title:'文本编辑器',
    	component: () => import('@/components/tinyMce/tinyMce'),	
    }
    
    ]
})

router.beforeEach((to,from,next)=>{//全局导航守卫
	if(to.path==="/loginServer" || to.path==="/login" || to.path==="/regist"){
//		sessionStorage.clear();
//		localStorage.clear();
		next();
	}else{
		let user = JSON.parse(sessionStorage.getItem("user"));
		if(user===null){
			new Vue().$notify({
	          title: '提示',
	          message: '页面需登录后才能访问，您尚未登录！',
	          type: 'warning',
	          onClose:()=>{
	          	router.push("/login");
	          }
	        });			
		}else{
			
			if(!Vue.prototype.user){//Vue没有挂载时挂载user对象
				Vue.prototype.user = user;
			}
			//
			next();
		}
	}
});

export default router;
