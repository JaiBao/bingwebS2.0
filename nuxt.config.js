// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      gtagId: 'G-X324G8MHR2',
      gtmId: 'GTM-KDPQWSKX', //  GTM ID
      quantityApiBaseUrl: process.env.QUANTITY_API_BASE_URL || 'https://www.dtstw.com/api',
      posApiBaseUrl: process.env.POS_API_BASE_URL || 'http://tods.dtstw.com/api',
      bingApiBaseUrl: process.env.BING_API_BASE_URL || 'https://www.chinabing.net/tods'
    }
  },
  head: {
    title: '中華一餅 | 手作輕食 潤餅盒餐外送第一品牌',
    meta: [
      {
        name: 'description',
        content:
          '好吃中華一餅傳承台灣潤餅美食並將其發展成企業愛戴的團體便當、團體餐盒。無論是午茶盒餐、潤餅便當、團體盒餐、點心餐盒等或是會議餐盒外送、便當外送，找中華一餅就對囉！'
      }
    ]
  },
  // 開發者工具
  devtools: { enabled: true },
  // 使用的模块
  modules: ['@pinia/nuxt', 'nuxt-quasar-ui', 'nuxt-simple-sitemap', '@nuxt/image'],
  // 全局 CSS
  css: ['~/assets/global.scss'],
  // Quasar 插件配置
  quasar: {
    plugins: ['Notify', 'Loading'],
    config: {
      lang: 'zh-tw'
    }
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/connectionUs', '/chinaBing', 'cico', '/group', '/privacy', '/history', '/faq', 'sitemap.xml'],
      ignore: []
    }
  },
  // 網站訊息
  site: {
    url: 'https://www.chinabing.net'
  },
  // 路由配置
  router: {
    trailingSlash: false
    // middleware: ['agreeCollection']
  }
})
