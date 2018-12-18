import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
import LPspin from "./LPspin/index";
Vue.use(LPspin)
new Vue({
  el: '#app',
  mounted()
  {
    this.$LPspin.show("加载中。。。。")
  },
  render: h => h(App)
})
