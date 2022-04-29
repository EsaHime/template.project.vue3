import 'reflect-metadata'

import 'dayjs/locale/zh-cn'

import dayjs from 'dayjs'
import { createApp } from 'vue'

import { AppLayout } from './layout/app'

dayjs.locale('zh-cn')
initApp()

function initApp () {
  const app = createApp(AppLayout)
  app.mount('#app')
}
