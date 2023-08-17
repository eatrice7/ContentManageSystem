import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'
import App from './App.vue'
import router from './router'
import pinia from './store'
import registerIcons from './global/register-icon'
import useLoginStore from './store/login/login'

// app.use(registerIcons) 会将app传入 registerIcons 函数中
const app = createApp(App)
app.use(registerIcons)
app.use(pinia)
// pinia加载完之后执行刷新动态添加路由函数
const loginStore = useLoginStore()
loginStore.loadLoadCacheAction()
// 顺序，动态路由添加完成后在加载router
app.use(router)
app.mount('#app')
