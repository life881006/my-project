import Vue from 'vue'
import Router from 'vue-router'
//import textVue from '@/components/textVue'
import layout from '@/view/layout'
Vue.use(Router);

const router = new Router({
	mode:"history",
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
    	path:"/main/",
    	component: layout ,
    	children:[
    		{
    			path:"table_one",
    			component:() => import("@/module/table_one/table_oneList"),    			
    		}
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
