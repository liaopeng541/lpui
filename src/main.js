import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI);
import Lpspin from "./LPspin"
Vue.use(Lpspin);
Vue.prototype.$ELEMENT = { size: 'mini'};
new Vue({
  el: '#app',
  render: h => h(App)
})
