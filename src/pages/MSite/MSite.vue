<template>
  <div id="msite">
    <!-- 首页头部 -->
    <HeaderTop :title="address.name">
      <span class="header_search" slot="left">
        <i class="iconfont icon-icon_search1"></i>
      </span>
      <span class="header_login" slot="right">
        <span class="header_login_text">登录 | 注册</span>
      </span>
    </HeaderTop>
    <!-- 首页导航 -->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categories.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categories, index) in categoriesArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(category, index) in categories" :key="index">
              <div class="food_container">
                <img :src="baseImageUrl + category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="back" v-else>
    </nav>
    <!-- 首页附近商家 -->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang1"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'

import HeaderTop from '../../components/HeaderTop/HeaderTop'
import ShopList from '../../components/ShopList/ShopList'

export default {
  data () {
    return {
      baseImageUrl: 'https://fuss10.elemecdn.com'
    }
  },
  mounted () {
    this.$store.dispatch('getFoodCategories')
    this.$store.dispatch('getShops')
  },

  components: {
    HeaderTop,
    ShopList
  },

  watch: {
    categories (value) { // categories 数组中有数组了, 在异步更新界面之前执行
      // setTimeout(() => {
      // // 创建一个 swiper 实例对象
      // new Swiper('.swiper-container', {
      //   loop: true, // 循环模式选项
      //   // 如果需要分页器
      //   pagination: {
      //     el: '.swiper-pagination'
      //   }
      // })
      // }, 100)

      // 界面更新就立即创建 Swiper对象
      this.$nextTick(() => { // 一旦完成界面更新, 立即调用(此条语句要写在数据更新之后)
        // 创建一个 swiper 实例对象
        new Swiper('.swiper-container', {
          loop: true, // 循环模式选项
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination'
          }
        })
      })
    }
  },

  computed: {
    ...mapState(['address', 'categories']),
    /**
     * 根据 categories 一堆数组生成一个 二维数组,
     * 小数组中的元素的个数是 8
     */
    categoriesArr () {
      const { categories } = this
      // 准备空的 二维 数组
      const arr = []
      // 准备一个小数组 (最大长度是8)
      let minArr = []
      // 遍历 categories
      categories.forEach(c => {
        // 如果当前小数组满了, 创建一个新数组
        if (minArr.length === 8) {
          minArr = []
        }
        // 如果 minArr 是空的, 将小数组保存到大数组中
        if (minArr.length === 0) {
          arr.push(minArr)
        }
        // 将当前分类保存到小数组中
        minArr.push(c)
      })

      return arr
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../assets/stylus/mixins.styl"
#msite
  width 100%
  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff
    .swiper-container
      width 100%
      height 100%
      .swiper-wrapper
        width 100%
        height 100%
        display flex
        justify-content space-between
        .swiper-slide
          display flex
          justify-content center
          align-items: flex-start;
          flex-wrap wrap
          .link_to_food
            width 25%
            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0
              img
                display inline-block
                width 50px
                height 50px
            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666
  .msite_shop_list
    top-border-1px(#e4e4e4)
    overflow-x hidden
    margin-top 10px
    background #fff
    .shop_header
      padding 10px 10px 0
      .icon-xuanxiang1
        vertical-align middle
      .shop_header_title
        color #999
        font-size 14px
        line-height 20px
</style>
