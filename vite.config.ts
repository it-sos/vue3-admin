import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vitePluginImport, {PluginOptions} from 'vite-plugin-babel-import';
// @ts-ignore
import path = require('path')

const baseUrl = {
  development: './',
  beta: './',
  release: './'
}

// https://vitejs.dev/config/
// @ts-ignore
export default ({ mode }) =>  defineConfig({
  plugins: [
    vue(),
    // vitePluginImport(<PluginOptions>[
    //   {
    //     libraryName: 'element-plus',
    //     libraryDirectory: 'es',
    //     style(name) {
    //       return `element-plus/lib/theme-chalk/${name}.css`;
    //     },
    //   }
    // ])
  ],
  // @ts-ignore
  base: baseUrl[mode],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
