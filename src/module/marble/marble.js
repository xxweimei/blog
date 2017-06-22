import Vue from "vue";
import Marble from "./Marble.vue";
//noinspection ES6UnusedImports
import Bulma from "bulma";

Vue.config.productionTip = false
new Vue({
  el: '#marble',
  template: '<Marble/>',
  components: { Marble }
})
