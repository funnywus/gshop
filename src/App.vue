<template>
  <div id="app">
    <!-- <transition> -->
    <router-view/>
    <!-- </transition> -->
    <footer-guide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import FooterGudie from './components/FooterGuide/FooterGuide'

export default {
  async mounted () {
    // this.$store.dispatch('getAddress')
    this.getAddress()
  },

  methods: {
    ...mapActions(['getAddress'])
  },

  components: {
    'footer-guide': FooterGudie
  }
}
</script>

<style lang="stylus" rel="stylesheet.stylus" scoped>
#app
  width 100%
  height 100%
  background #f5f5f5
  .v-enter
    opacity 0
    transform translateX(100%)
  .v-leave-to
    transform translateX(-100%)
    position absolute
    // z-index 100
  .v-enter-active,
  .v-leave-active
    transition all .5s ease
</style>
