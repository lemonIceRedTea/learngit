<template>
    <div class="cart-list">
      <div class="list-shadow" @click="toggleShadow"></div>
      <div class="list-wrapper">
        <div class="list-title">
          <span class="title-name">购物车</span>
          <span class="title-clear" @click="clearList">清空</span>
        </div>
        <ul class="list">
          <li class="list-item" v-for="(value, key, index) in goodList" :key="index">
            <span class="item-name">{{key}}</span>
            <pick-control class="pickControl" :goodName="key"></pick-control>
            <span class="item-price">￥{{value * goodsPrice[key]}}</span>
            </li>
        </ul>
      </div>
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import pickControl from '@/components/PickControl'
export default {
  components: {
    pickControl
  },
  computed: {
    goodList () {
      let obj = {}
      for (let key in this.goodsCount) {
        if (this.goodsCount[key] !== 0) {
          obj[key] = this.goodsCount[key]
        }
      }
      return obj
    },
    ...mapState(['goodsCount', 'goodsPrice', 'initCount'])
  },
  methods: {
    clearList () {
      this.setGoodsCount({...this.initCount})
      this.sumaryCount()
      this.sumaryPrice()
    },
    toggleShadow () {
      this.$emit('toggleList')
    },
    ...mapMutations(['setGoodsCount', 'sumaryCount', 'sumaryPrice'])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/index.styl'
.cart-list
  .list-shadow
    position absolute
    top 0
    left 0
    right 0
    bottom 48px
    background-color rgba(7,17,27,0.6)
    filter blur(5px)
  .list-wrapper
    position absolute
    left 0
    bottom 48px
    .list-title
      width 100vw
      height 40px
      box-sizing border-box
      padding 0 18px
      background-color #f3f5f7
      border-1px(rgba(7,17,27,0.1))
      .title-name
        display inline-block
        font-size 14px
        font-weight 200
        color rgb(7,17,27)
        line-height 40px
      .title-clear
        display inline-block
        font-size 12px
        color rgb(0,160,220)
        line-height 40px
        float right
    .list
      max-height 217px
      overflow auto
      display flex
      flex-direction column
      background-color #ffffff
      .list-item
        font-size 0
        position relative
        width 100vw
        flex 0 0 24px
        padding 18px 12px
        box-sizing border-box
        .item-name
          font-size 14px
          color rgb(7,17,27)
          line-height 24px
          display inline-block
        .item-price
          font-size 14px
          font-weight 700
          color rgb(240,20,20)
          line-height 24px
          display inline-block
          float right
          margin-right 12px
          margin-left 18px
        .pickControl
          // position absolute
          // top 0
          // right 0
          position relative
          display inline-block
          float right
</style>
