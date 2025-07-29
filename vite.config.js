import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { viteMockServe  } from 'vite-plugin-mock'
// https://vite.dev/config/
export default defineConfig({
  base:'',
  server: {
    host: 'localhost',
    port: 5173,
    https: false,
    open: true
  },
  plugins: [
    vue(),
    viteMockServe({
      mockPath:'mock' //设置存储mock .js文件的文件夹  默认mock
    }),
    vueDevTools(),
    AutoImport({
      imports: [
        'vue',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar'
          ]
        }
      ]
    }),
    Components({
      resolvers: [NaiveUiResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    // target: 'es2020',  //浏览器兼容性 默认 'modules'，这是指 支持原生 ES 模块的浏览器
    cssCodeSplit: false,  //false 表示整个项目中的所有 CSS 将被提取到一个 CSS 文件中
    sourcemap: false,  //是否生成sourcemap文件
    terserOptions: {
      compress: {
        drop_console: true, // 生产环境移除console
        drop_debugger: true // 生产环境移除debugger
      }
    },
    chunkSizeWarningLimit:600, //包报警的最大设置 默认是500
    rollupOptions: {
      treeshake: true,   //默认就是true
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
               if(!id.includes("naive-ui")){
                return "common";
               }else{ 
                  return id.toString().split('node_modules/')[1].split('/')[0].toString()      
               }
          }
        }  
      }
    }
  }
})
