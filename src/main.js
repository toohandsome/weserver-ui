import { createApp } from 'vue';

import Cookies from 'js-cookie';

import ElementPlus from 'element-plus';
import locale from 'element-plus/lib/locale/lang/zh-cn'; // 中文语言

import '@/assets/styles/index.scss'; // global css

import ContextMenu from '@imengyu/vue3-context-menu';
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css';
import App from './App';
import directive from './directive'; // directive
import router from './router';
import store from './store';


// 注册指令
import { download } from '@/utils/request';
import plugins from './plugins'; // plugins

// svg图标
import SvgIcon from '@/components/SvgIcon';
import elementIcons from '@/components/SvgIcon/svgicon';
import 'virtual:svg-icons-register';

import './permission'; // permission control

import { useDict } from '@/utils/dict';
import { addDateRange, handleTree, parseTime, resetForm, selectDictLabel, selectDictLabels } from '@/utils/ruoyi';

// 分页组件
import Pagination from '@/components/Pagination';
// 自定义表格工具组件
import RightToolbar from '@/components/RightToolbar';
// 文件上传组件
import FileUpload from "@/components/FileUpload";
// 图片上传组件
import ImageUpload from "@/components/ImageUpload";
// 图片预览组件
import ImagePreview from "@/components/ImagePreview";
// 自定义树选择组件
import TreeSelect from '@/components/TreeSelect';
// 字典标签组件
import DictTag from '@/components/DictTag';

import FileTop from '@/components/FileTop';
 
import 'xe-utils';

const app = createApp(App)

// 全局方法挂载
app.config.globalProperties.useDict = useDict
app.config.globalProperties.download = download
app.config.globalProperties.parseTime = parseTime
app.config.globalProperties.resetForm = resetForm
app.config.globalProperties.handleTree = handleTree
app.config.globalProperties.addDateRange = addDateRange
app.config.globalProperties.selectDictLabel = selectDictLabel
app.config.globalProperties.selectDictLabels = selectDictLabels

// 全局组件挂载
app.component('DictTag', DictTag)
app.component('Pagination', Pagination)
app.component('TreeSelect', TreeSelect)
app.component('FileUpload', FileUpload)
app.component('ImageUpload', ImageUpload)
app.component('ImagePreview', ImagePreview)
app.component('RightToolbar', RightToolbar)
app.component('FileTop', FileTop)
app.component(ContextMenu);

// VXETable.setup({
//   i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args)
// })

 
// app.use(Table)
// app.use(Icon)

app.use(router)
app.use(store)
app.use(plugins)
app.use(elementIcons)
app.component('svg-icon', SvgIcon)

directive(app)

// 使用element-plus 并且设置全局的大小
app.use(ElementPlus, {
  locale: locale,
  // 支持 large、default、small
  size: Cookies.get('size') || 'default'
})

app.mount('#app')
