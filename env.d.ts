/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

declare module 'element-plus';

// 声明 mjs 文件
declare module '*.mjs'
