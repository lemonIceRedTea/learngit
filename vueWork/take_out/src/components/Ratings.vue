<template>
    <div class="ratings">
      <div class="ratings-header-wrapper">
        <div class="ratings-header">
          <div class="ratings-grade">
            <span class="grade">{{seller.score}}</span>
            <span class="synthesize">综合评分</span>
            <span class="rate">高于周边商家{{seller.rankRate}}%</span>
          </div>
          <div class="ratings-item-wrapper">
            <div class="ratings-item">
              <div class="service-score">
                <span class="score-text">服务态度</span>
                <span class="score-icon">
                  <div class="icon-back"><span class="icon" v-for="n in 5" :key="n"></span>
                  </div>
                  <div class="icon-face">
                    <span class="icon" v-for="n in sIconCount" :key="n"></span>
                  </div>
                </span>
                <span class="score">{{seller.serviceScore}}</span>
              </div>
              <div class="food-score">
                <span class="score-text">服务态度</span>
                <span class="score-icon">
                  <div class="icon-back"><span class="icon" v-for="n in 5" :key="n"></span>
                  </div>
                  <div class="icon-face">
                    <span class="icon" v-for="n in fIconCount" :key="n"></span>
                  </div>
                </span>
                <span class="score">{{seller.foodScore}}</span>
              </div>
              <div class="delivery-score">
                <span class="score-text">送达时间</span>
                <span class="delivery-time">{{seller.deliveryTime}}分钟</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ratings-list :ratings="ratings" :seller="seller"></ratings-list>
    </div>
</template>

<script>
import ratingsList from '@/components/RatingsList'
import {mapState} from 'vuex'
import axios from 'axios'
export default {
  data () {
    return {
      ratings: []
    }
  },
  components: {
    ratingsList
  },
  computed: {
    sIconCount () {
      return this.seller.serviceScore ? parseInt(this.seller.serviceScore) : 0
    },
    fIconCount () {
      return this.seller.foodScore ? parseInt(this.seller.foodScore) : 0
    },
    ...mapState(['seller'])
  },
  created () {
    axios.get('/sell/ratings').then((res) => {
      console.log(res)
      if (res.data.code === 0) {
        this.ratings = res.data.data
      }
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../assets/stylus/index.styl'
.ratings
  background-color #f3f5f7
  margin-bottom 48px
  .ratings-header-wrapper
    background-color #ffffff
    padding 18px 0
    border-1px(rgba(7,17,27,0.2))
    .ratings-header
      display flex
      .ratings-grade
        flex 0 0 137px
        border-1px-right(rgba(7,17,27,0.1))
        .grade
        .synthesize
        .rate
          width 100%
          text-align center
          display block
        .grade
          height 28px
          font-size 24px
          color rgb(255,123,0)
          line-height 28px
        .synthesize
          height 18px
          margin-top 6px
          font-size 12px
          color rgb(7,17,27)
          line-height 12px
        .rate
          font-size 10px
          line-height 10px
          color rgb(147,153,159)
          margin-top 8px
      .ratings-item-wrapper
        flex 1
        padding 0 24px
        .ratings-item
          // width 188px
          .service-score
          .food-score
          .delivery-score
            font-size 0
            .score-text
              display inline-block
              font-size 12px
              color rgb(7,17,27)
              line-height 18px
            .score-icon
              margin-left 12px
              display inline-block
              position relative
              line-height 18px
              vertical-align top
              .icon-back
              .icon-face
                .icon
                  set-img(18px)
                  background-size 18px
                  bg-image('star36_off')
                  margin-left 2px
                  &:first-child
                    margin-left 0px
              .icon-face
                position absolute
                left 0
                top 0
                .icon
                  bg-image('star36_on')
            .score
              display inline-block
              font-size 12px
              color rgb(255,153,0)
              line-height 18px
              margin-left 12px
          .delivery-score
            margin-top 8px
            .delivery-time
              display inline-block
              font-size 12px
              color rgb(147,153,159)
              line-height 18px
              margin-left 12px
          .food-score
            margin-top 8px
</style>
