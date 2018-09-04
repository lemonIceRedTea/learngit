<template>
  <div id="app">
    <!-- head -->
    <my-head></my-head>
    <!-- 导航 -->
    <div class="navigation">
      <router-link to="/goods" class="nav">商品</router-link>
      <router-link to="/ratings" class="nav">评价</router-link>
      <router-link to="/merchant" class="nav">商家</router-link>
    </div>
    <!-- goods -->
    <div class="content">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <!-- 购物车 -->
    <cart class="cart" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></cart>
  </div>
</template>

<script>
import myHead from '@/components/Header'
// import Vue from 'vue'
import axios from 'axios'
import cart from '@/components/cart'
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['seller', 'goods'])
  },
  methods: {
    ...mapMutations(['setSeller', 'setGoods'])
  },
  components: {
    myHead,
    cart
  },
  created () {
    axios.get('/sell/seller').then((res) => {
      console.log(res.data.data)
      if (res.data.code === 0) {
        this.setSeller(res.data.data)
      }
    })
    axios.get('/sell/goods').then((res) => {
      if (res.data.code === 0) {
        this.setGoods(res.data.data)
      }
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import './assets/stylus/index.styl'
.navigation
  height 40px
  width 100%
  display flex
  background-color #ffffff
  font-size 14px
  line-height 14px
  text-align center
  align-items center
  justify-content center
  border-1px(rgba(7,17,2,0.1))
  .nav
    flex 1
    padding 6px
    color rgb(138,142,147)
    &:active
      color rgb(240,20,20)
</style>
