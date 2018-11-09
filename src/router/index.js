import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/view/layout'
import home from '@/module/home'
import {Notification} from 'element-ui'

Vue.use(Router);

Vue.prototype.$notify = Notification;//挂载elemtn-ui通知组件

const router = new Router({
    routes:[
    {
    	path:'/news',
    	name:'news',
    	redirect:'/news/newsList',
        meta:{title:'文章管理'},
    	component: layout ,
    	children:[
    		{
    			path:'newsList',
    			name:'newsList',
    			meta:{title:'文章列表'},
    			component:() => import('@/module/news/newsList'),
    		},
    		{
				path:'newsAdd',
    			name:'newsAdd',
    			meta:{title:'添加文章'},
    			component:() => import('@/module/news/newsAdd'),
			},
            {
                path:'newsEdit',
                name:'newsEdit',
                meta:{title:'修改文章'},
                component:() => import('@/module/news/newsEdit'),
            }
    	]
    },{
    	path:'/home',
    	name:'home',
    	redirect: '/home/index',
    	component: layout ,
    	children:[
    		{
    			path:'index',
    			name:'homePage',
    			meta:{title:'首页'},
    			component:() => import('@/module/home')
    		}
    	]
    },{
        path:'/cropper',
        name:'cropper',
        redirect: '/cropper/index',
        component: home ,
        children:[
            {
                path:'index',
                name:'cropperIndex',
                meta:{title:'图片裁切'},
                component:() => import('@/components/cropper/index')
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
    	path:'*',
    	name:'404',
    	title:'未找到页面',
    	component: () => import('@/components/404/index'),	
    }
    
    ]
})

router.beforeEach((to,from,next)=>{//全局导航守卫
	if(to.path==="/login" || to.path==="/regist"){
//		sessionStorage.clear();
//		localStorage.clear();
		next();
	}else{
		let user = JSON.parse(sessionStorage.getItem("user"));
        
		if(user===null){
			new Vue().$confirm('请登录账号后进入系统', '提示',{
                confirmButtonText: '确定',
                showCancelButton:false,
                type: 'warning'
	        }).then(()=>{
                router.push("/login");
            }).catch((error)=>{
                router.push("/login")

            });			
		}else{
			
			if(!Vue.prototype.user){//Vue没有挂载时挂载user对象
				Vue.prototype.user = user;
			}

            if(!Vue.prototype.unitConfig){//Vue没有挂载时挂载unitConfig对象
                Vue.prototype.unitConfig = JSON.parse(sessionStorage.getItem("unitConfig"));
            }

            if(!Vue.prototype.userInfo){//Vue没有挂载时挂载userInfo对象
                Vue.prototype.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
            }
			//
			next();
		}
	}
});

export default router;
