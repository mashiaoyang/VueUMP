// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
process.env.MOCK && require('./mock')
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import enLocale from '../node_modules/element-ui/lib/locale/lang/en'
import zhLocale from '../node_modules/element-ui/lib/locale/lang/zh-CN'
import VueI18n from 'vue-i18n'
import 'font-awesome/css/font-awesome.min.css'

Vue.config.productionTip = false
Vue.use(Element, {
  size: 'small',
  zIndex: 3000
})
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh_CN',
  silentFallbackWarn: true,
  messages: {
    zh_CN: Object.assign(require('@/i18n/zh_CN.json'), zhLocale),
    en: Object.assign(require('@/i18n/en.json'), enLocale)
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  components: { App },
  template: '<App/>'
})
