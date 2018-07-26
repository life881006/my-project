import Vue from 'vue'
import Router from 'vue-router'
//import textVue from '@/components/textVue'
import tableVue from '@/components/table'
import headerSearchNavVue from '@/components/headerSearchNav'
import newsControll from '@/components/newsControll'
import addTable from '@/components/table/addTable'
import mainList from '@/components/table/mainList'

Vue.use(Router);

const router = new Router({
    routes:[{
        path: '/table',
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
        path: '/newsManagement', component: newsControll
    },{
        path: '/', component: tableVue
    }]
})

export default router;
