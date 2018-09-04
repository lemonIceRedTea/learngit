<template>
    <div class="pick-control">
      <span class="sub icon-remove_circle_outline" @click="sub" v-if="goodCount > 0"></span>
      <span class="num" v-if="goodCount > 0">{{goodCount}}</span>
      <span class="add icon-add_circle" @click="add"></span>
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  props: {
    goodName: {
      type: String
    }
  },
  data () {
    return {
    }
  },
  computed: {
    goodCount () {
      // console.log(this.goodsCount)
      return this.goodsCount[this.goodName]
    },
    ...mapState(['goodsCount'])
  },
  methods: {
    ...mapMutations(['addCount', 'subCount', 'sumaryCount', 'sumaryPrice']),
    add () {
      this.addCount(this.goodName)
      this.sumaryCount()
      this.sumaryPrice()
    },
    sub () {
      this.subCount(this.goodName)
      this.sumaryCount()
      this.sumaryPrice()
    }
  },
  created () {
    // console.log(this.goodName)
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/stylus/index.styl'
.pick-control
  font-size 0
  .add
  .sub
    display inline-block
    font-size 24px
    color rgb(0,160,220)
    line-height 24px
  .num
    display inline-block
    position absolute
    height 24px
    width 24px
    right 25px
    top 0
    font-size 10px
    color rgb(147,153,159)
    line-height 24px
    text-align center
  .sub
    margin-right 24px
</style>
