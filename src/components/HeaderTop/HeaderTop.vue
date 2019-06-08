<template>
  <header class="header">
    <slot name="left"></slot>
    <span class="header_title">
      <span class="header_title_text ellipsis">{{title}}</span>
    </span>
    <slot name="right"></slot>
  </header>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.header
  background-color #02a774
  width 100%
  height 45px
  position fixed
  left 0
  top 0
  z-index 999
  .header_search
    position absolute
    left 15px
    top 50%
    transform translateY(-50%)
    color #fff
    width 10%
    height 50%
    .icon-icon_search1
      font-size 25px
  .header_title
    width 50%
    position absolute
    left 50%
    top 50%
    transform translate(-50%, -50%)
    color #fff
    text-align center
    .header_title_text
      font-size 20px
      color #fff
      display block
  .header_login
    font-size 14px
    color #fff
    position absolute
    right 15px
    top 50%
    transform translateY(-50%)
    .header_login_text
      color #fff
</style>
