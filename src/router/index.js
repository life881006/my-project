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
    		},
    		{
    			path:'add',
    			name:'table_add',
    			meta:{title:'添加'},
    			component:() => import('@/module/news/newsAdd'),
    		},
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
    }
    ]
})

export default router;
