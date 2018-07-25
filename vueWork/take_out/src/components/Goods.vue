<template>
    <div class="goods" v-if="this.goods">
      <div class="menuWrapper" ref="menuWrapper">
        <ul class="menu">
          <li class="menuItem" :class="{active: currentIndex === index}" v-for="(item, index) in goods" :key="index" @click="selectItem(index, $event)">
            <div class="text">
              <span class="icon" v-if="classMap[item.type]" :class="classMap[item.type]"></span>
              {{item.name}}
            </div>
          </li>
        </ul>
      </div>
      <div class="goodsWrapper" ref="goodsWrapper">
        <ul class="goodsList">
          <li class="goodsItem" v-for="(item, index) in goods" :key="index">
            <div class="goodTitle">
              <span>{{item.name}}</span>
            </div>
            <ul class="good">
              <li class="itemWrapper" v-for="(i, index) in item.foods" :key="index">
                <div class="item">
                  <div class="item-img">
                    <img :src="i.icon">
                  </div>
                <div class="item-msg">
                  <div class="item-name">{{i.name}}</div>
                  <div class="item-des">{{i.description}}</div>
                  <div class="item-sale">
                    <span class="item-nums">月售{{i.sellCount}}份</span>
                    <span class="item-ratings">好评率{{i.rating}}%</span>
                  </div>
                  <div class="item-price">
                    <span class="newPrice">￥{{i.price}}</span>
                    <span class="oldPrice" v-if="i.oldPrice">￥{{i.oldPrice}}</span>
                    <pick-control class="pickControl" :goodName='i.name'></pick-control>
                  </div>
                </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import Vue from 'vue'
import pickControl from '@/components/PickControl'
import {mapMutations, mapState} from 'vuex'
export default {
  data () {
    return {
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      heightList: [],
      scrollY: 0
    }
  },
  components: {
    pickControl
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.heightList.length; i++) {
        let height1 = this.heightList[i]
        let height2 = this.heightList[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    ...mapState(['goods'])
  },
  methods: {
    initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.goodsScroll = new BScroll(this.$refs.goodsWrapper, {
        click: true,
        probeType: 3
      })
      this.goodsScroll.on('scroll', (e) => {
        this.scrollY = Math.abs(Math.round(e.y))
      })
    },
    calScrollHeight () {
      let itemList = this.$refs.goodsWrapper.getElementsByClassName('goodsItem')
      let height = 0
      this.heightList.push(height)
      for (let i = 0; i < itemList.length; i++) {
        height += itemList[i].clientHeight
        this.heightList.push(height)
      }
    },
    selectItem (index, $event) {
      if (!$event._constructed) {
        return
      }
      let itemList = this.$refs.goodsWrapper.getElementsByClassName('goodsItem')
      this.goodsScroll.scrollToElement(itemList[index], 300)
    },
    ...mapMutations(['setGoodsCount', 'setGoodsPrice', 'setInitCount'])
  },
  created () {
  },
  watch: {
    goods () {
      let storeGoodsCount = {}
      let storeGoodsPrice = {}
      let _this = this
      this.goods.forEach((ele) => {
        ele.foods.forEach((key) => {
          storeGoodsCount[key.name] = 0
          storeGoodsPrice[key.name] = key.price
        })
      })
      this.setInitCount(storeGoodsCount)
      this.setGoodsCount(storeGoodsCount)
      this.setGoodsPrice(storeGoodsPrice)
      Vue.nextTick(() => {
        _this.initScroll()
        _this.calScrollHeight()
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/index.styl'
.goods
  position absolute
  display flex
  top 174px
  bottom 48px
  left 0
  right 0
  overflow hidden
  .menuWrapper
    flex 0 0 80px
    .menu
      .menuItem
        width 80px
        box-sizing border-box
        padding 0 12px 0 12px
        background-color #f3f5f7
        font-size 12px
        font-weight 200
        line-height 14px
        text-align center
        .text
          padding 20px 0
          border-1px(rgba(7, 17, 27, 0.1))
          .icon
            set-img(14px)
            background-size 14px
            vertical-align top
            &.decrease
              bg-image('decrease_3')
            &.discount
              bg-image('discount_3')
            &.guarantee
              bg-image('guarantee_3')
            &.invoice
              bg-image('invoice_3')
            &.special
              bg-image('special_3')
        &.active
          font-weight bold
          background-color #ffffff
  .goodsWrapper
    flex 1
    .goodTitle
      border-left 2px solid #d9dde1
      background-color #f3f5f7
      font-size 12px
      color rgb(147, 153, 159)
      line-height 26px
      height 26px
      span
        display inline-block
        margin-left 14px
    .good
      .itemWrapper
        padding 18px 18px 0 18px
        &:last-child
            .item
              border-1px(rgb(255,255,255))
        .item
          padding 0 0 18px 0
          border-1px(rgba(7,17,27,.1))
          display flex
          .item-img
            flex 0 0 57px
            font-size 0
            vertical-align top
            img
              set-img(57px)
          .item-msg
            flex 1
            display inline-block
            margin-left 10px
            .item-name
              font-size 14px
              color rgb(7, 17, 27)
              line-height 14px
              margin-top 4px
            .item-des, .item-sale
              font-size 10px
              line-height 10px
              color rgb(147, 153, 159)
              margin-top 8px
            .item-sale
              margin-top 8px
              .item-ratings
                display inline-block
                margin-left 12px
            .item-price
              margin-top 8px
              position relative
              .newPrice
                font-size 14px
                color red
                font-weight 700
                line-height 24px
                vertical-align middle
              .oldPrice
                font-size 10px
                color rgb(147, 153, 159)
                font-weight 700
                line-height 24px
                margin-left 8px
                text-decoration line-through
                vertical-align top
              .pickControl
                position absolute
                top 0
                right 0
</style>
