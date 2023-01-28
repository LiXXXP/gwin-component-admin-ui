import { ConfigEnv, loadEnv, UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import { viteMockServe } from 'vite-plugin-mock/dist'
import viteSvgIcons from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const port = 4000
  return {
    plugins: [
      vue(),
      vueJsx(),
      viteSvgIcons({
        iconDirs: [resolve(process.cwd(), 'node_modules/@gwin/svg-icon/lib/theme-default/icons/svg')],
        symbolId: 'icon-[dir]-[name]'
      }),
      viteMockServe({
        supportTs: true,
        mockPath: 'examples/mock',
        watchFiles: true, // 监视文件夹中的文件更改。 并实时同步到请求结果
        localEnabled: command === 'serve', // 设置为 false 将禁用 mock 功能
        prodEnabled: false // 设置打包是否启用 mock 功能
      })
    ],
    server: {
      host: '0.0.0.0',
      port: port,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: `http://127.0.0.1:${port}/mock`,
          changeOrigin: true,
          rewrite: (path) => path.replace('^' + env.VUE_APP_BASE_API, '')
        },
        '/api': {
          target: 'http://test-api.cdgwin.com',
          changeOrigin: true
        }
        // '/api': {
        //   target: 'http://192.168.60.90:9001',
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace('/api', '')
        // }
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './examples'),
        '~': resolve(__dirname, './packages')
      }
    }
  }
}
