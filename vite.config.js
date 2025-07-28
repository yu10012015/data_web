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
  server: {
    host: 'localhost',
    port: 5173,
    https: false,
    proxy: {
      '/api': {
        target:'http://192.168.82.215/webNerve/modules/itservice/CostsAnalytics/liwenyan/LunGengDataSystem/',
        changeOrigin:true,
        rewrite:(path)=>path.replace (/^\/api/,'')
        
      },
    }, 
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
})
