import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'  
const app=createApp(App);
app.config.globalProperties.$axops=axios
// base api
console.log(import.meta.env.VITE_NODE_ENV);
app
.use(router)
.use(store)
.use(ElementPlus)
.mount('#app')
