<template>
  <div id="footer-guide">
    <a :to="{path: '/'}" class="guide-item" :class="{on: '/msite' === $route.path}" @click="goTo('/msite')">
      <span class="item-icon">
        <i class="iconfont icon-icon-waimai-copy"></i>
      </span>
      <span class="item-title">外卖</span>
    </a>
    <a :to="{path: '/search'}" class="guide-item" :class="{on: '/search' === $route.path}" @click="goTo('/search')">
      <span class="item-icon">
        <i class="iconfont icon-icon_search"></i>
      </span>
      <span class="item-title">搜索</span>
    </a>
    <a :to="{path: '/order'}" class="guide-item" :class="{on: '/order' === $route.path}" @click="goTo('/order')">
      <span class="item-icon">
        <i class="iconfont icon-icon--copy"></i>
      </span>
      <span class="item-title">订单</span>
    </a>
    <a :to="{path: '/profile'}" class="guide-item" :class="{on: '/profile' === $route.path}" @click="goTo('/profile')">
      <span class="item-icon">
        <i class="iconfont icon-gerenxinxi-"></i>
      </span>
      <span class="item-title">我的</span>
    </a>
  </div>
</template>

<script>
export default {
  name: 'footer-guide',
  methods: {
    goTo (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
// 引入公共样式
@import "../../assets/stylus/mixins.styl"
#footer-guide
  top-border-1px(#e4e4e4)
  width 100%
  height 50px
  background-color #fff
  overflow hidden
  display flex
  position fixed
  bottom 0
  left 0
  right 0
  z-index 999
  .guide-item
    display flex
    flex 1
    text-align center
    align-items center
    flex-direction column
    margin 5px
    color: #999999
    &.on
      color #02a774
    span
      font-size 13px
      margin-top 3px
      margin-bottom 2px
</style>
