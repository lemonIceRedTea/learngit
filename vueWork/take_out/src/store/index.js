import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

let state = {
  count: 0,
  price: 0,
  goodsCount: {},
  goodsPrice: {},
  initCount: {},
  seller: {},
  goods: []
}

let mutations = {
  setSeller (context, seller) {
    Vue.set(this.state, 'seller', seller)
  },
  setGoods (context, goods) {
    Vue.set(this.state, 'goods', goods)
  },
  setInitCount (context, obj) {
    Vue.set(this.state, 'initCount', {...obj})
  },
  setGoodsCount (context, obj) {
    Vue.set(this.state, 'goodsCount', obj)
  },
  setGoodsPrice (context, obj) {
    Vue.set(this.state, 'goodsPrice', obj)
  },
  addCount (context, name) {
    Vue.set(this.state.goodsCount, name, ++this.state.goodsCount[name])
  },
  subCount (context, name) {
    Vue.set(this.state.goodsCount, name, --this.state.goodsCount[name])
  },
  sumaryCount () {
    let count = 0
    for (let i in this.state.goodsCount) {
      count += this.state.goodsCount[i]
    }
    this.state.count = count
  },
  sumaryPrice () {
    let price = 0
    for (let i in this.state.goodsPrice) {
      price += this.state.goodsPrice[i] * this.state.goodsCount[i]
    }
    this.state.price = price
  }
}

export default new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: {},
  getters: {},
  modules: {}
})
