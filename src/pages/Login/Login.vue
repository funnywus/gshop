<template>
  <div class="login-container">
    <div class="login-inner">
      <div class="login-header">
        <h2 class="login-logo">硅谷外卖</h2>
        <div class="login-header-title">
          <a href="javascript:;" :class="{on: loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login-content">
        <form>
          <div :class="{on: loginWay}">
            <section class="login-message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button
                class="get-verification"
                :disabled="!rightPhone"
                :class="{right_phone: rightPhone}"
                @click.prevent="getCode">
                {{ computeTime > 0 ? `已发送(${computeTime})s` : '获取验证码' }}
                </button>
            </section>
            <section class="login-verification">
              <input type="tel" maxlength="8" placeholder="验证码">
            </section>
            <section class="login-hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !loginWay}">
            <section class="login-message">
              <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名">
            </section>
            <section class="login-verification">
              <input type="tel" maxlength="8" placeholder="密码">
              <div class="switch-button off">
                <div class="switch-circle"></div>
                <span class="switch-text">...</span>
              </div>
            </section>
            <section class="login-message">
              <input type="text" maxlength="11" placeholder="验证码">
              <img class="get-verification" src="./images/captcha.svg" alt="captcha">
            </section>
          </div>
          <button class="login-submit">登录</button>
        </form>
        <a href="javascript:;" class="about-us">关于我们</a>
      </div>
      <a href="javascript:" class="go-back" @click="$router.back()">
        <i class="iconfont icon-left"></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginWay: true, // true: 短信登录, false: 密码登录
      computeTime: 0, // 计时的时间
      phone: '' // 手机号
    }
  },

  computed: {
    rightPhone () {
      return /^1\d{10}$/.test(this.phone)
    }
  },

  methods: {
    getCode () {
      // 如果当前没有计时
      if (!this.computeTime) {
        // 启动定时器
        this.computeTime = 30
        const timeId = setInterval(() => {
          this.computeTime--
          if (this.computeTime <= 0) {
            clearInterval(timeId)
          }
        }, 1000)

        // 发送 ajax 请求(向指定手机号发送验证码)
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet.stylus">
.login-container
  width 100%
  height 100%
  background #fff
  overflow hidden
  .login-inner
    padding-top 60px
    width 80%
    margin 0 auto
    .login-header
      .login-logo
        font-size 40px
        font-weight bold
        color #02a774
        text-align center
      .login-header-title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #02a774
            font-weight 700
            border-bottom 2px solid #02a774
    .login-content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #02a774
          .login-message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get-verification
              outline none
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.right_phone
                color #000
          .login-verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch-button
              width 30px
              height 16px
              line-height 16px
              color #fff
              font-size 12px
              border 1px solid #ddd
              padding 0 6px
              border-radius 8px
              transition background-color .3s, border-color .3s
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              &.off
                background #fff
                .switch-text
                  float right
                  color #ddd
              &.on
                background #02a774
              >.switch-circle
                // transform translateX(27px)
                width 16px
                height 16px
                position absolute
                top -1px
                left -1px
                border 1px solid #ddd
                border-radius 50%
                background #fff
                box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                transition transform .3s
          .login-hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color #02a774
        .login-submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #4cd96f
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about-us
        display block
        font-size 14px
        margin-top 20px
        text-align center
        color #999
    .go-back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      >.iconfont
        font-size 20px
        color #999
</style>
