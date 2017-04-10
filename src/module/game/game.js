import Vue from 'vue'
import Game from './Game.vue'
//noinspection ES6UnusedImports
import Bulma from 'bulma'

Vue.config.productionTip = false
new Vue({
  el: '#game',
  template: '<Game/>',
  components: { Game }
})
