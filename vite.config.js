import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')
console.log(path.resolve(__dirname, './src'))
// https://vitejs.dev/config/
export default defineConfig({
  // vite.config.js # or vite.config.ts
  plugins: [vue()],
  "resolve.alias": {
    '@': path.resolve(__dirname, 'src'),
    'view': path.resolve(__dirname, 'src/view'),
    'com': path.resolve(__dirname, 'src/components'),
    'api': path.resolve(__dirname, 'src/api'),
    'utils': path.resolve(__dirname, 'src/utils'),
  },
  server:{
    hostname: '0.0.0.0', // 默认是 localhost
    port: '8080', // 默认是 3000 端口
    open: true, // 浏览器自动打开
    https: false, // 是否开启 https
    ssr: false, // 服务端渲染
    base: './', // 生产环境下的公共路径
    outDir: 'dist', // 打包构建输出路径，默认 dist ，如果路径存在，构建之前会被删除
    proxy: { // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
      '/api': {
        target: 'http://poetry.apiopen.top', // 后端服务实际地址
        secure: false,  // 如果是https接口，需要配置这个参数
        ws: true,//是否代理websockets
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }

})
