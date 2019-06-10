<template>
  <section class="login-container">
    <div class="login-inner">
      <div class="login-header">
        <h2 class="login-logo">硅谷外卖</h2>
        <div class="login-header-title">
          <a href="javascript:;" :class="{on: loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login-content">
        <form @submit.prevent="login" autocomplete="off">
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
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login-hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !loginWay}">
            <section class="login-message">
              <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
            </section>
            <section class="login-verification">
              <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd">
              <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd">
              <div class="switch-button" :class="showPwd ? 'on' : 'off'" @click="showPwd = !showPwd">
                <div class="switch-circle" :class="{right: showPwd}"></div>
                <span class="switch-text">{{ showPwd ? 'abc' : '...' }}</span>
              </div>
            </section>
            <section class="login-message">
              <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
              <img class="get-verification" src="http://localhost:4000/captcha" alt="captcha" @click="getCaptcha" ref="captcha">
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
    <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip" />
  </section>
</template>

<script>
import AlertTip from '../../components/AlertTip/AlertTip'
import {
  reqSendCode,
  reqSmsLogin,
  reqPwdLogin
} from '../../api'

export default {
  data () {
    return {
      loginWay: true, // true: 短信登录, false: 密码登录
      computeTime: 0, // 计时的时间
      showPwd: false, // 是否显示密码
      phone: '', // 手机号
      code: '', // 短信验证码
      name: '', // 用户名
      pwd: '', // 密码
      captcha: '', // 图形验证码
      alertText: '', // 提示文本
      alertShow: false // 是否显示提示框
    }
  },

  computed: {
    rightPhone () {
      return /^1\d{10}$/.test(this.phone)
    }
  },

  methods: {
    // 异步获取短信验证码
    async getCode () {
      // 如果当前没有计时
      if (!this.computeTime) {
        // 启动定时器
        this.computeTime = 30
        this.timeId = setInterval(() => {
          this.computeTime--
          if (this.computeTime <= 0) {
            clearInterval(this.timeId)
          }
        }, 1000)

        // 发送 ajax 请求(向指定手机号发送验证码)
        const result = await reqSendCode(this.phone)
        if (result.code === 1) {
          // 显示提示
          this.showAlert(result.msg)
          // 停止倒计时
          if (this.computeTime) {
            this.computeTime = 0
            clearInterval(this.timeId)
            this.timeId = undefined
          }
        }
      }
    },
    showAlert (alertText) {
      this.alertShow = true
      this.alertText = alertText
    },
    // 异步登录
    async login () {
      let result
      // 前台表单提交
      if (this.loginWay) { // 短信登录
        const {rightPhone, phone, code} = this
        if (!rightPhone) {
          // 手机号不正确
          this.showAlert('手机号不正确')
          return
        } else if (!/^\d{6}$/.test(code)) {
          // 验证码必须是6位数字
          this.showAlert('验证码必须是6位数字')
          return
        }
        // 发送 ajax 请求短信登录
        result = await reqSmsLogin({phone, code})
      } else { // 密码登录
        const { name, pwd, captcha } = this
        if (!name) {
          // 用户名必须指定
          this.showAlert('用户名必须指定')
          return
        } else if (!pwd) {
          // 密码必须指定
          this.showAlert('密码必须指定')
          return
        } else if (!captcha) {
          // 验证码必须指定
          this.showAlert('验证码必须指定')
          return
        }
        // 发送 ajax 请求密码登录
        result = await reqPwdLogin({name, pwd, captcha})
      }

      // 停止倒计时
      if (this.computeTime) {
        this.computeTime = 0
        clearInterval(this.timeId)
        this.timeId = undefined
      }

      // 根据结果数据处理
      if (result.code === 0) {
        const user = result.data
        // 将 user 保存到 vuex 中的 state
        // 去个人中心界面
        this.$store.dispatch('recordUser', user)
        this.$router.replace('/profile')
      } else {
        // 显示新的图片验证码
        this.getCaptcha()
        // 显示警告信息
        const msg = result.msg
        this.showAlert(msg)
      }
    },
    // 关闭提示框
    closeTip () {
      this.alertShow = false
      this.alertText = ''
    },
    // 获取一个新的图像验证码
    getCaptcha () {
      // 每次指定的 src 都要不是一样
      this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now()
    }
  },

  components: {
    AlertTip
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
                &.right
                  transform translateX(27px)
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
