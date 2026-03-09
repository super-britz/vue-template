import { createApp } from 'vue'
import { createPinia } from 'pinia'
import TitanComponentsLibrary from '@ninebot/pc-titan-components'
import '@ninebot/pc-titan-styles-b/dist/index.css'

import App from './App.vue'
import './assets/main.css'
import router from './router'
import { setupRouterGuard } from './router/guard'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(TitanComponentsLibrary, {
  iconFolderPath: 'titan',
  iconStyle: { 'font-size': '24px', color: '#606266' },
  components: {
    TiDialog: {
      scrollLinerConfig: {
        isShowTopLine: false,
        isShowBottomLine: true,
      },
    },
    TiDrawer: {
      scrollLinerConfig: {
        isShowTopLine: false,
        isShowBottomLine: true,
      },
    },
    TiSearchInput: {
      searchIconStyle: { 'font-size': '20px', color: '#606266' },
    },
    TiSearchSelect: {
      arrowDownIconStyle: { 'font-size': '20px', color: '#606266' },
    },
  },
})
setupRouterGuard(router)

app.mount('#app')
