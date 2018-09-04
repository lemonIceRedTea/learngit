<template>
  <div class="bulletins">
    <div class="b-header">
      <div class="b-name">{{seller.name}}</div>
      <div class="score-icon">
        <div class="icon-back">
          <span class="icon" v-for="n in 5" :key="n"></span>
          <div class="icon-face">
            <span class="icon" v-for="n in scoreIcon" :key="n"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="b-separator">
      <span class="sep"></span>
      <span class="title">优惠信息</span>
      <span class="sep"></span>
    </div>
    <div class="b-act">
      <ul class="act-list">
        <li class="act-item" v-for="(item, index) in support" :key="index">
          <span class="activity-img" :class="type_num[item.type]"></span>
          <span class="activity-msg">{{item.description}}</span>
        </li>
      </ul>
    </div>
    <div class="b-separator">
      <span class="sep sepleft"></span>
      <span class="title">商家公告</span>
      <span class="sep sepright"></span>
    </div>
    <div class="blt">
      <div class="content">
        <span class="text">{{seller.bulletin}}</span>
      </div>
    </div>
    <div class="b-icon">
      <span class="icon-close" @click="close"></span>
    </div>
    <div class="back">
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      type_num: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  },
  methods: {
    close () {
      this.$emit('toggleBlt')
    }
  },
  computed: {
    scoreIcon () {
      return this.seller.score ? parseInt(this.seller.score) : 0
    },
    support () {
      return this.seller.supports ? this.seller.supports : []
    },
    ...mapState(['seller'])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../assets/stylus/index.styl'
.bulletins
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  z-index 100
  .back
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    z-index -1
    background-color rgba(7,17,27,0.8)
    filter blur(5px)
  .b-header
    .b-name
      margin-top 64px
      text-align center
      font-size 16px
      font-weight 700
      color #ffffff
      line-height 16px
    .score-icon
      margin-top 16px
      height 24px
      display flex
      justify-content center
      .icon-back
        position relative
        .icon
          set-img(24px)
          background-size 24px
          bg-image('star48_off')
          margin-left 24px
          &:first-child
            margin-left 0
        .icon-face
          position absolute
          left 0
          top 0
          .icon
            set-img(24px)
            background-size 24px
            bg-image('star36_on')
            margin-left 24px
            &:first-child
              margin-left 0
  .b-separator
    margin-top 28px
    line-height 14px
    height 14px
    padding 0 36px
    display flex
    align-items center
    .sep
      display inline-block
      flex 0 0 112px
      border-1px(rgba(255,255,255,0.2))
    .title
      flex 1
      text-align center
      font-size 12px
      font-weight 200
      color #ffffff
      line-height 12px
      height 12px
  .b-act
    padding 24px 48px 0 48px
    .act-list
      .act-item
        margin-bottom 12px
        &:last-child
          margin-bottom 0
        .activity-img
          set-img(16px)
          background-size 16px
          vertical-align middle
          &.decrease
            bg-image('decrease_1')
          &.discount
            bg-image('discount_1')
          &.guarantee
            bg-image('guarantee_1')
          &.invoice
            bg-image('invoice_1')
          &.special
            bg-image('special_1')
        .activity-msg
          display inline-block
          margin-left 6px
          font-size 12px
          color rgb(255, 255, 255)
          font-weight 200
          line-height 12px
          height 12px
          vertical-align middle
  .blt
    padding 24px 48px 0 48px
    font-size 12px
    font-weight 200
    color #ffffff
    line-height 24px
  .b-icon
    text-align center
    position absolute
    left 0
    right 0
    bottom 32px
    font-size 32px
    color rgba(255,255,255,0.5)
    .icon-close
      padding 6px
</style>
