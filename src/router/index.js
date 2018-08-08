import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/view/layout'
import home from '@/view/home'

Vue.use(Router);

const router = new Router({
    routes:[
    {
    	path:'/news',
    	name:'news',
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
	    			meta:{title:'新闻频道添加'},
	    			component:() => import('@/module/news/newsAdd'),
    			}
    			]
    		}
    	]
    },
    {
    	path:'/',
    	redirect: 'home',
    	component: home ,
    	children:[
    		{
    			path:'home',
    			name:'homePage',
    			meta:{title:'首页'},
    			component:() => import('@/module/home')
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
    }
    
    ]
})

router.beforeEach(function(to,from,next){//全局导航守卫
	if(to.path==="/loginServer" || to.path==="/login" || to.path==="/regist"){
		next();
	}else{
		let user = JSON.parse(sessionStorage.getItem("user"));
		if(user===null){
			router.push("/login");
		}else{
			next();
		}
	}
});

export default router;
