<template>
    <div class="merchant">
      <div class="merchant-header-wrapper">
        <div class="merchant-sell">
          <div class="merchant-name">{{seller.name}}</div>
          <div class="merchant-score">
            <span class="score-icon">
              <div class="icon-back"><span class="icon" v-for="n in 5" :key="n"></span>
              </div>
              <div class="icon-face">
                <span class="icon" v-for="n in scoreIcon" :key="n"></span>
              </div>
            </span>
            <span class="rating-count">({{seller.ratingCount}})</span>
            <span class="sell-count">{{seller.sellCount}}</span>
          </div>
          <div class="merchant-collect">
            <span class="collect-icon icon-favorite" :class="{collect: seller.collection}"></span>
            <span class="collect-text" v-if="seller.collection">收藏</span>
            <span class="collect-text" v-else>已收藏</span>
          </div>
        </div>
        <div class="merchant-msg">
          <div class="m-minPrice">
            <div class="text">起送价</div>
            <div class="num">{{seller.minPrice}}元</div>
          </div>
          <div class="m-deliveryPrice">
            <div class="text">商家配送</div>
            <div class="num">{{seller.deliveryPrice}}元</div>
          </div>
          <div class="m-deliveryTime">
            <div class="text">平均配送时间</div>
            <div class="num">{{seller.deliveryTime}}分钟</div>
          </div>
        </div>
      </div>
      <div class="merchant-bullentin-wrapper">
        <div class="m-bullentin">
          <div class="title">公告与活动</div>
          <div class="content">
            <span class="text">{{seller.bulletin}}</span>
          </div>
        </div>
        <div class="m-activities">
          <ul class="act-list">
            <li class="act-item" v-for="(item, index) in support" :key="index">
              <span class="activity-img" :class="type_num[item.type]"></span>
              <span class="activity-msg">{{item.description}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="merchant-scene-wrapper">
        <div class="scene-title">商家实景</div>
        <div class="scene-img" v-if="seller.pics">
          <span class="image" v-for="(item, index) in seller.pics" :key='index'><img :src="item"></span>
        </div>
      </div>
      <div class="merchant-info-wrapper">
        <div class="info-title">商家信息</div>
        <ul class="info-list" v-if="seller.infos">
          <li class="list-item" v-for="(item, index) in seller.infos" :key="index">{{item}}</li>
        </ul>
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
  computed: {
    scoreIcon () {
      return this.seller.score ? parseInt(this.seller.score) : 0
    },
    support () {
      return this.seller.supports ? this.seller.supports : []
    },
    ...mapState(['seller'])
  },
  created () {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/index.styl'
.merchant
  background-color #f3f5f7
  margin-bottom 48px
  overflow auto
  .merchant-header-wrapper
    padding 18px
    background-color #ffffff
    .merchant-sell
      position relative
      border-1px(rgba(7,17,27,0.1))
      padding 0 0 18px 0
      .merchant-name
        font-size 14px
        color rgb(7,17,27)
        line-height 14px
      .merchant-score
        margin-top 8px
        font-size 0
        .score-icon
          display inline-block
          position relative
          line-height 18px
          height 18px
          vertical-align top
          .icon-back
          .icon-face
            .icon
              set-img(18px)
              background-size 18px
              bg-image('star36_off')
              margin-left 8px
              &:first-child
                margin-left 0px
          .icon-face
            position absolute
            left 0
            top 0
            .icon
              bg-image('star36_on')
        .sell-count
        .rating-count
          display inline-block
          font-size 10px
          color rgb(77,85,93)
          line-height 18px
          height 18px
          margin-left 8px
        .sell-count
          margin-left 12px
      .merchant-collect
        position absolute
        right 0
        top 0
        .collect-icon
          display block
          font-size 24px
          line-height 24px
          height 24px
          color rgb(147,153,159)
          text-align center
          &.collect
            color rgb(240,20,20)
        .collect-text
          display block
          font-size 10px
          color rgb(77,85,93)
          line-height 10px
          text-align center
          margin-top 4px
    .merchant-msg
      padding 18px 0 0 0
      display flex
      .m-minPrice
      .m-deliveryPrice
      .m-deliveryTime
        flex 1
        text-align center
        border-1px-right(rgba(7,17,27,0.1))
        &:last-child
          border-1px-right(#ffffff)
        .text
          font-size 10px
          color rgb(147,153,159)
          line-height 10px
        .num
          margin-top 4px
          font-size 24px
          font-weight 10px
          color rgb(7,17,27)
          line-height 24px
  .merchant-bullentin-wrapper
    margin-top 16px
    padding 18px
    background-color #ffffff
    .m-bullentin
      border-1px(rgba(7,17,27,0.1))
      padding 0 0 16px 0
      .title
        font-size  14px
        color rgb(7,17,27)
        line-height 14px
        height 14px
      .content
        padding 8px 12px 0 12px
        .text
          font-size 12px
          font-weight 200
          color rgb(240,20,20)
          line-height 24px
    .m-activities
      .act-list
        font-size 0
        .act-item
          padding 16px 12px
          border-1px(rgba(7,17,27,0.1))
          &:last-child
            border-1px(#ffffff)
            padding 16px 12px 0 12px
          .activity-img
            set-img(16px)
            background-size 16px
            vertical-align middle
            &.decrease
              bg-image('decrease_4')
            &.discount
              bg-image('discount_4')
            &.guarantee
              bg-image('guarantee_4')
            &.invoice
              bg-image('invoice_4')
            &.special
              bg-image('special_4')
          .activity-msg
            display inline-block
            margin-left 6px
            font-size 12px
            color rgb(7,17,27)
            font-weight 200
            line-height 16px
            height 16px
            vertical-align middle
  .merchant-scene-wrapper
    margin-top 16px
    padding 18px
    font-size 0
    background-color #ffffff
    overflow hidden
    .scene-title
      font-size  14px
      color rgb(7,17,27)
      line-height 14px
      height 14px
    .scene-img
      margin-top 12px
      display flex
      .image
        flex 0 0 120px
        height 90px
        margin-right 6px
        flex-wrap nowrap
        img
          width 100%
          height 100%
  .merchant-info-wrapper
    margin-top 16px
    padding 18px
    font-size 0
    background-color #ffffff
    .info-title
      font-size  14px
      color rgb(7,17,27)
      line-height 14px
      height 14px
    .info-list
      .list-item
        padding 16px 12px
        border-1px(rgba(7,17,27,0.1))
        font-size 12px
        font-weight 200
        color rgb(7,17,27)
        line-height 16px
        &:last-child
          border-1px(#ffffff)
          padding 16px 12px 0 12px
</style>
