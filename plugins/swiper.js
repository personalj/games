import Vue from 'vue'
import 'swiper/swiper.min.css'

if (process.browser) {
  const VueAwesomeSwiper = require('vue-awesome-swiper/')
  Vue.use(VueAwesomeSwiper)
}
