import Vue from 'vue'
import Router from 'vue-router'
//import textVue from '@/components/textVue'
import layout from '@/view/layout'
Vue.use(Router);

const router = new Router({
    routes:[
    /*{//默认打开，可以是欢迎页
        path: "",
        component: tableVue,
        redirect:"/table/",
        children:[
        	{
        		path:"add",
        		component:addTable
        	}
        ]
    },*/
    {
    	path:"/main",
    	name:"main",
    	component: layout ,
    	children:[
    		{
    			path:"table_one",
    			name:"table",
    			component:() => import("@/module/table_one/table_oneList"),
    			meta:{title:'新闻频道'},
    			children:[
	    			{
		    			path:"add",
		    			component:() => import("@/module/table_one/addTable"),
		    		}
    			]
    		},
    		{
    			path:"add",
    			name:"table_add",
    			meta:{title:'添加'},
    			component:() => import("@/module/table_one/addTable"),
    			
    		},
    	]
    },
    /*{
        path: "/table",
        component: tableVue ,
        children:[
        	{
        		path:"",
        		component:mainList
        	},
        	{
        		path:"add",
        		component:addTable
        	}
        ]
    },{
        path: "/newsManagement", component: newsControll
    }*/]
})

export default router;
