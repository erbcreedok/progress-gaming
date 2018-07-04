<template>
  <div id="app">
    <Header/>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/headerComponent/Header.vue'
import Footer from './components/footerComponent/Footer.vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/scss/main.scss'

export default {
  name: 'app',
  components: {
    Header, Footer
  }
}
</script>

