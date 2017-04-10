import Vue from 'vue'
import Home from './Home.vue'
//noinspection ES6UnusedImports
import Bulma from 'bulma'

Vue.config.productionTip = false
new Vue({
  el: '#home',
  template: '<Home/>',
  components: { Home }
})
