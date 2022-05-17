import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import dayjs from 'dayjs'
import swc from 'unplugin-swc'
import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'
import svgLoader from 'vite-svg-loader'
import packageJSON from './package.json'

const isProd = process.env.NODE_ENV === 'production'
const proxyDist = 'http://localhost:5000'
const buildDate = dayjs().format('YYYY-MM-DDTHH:mm:ssZ')

const htmlPlugin = () => {
  return {
    name: 'html-transform',
    transformIndexHtml (html: string) {
      return html.replace(
        /<meta name="env" content="">/,
        `<meta name="env" content="${process.env.NODE_ENV}">`
      ).replace(
        /<meta name="buildDate" content="">/,
        `<meta name="buildDate" content="${buildDate}">`
      )
        .replace(
          /<meta name="version" content="">/,
          `<meta name="version" content="${packageJSON.version}">`
        )
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': {
      NODE_ENV: process.env.NODE_ENV,
      VERSION: packageJSON.version
    }
  },

  base: isProd
    ? '/'
    : '/',

  plugins: [
    swc.vite(),
    vue(),
    eslintPlugin({
      cache: false
    }),
    svgLoader(),
    htmlPlugin(),
    legacy({
      targets: 'defaults'
    })
  ],

  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    },

    preprocessorOptions: {
      styl: {
        imports: [
          // path.resolve(__dirname, './src/style/variable.styl')
        ]
      }
    }
  },

  server: {
    proxy: {
      '^/api/.*': {
        target: proxyDist,
        changeOrigin: true,
        secure: false
      }
    },
    port: 80,
    host: '0.0.0.0'
  },

  build: {
    assetsInlineLimit: 8192
  }
})
