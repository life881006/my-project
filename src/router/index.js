import Vue from 'vue'
import Router from 'vue-router'
import textVue from '@/components/textVue'
import tableVue from '@/components/table'
import headerSearchNavVue from '@/components/headerSearchNav'

Vue.use(Router);

const router = new Router({
    routes:[{
        path: '/table', component: tableVue
    },{
        path: '/headerNav', component: headerSearchNavVue
    },{
        path: '/', component: tableVue
    }]
})

export default router;
