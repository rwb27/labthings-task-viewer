import Vue from 'vue'
import App from './App.vue'

// Import MD icons [RWB: why is this not imported in a style section?]
import "material-design-icons/iconfont/material-icons.css";
import 'uikit'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
