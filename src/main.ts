import {createApp} from 'vue'
import {
    ElAffix,
    ElButton,
    ElContainer,
    ElAside,
    ElHeader,
    ElMain,
    ElFooter,
    ElMenu,
    ElSubMenu,
    ElMenuItemGroup,
    ElMenuItem,
    ElForm,
    ElFormItem,
    ElInput,
    ElPopover,
    ElTag,
    ElCard,
    ElTable,
    ElTableColumn,
    ElPagination,
    ElDialog,
    ElPopconfirm,
    ElUpload,
    ElLoading,
    ElSelect,
    ElSelectV2,
    ElOption,
    ElRadioGroup,
    ElRadio,
    ElCascader,
    ElCheckbox,
    ElCol,
    ElCheckboxGroup,
    ElInputNumber,
    ElRow,
    ElMessageBox
} from 'element-plus'
import App from './App.vue'
import router from "./router";
import 'element-plus/dist/index.css'
// @ts-ignore
import VueHighlightJS from 'vue3-highlightjs'
import 'highlight.js/styles/a11y-dark.css'

// import 'element-plus/lib/theme-chalk/index.css'

// 修改后的主题样式必须放在最后面
// import '../theme/index.css'

//const orderStatus = {
//    // 0: '',
//}

const app = createApp(App)
// 全局过滤器
app.config.globalProperties.$filters = {
    // orderMap(status: string | number) {
    //     // @ts-ignore
    //     return orderStatus[status] || '未知状态'
    // },
    prefix(url: string) {
        if (url && url.startsWith('http')) {
            return url
        } else {
            return url
        }
    },
}

app.use(router)
app.use(VueHighlightJS)

app.use(ElButton)
    .use(ElContainer)
    .use(ElAside)
    .use(ElHeader)
    .use(ElMain)
    .use(ElFooter)
    .use(ElMenu)
    .use(ElSubMenu)
    .use(ElMenuItemGroup)
    .use(ElMenuItem)
    .use(ElForm)
    .use(ElFormItem)
    .use(ElInput)
    .use(ElPopover)
    .use(ElTag)
    .use(ElCard)
    .use(ElTable)
    .use(ElTableColumn)
    .use(ElPagination)
    .use(ElDialog)
    .use(ElPopconfirm)
    .use(ElUpload)
    .use(ElLoading)
    .use(ElSelect)
    .use(ElSelectV2)
    .use(ElOption)
    .use(ElRadioGroup)
    .use(ElRadio)
    .use(ElCascader)
    .use(ElCheckbox)
    .use(ElCol)
    .use(ElRow)
    .use(ElCheckboxGroup)
    .use(ElAffix)
    .use(ElInputNumber)
    .use(ElMessageBox)

app.mount('#app')
