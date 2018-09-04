<template>
  <div class="ratings-content-wrapper">
    <div class="ratings-content-header">
      <ul class="header-tag" @click="selectShow">
        <li class="tag tag-all">全部{{ratings.length}}</li>
        <li class="tag tag-sa">满意{{saRatings.length}}</li>
        <li class="tag tag-unsa">不满意{{unSaRatings.length}}</li>
      </ul>
      <div class="header-choose" >
        <span class="choose-icon icon-check_circle" @click="seeContent" :class="{active: isShow}"></span>
        <span class="choose-text" @click="seeContent">只看有内容的评价</span>
      </div>
    </div>
    <div class="ratings-content">
      <ul class="content">
        <li class="item" v-for="(item, index) in ratingsList" :key="index">
          <div class="client-icon">
            <img :src="item.avatar">
          </div>
          <div class="client">
            <div class="client-name">
              {{item.username}}
              <span class="rateTime">{{returnTime(item.rateTime)}}</span>
            </div>
            <div class="client-mark">
              <span class="score-icon">
                <div class="icon-back">
                  <span class="icon" v-for="n in 5" :key="n"></span>
                </div>
                <div class="icon-face">
                  <span class="icon" v-for="n in item.score" :key="n"></span>
                </div>
              </span>
              <span class="time" v-if="item.deliveryTime">{{item.deliveryTime}}分钟</span>
            </div>
            <div class="client-ratings">{{item.text}}</div>
            <div class="food-tag">
              <span class="rating-icon" :class="item.rateType === 0 ? 'icon-thumb_up' :'icon-thumb_down'"></span>
              <span class="tags" v-for="(i, index) in item.recommend" :key="index">{{i}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    seller: {
      type: Object,
      default: () => ({})
    },
    ratings: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      saRatings: [],
      unSaRatings: [],
      textRatings: [],
      isShow: false,
      showType: -1
    }
  },
  methods: {
    returnTime (time) {
      let date = new Date()
      date.setTime(time)
      return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}`
    },
    seeContent () {
      this.isShow = !this.isShow
    },
    selectShow (e) {
      if (e.target.classList.contains('tag-all')) {
        this.showType = -1
      } else if (e.target.classList.contains('tag-sa')) {
        this.showType = 0
      } else if (e.target.classList.contains('tag-unsa')) {
        this.showType = 1
      } else {
      }
    },
    intersectionList (list1, list2) {
      let arr = []
      list1.forEach(ele => {
        for (let i = 0; i < list2.length; i++) {
          if (ele === list2[i]) {
            arr.push(ele)
          }
        }
      })
      return arr
    }
  },
  computed: {
    sIconCount () {
      return this.seller.serviceScore ? parseInt(this.seller.serviceScore) : 0
    },
    fIconCount () {
      return this.seller.foodScore ? parseInt(this.seller.foodScore) : 0
    },
    ratingsList () {
      if (!this.isShow) {
        switch (this.showType) {
          case 0:
            return this.saRatings
          case 1:
            return this.unSaRatings
          default:
            return this.ratings
        }
      } else {
        switch (this.showType) {
          case 0:
            return this.intersectionList(this.saRatings, this.textRatings)
          case 1:
            return this.intersectionList(this.unSaRatings, this.textRatings)
          default:
            return this.intersectionList(this.ratings, this.textRatings)
        }
      }
    }
  },
  watch: {
    ratings () {
      this.saRatings = []
      this.unSaRatings = []
      this.textRatings = []
      this.ratings.forEach((ele) => {
        if (ele.rateType === 0) {
          this.saRatings.push(ele)
        } else if (ele.rateType === 1) {
          this.unSaRatings.push(ele)
        } else {
        }
        if (ele.text) {
          this.textRatings.push(ele)
        }
      })
    }
  },
  created () {},
  updated () {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/index.styl'
.ratings-content-wrapper
    margin-top 18px
    border-1px-top(rgba(7,17,27,0.2))
    background-color #ffffff
    .ratings-content-header
      padding 18px
      border-1px(rgba(7,17,27,0.2))
      .header-tag
        padding 0 0 18px 0
        border-1px(rgba(7,17,27,0.1))
        .tag
          display inline-block
          margin-left 8px
          font-size 12px
          height 32px
          line-height 32px
          text-align center
          padding 0 12px
          &.tag-all
            margin-left 0
            color #ffffff
            background-color rgb(0,160,220)
          &.tag-sa
            color rgb(77,85,93)
            background-color rgb(204,236,248)
          &.tag-unsa
            color rgb(77,85,93)
            background-color rgb(233,235,236)
      .header-choose
        padding 18px 0 0 0
        font-size 0
        .choose-icon
          font-size 20px
          line-height 20px
          vertical-align middle
          color rgb(147,153,159)
          &.active
            color rgb(0,160,220)
        .choose-text
          font-size 12px
          line-height 20px
          color rgb(147,153,159)
          display inline-block
          margin-left 8px
          vertical-align middle
    .ratings-content
      padding 0 18px
      .content
        .item
          border-1px(rgba(7,17,27,0.1))
          padding 18px 0
          display flex
          .client-icon
            flex 0 0 28px
            width 28px
            height 28px
            font-size 0
            border-radius 50%
            overflow hidden
            img
              height 100%
              width 100%
          .client
            flex 1
            margin-left 12px
            .client-name
              font-size 10px
              line-height 12px
              color rgb(7,17,27)
              height 12px
              position relative
              .rateTime
                display inline-block
                position absolute
                right 0
                top 0
                font-size 10px
                font-weight 200
                color rgb(147,153,159)
                line-height 12px
                height 12px
            .client-mark
              margin-top 4px
              .score-icon
                display inline-block
                position relative
                line-height 12px
                vertical-align top
                .icon-back
                .icon-face
                  .icon
                    set-img(12px)
                    background-size 12px
                    bg-image('star24_off')
                .icon-face
                  position absolute
                  left 0
                  top 0
                  .icon
                    bg-image('star24_on')
              .time
                display inline-block
                font-size 10px
                line-height 12px
                color rgb(147,153,159)
                font-weight 200
                margin-left 6px
            .client-ratings
              line-height 18px
              color rgb(7,17,27)
              font-size 12px
              margin-top 6px
            .food-tag
              .rating-icon
                font-size 12px
                color rgb(0,160,220)
                line-height 16px
                margin-top 8px
              .tags
                display inline-block
                padding 0 6px
                font-size 9px
                color rgb(147,153,159)
                line-height 16px
                border 1px solid rgba(7,17,27,0.1)
                border-radius 1px
                background-color #ffffff
                margin-top 8px
</style>
