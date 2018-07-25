<template>
  <div class="my_header" :style="styleBack">
    <div class="header-wrapper">
      <div class="h_img">
        <img :src="seller.avatar">
      </div>
      <div class="merchant_msg">
        <div class="merchant-name">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="delivery">
          {{seller.description}}&nbsp;/&nbsp;{{seller.deliveryTime}}分钟送达
        </div>
        <div class="activity" v-if="seller.supports">
          <span class="activity-img" :class="type_num[seller.supports[0].type]"></span>
          <span class="activity-msg">{{seller.supports[0].description}}</span>
          <div class="activities" v-if="seller.supports" @click="toggleBlt">
            <span class="activity-num">{{seller.supports.length}}</span>
            <span class="icon-keyboard_arrow_right activity-icon"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-img"></span>
      <span class="bulletin">{{seller.bulletin}}</span>
      <span class="icon-keyboard_arrow_right activity-icon"></span>
    </div>
  <my-bulletin @toggleBlt="toggleBlt" v-show="isShowBlt"></my-bulletin>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import myBulletin from '@/components/bulletin'
export default {
  data () {
    return {
      isShowBlt: false,
      type_num: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  },
  methods: {
    toggleBlt () {
      this.isShowBlt = !this.isShowBlt
    }
  },
  components: {
    myBulletin
  },
  computed: {
    styleBack () {
      return {
        'background-image': `url(${this.seller.avatar} || '')`,
        'background-size': 'cover'
      }
    },
    ...mapState(['seller'])
  },
  updated () {
    // console.log(this.seller.supports[0].type)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../assets/stylus/index.styl'
.my_header
  font-size 0
  background-color rgba(7, 17, 27, 0.5)
  overflow hidden
  .header-wrapper
    display flex
    padding 24px 12px 18px 24px
    .h_img
      flex 0 0 64px
      set-img(64px)
      border-radius 2px
      overflow hidden
      img
        width 100%
        height 100%
    .merchant_msg
      flex 1
      margin-left 16px
      .merchant-name
        font-size 0
        .brand
          height 18px
          width 30px
          display inline-block
          background-size 30px 18px
          vertical-align top
          bg-image('brand')
        .name
          margin-left 6px
          display inline-block
          font-size 16px
          color rgb(255, 255, 255)
          font-weight bold
          line-height 18px
          vertical-align top
      .delivery
        margin-top 8px
        font-size 12px
        color rgb(255, 255, 255)
        font-weight 200
        line-height 12px
      .activity
        margin-top 10px
        display block
        font-size 0
        position relative
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
          margin-left 4px
          font-size 10px
          color rgb(255, 255, 255)
          font-weight 200
          line-height 16px
          height 16px
          vertical-align middle
        .activities
          position absolute
          right 0px
          top -5px
          padding 7px 8px
          display inline-block
          background-color rgba(0, 0, 0, 0.2)
          border-radius 12px
          font-size 0
          .activity-num, .activity-icon
            font-size 10px
            color rgb(255, 255, 255)
            font-weight 200
            line-height 12px
            height 12px
            vertical-align middle
          .activity-icon
            margin-left 2px
  .bulletin-wrapper
    position relative
    height 28px
    background-color rgba(7, 17, 27, 0.2)
    padding 0 24px 0 12px
    line-height 28px
    white-space nowrap
    text-overflow ellipsis
    overflow hidden
    color white
    font-size 10px
    .bulletin-img
      display inline-block
      width 22px
      height 14px
      background-size 22px 14px
      bg-image('bulletin')
      vertical-align middle
    .bulletin
      display inline-block
      margin-left 4px
      margin-right 4px
      vertical-align middle
    .activity-icon
      position absolute
      right 12px
      top 8px
</style>
