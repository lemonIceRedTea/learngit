<template>
  <div class="cart-wrapper">
    <cart-list class="cartList" v-show="isToggle" @toggleList="toggleList"></cart-list>
    <div class="cart">
      <div class="left">
        <div class="cart-img icon-shopping_cart" :class="{active: count > 0}" @click="toggleList">
          <span class="cart-num" v-if="count > 0">{{count}}</span>
        </div>
        <div class="money">￥{{price}}</div>
        <div class="fee">另需配送费￥{{deliveryPrice}}</div>
      </div>
      <div class="right" :class="{active: minPrice - price <= 0}" @click="mySubmit">
        {{lackMoney}}
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import cartList from '@/components/CartList'
export default {
  props: ['deliveryPrice', 'minPrice'],
  data () {
    return {
      isToggle: false
    }
  },
  components: {
    cartList
  },
  methods: {
    toggleList () {
      if (this.count > 0) {
        this.isToggle = !this.isToggle
      }
    },
    mySubmit (e) {
      if (e.target.classList.contains('active')) {
        alert('提交订单成功')
        this.setGoodsCount({...this.initCount})
        this.sumaryCount()
        this.sumaryPrice()
      }
    },
    ...mapMutations(['setGoodsCount', 'sumaryCount', 'sumaryPrice'])
  },
  computed: {
    ...mapState(['count', 'price', 'goodsCount', 'goodsPrice', 'initCount']),
    lackMoney () {
      return this.minPrice - this.price > 0 ? ('￥' + (this.minPrice - this.price) + '起送') : '提交订单'
    }
  },
  watch: {
    count (to) {
      if (to <= 0) {
        this.isToggle = false
      }
    }
  },
  created () {
    // console.log(this.deliveryPrice)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/index.styl'
.cart-wrapper
  .cart
    position fixed
    bottom 0px
    left 0px
    height 48px
    width 100%
    background-color #141d27
    display flex
    .left
      flex 1
      padding 12px 12px 12px 18px
      font-size 0
      .cart-img
        position relative
        display inline-block
        width 44px
        height 44px
        font-size 24px
        color rgba(255,255,255,.4)
        margin-top -24px
        text-align center
        line-height 44px
        background-color rgba(0,0,0,.2)
        border-radius 50%
        .cart-num
          position absolute
          display inline-block
          top -6px
          right 0
          width 24px
          height 16px
          font-size 9px
          font-weight 700
          line-height 16px
          color rgb(255,255,255)
          border-radius 12px
          background-color rgb(240,20,20)
          box-shadow 0px 2px 4px 0px rgba(0,0,0,.4)
        &.active
          background-color rgb(0,160,220)
          color rgb(255,255,255)
        &::after
          content ''
          display inline-block
          position absolute
          top -6px
          left -6px
          width 56px
          height 56px
          z-index -1
          background-color #141d27
          border-radius 50%
      .money
        display inline-block
        margin-left 18px
        font-size 16px
        color rgb(255,255,255,.4)
        font-weight 700
        line-height 24px
        padding-right 12px
        border-1px-right(rgb(255,255,255,.1))
      .fee
        display inline-block
        margin-left 12px
        font-size 14px
        color rgb(255,255,255,.4)
        font-weight 700
        line-height 24px
    .right
      flex 0 0 105px
      background-color rgba(255,255,255,.4)
      color rgba(255,255,255,.4)
      font-size 12px
      line-height 24px
      font-weight 700
      box-sizing border-box
      padding 12px 8px
      text-align center
      // .delivery-money
      &.active
        background-color green
</style>
