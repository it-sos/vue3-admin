import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/welcome'
    },
    {
        path: '/welcome',
        name: 'welcome',
        component: () => import(/* webpackChunkName: "welcome" */ '../views/Welcome.vue')
    },
    {
        path: '/extensions',
        name: 'extensions',
        component: () => import(/* webpackChunkName: "extensions" */ '../views/Extensions.vue')
    },
    {
        path: '/extensions_edit',
        name: 'extensions_edit',
        component: () => import(/* webpackChunkName: "extensions_edit" */ '../views/ExtensionsEdit.vue')
    },
    {
        path: '/gateways',
        name: 'gateways',
        component: () => import(/* webpackChunkName: "extensions" */ '../views/Gateways.vue')
    },
    {
        path: '/gateways_edit',
        name: 'gateways_edit',
        component: () => import(/* webpackChunkName: "extensions_edit" */ '../views/GatewaysEdit.vue')
    },
    {
        path: '/destinations',
        name: 'destinations',
        component: () => import(/* webpackChunkName: "extensions" */ '../views/Destinations.vue')
    },
    {
        path: '/destination_edit',
        name: 'destination_edit',
        component: () => import(/* webpackChunkName: "extensions" */ '../views/DestinationEdit.vue')
    },
    {
        path: '/managers',
        name: 'managers',
        component: () => import(/* webpackChunkName: "extensions" */ '../views/Managers.vue')
    },
    {
        path: '/manager_edit',
        name: 'manager_edit',
        component: () => import(/* webpackChunkName: "extensions" */ '../views/ManagerEdit.vue')
    },
    {
        path: '/outbounds',
        name: 'outbounds',
        component: () => import(/* webpackChunkName: "extensions" */ '../views/Outbounds.vue')
    },
    {
        path: '/outbound_edit',
        name: 'outbound_edit',
        component: () => import(/* webpackChunkName: "extensions" */ '../views/OutboundEdit.vue')
    },
    {
        path: '/inbounds',
        name: 'inbounds',
        component: () => import(/* webpackChunkName: "extensions" */ '../views/Inbounds.vue')
    },
    {
        path: '/inbound_edit',
        name: 'inbound_edit',
        component: () => import(/* webpackChunkName: "extensions" */ '../views/InboundEdit.vue')
    },
    {
        path: '/dialplan_xml',
        name: 'dialplan_xml',
        component: () => import(/* webpackChunkName: "extensions" */ '../views/DialplanXml.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router

