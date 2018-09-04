<template>
    <div class="pos">
        <div>
            <el-row>
                <el-col :span="7" id="order-list">
                   <el-tabs class="order-tabs" value="first" type="card">
                        <el-tab-pane label="点餐" name="first">
                            <el-table :data="tableData" border style="width: 100%">
                                <el-table-column prop="goodsName" label="商品"  ></el-table-column>
                                <el-table-column prop="count" label="量" width="50"></el-table-column>
                                <el-table-column prop="price" label="金额" width="70"></el-table-column>
                                <el-table-column  label="操作" width="100" fixed="right">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="small" @click="deletegoods(scope.row)">删除</el-button>
                                        <el-button type="text" size="small" @click="addgoods(scope.row)">增加</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="sum">
                                <span>共: {{totalCount}}件</span>
                                <span>合计: {{totalPrice}}元</span>
                            </div>
                            <div class="btn-group">
                                <el-button type="warning" @click="pending">挂单</el-button>
                                <el-button type="danger" @click="deleteAll">删除</el-button>
                                <el-button type="success" @click="checkout">结账</el-button>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="挂单" name="second">
                          <el-table :data="pendingData" border style="width: 100%">
                                <el-table-column prop="goodsName" label="商品"  ></el-table-column>
                                <el-table-column prop="count" label="量" width="50"></el-table-column>
                                <el-table-column prop="price" label="金额" width="70"></el-table-column>
                            </el-table>
                            <div class="sum">
                                <span>共: {{pendingCount}}件</span>
                                <span>合计: {{pendingPrice}}元</span>
                            </div>
                            <div class="btn-group">
                                <el-button type="success" @click="checkPending">结账</el-button>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="外卖" name="third">角色管理</el-tab-pane>
                    </el-tabs>
                </el-col>
                <el-col :span="17">
                    <div class="often-goods">
                        <div class="title">
                            热门商品
                        </div>
                        <div class="often-lists">
                            <ul>
                                <li v-for="goods in oftenGoods" @click="addgoods(goods)">
                                    <span>{{goods.goodsName}}</span>
                                    <span class="price">￥{{goods.price}}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="goods-type">
                        <el-tabs type="card">
                            <el-tab-pane label="汉堡">
                                <ul class='cookList'>
                                    <li v-for="goods in type0Goods" @click="addgoods(goods)">
                                        <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                                        <span class="foodName">{{goods.goodsName}}</span>
                                        <span class="foodPrice">￥{{goods.price}}</span>
                                    </li>
                                </ul>
                            </el-tab-pane>
                            <el-tab-pane label="小吃">
                              <ul class='cookList'>
                                  <li v-for="goods in type1Goods" @click="addgoods(goods)">
                                      <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                                      <span class="foodName">{{goods.goodsName}}</span>
                                      <span class="foodPrice">￥{{goods.price}}</span>
                                  </li>
                              </ul>
                            </el-tab-pane>
                            <el-tab-pane label="饮料">
                              <ul class='cookList'>
                                  <li v-for="goods in type2Goods" @click="addgoods(goods)">
                                      <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                                      <span class="foodName">{{goods.goodsName}}</span>
                                      <span class="foodPrice">￥{{goods.price}}</span>
                                  </li>
                              </ul>
                            </el-tab-pane>
                            <el-tab-pane label="套餐">
                              <ul class='cookList'>
                                  <li v-for="goods in type3Goods" @click="addgoods(goods)">
                                      <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                                      <span class="foodName">{{goods.goodsName}}</span>
                                      <span class="foodPrice">￥{{goods.price}}</span>
                                  </li>
                              </ul>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>    
</template>
<script>
import Axios from "axios";
export default {
  name: "pos",
  data() {
    return {
      tableData: [],
      oftenGoods: [],
      type0Goods: [],
      type1Goods: [],
      type2Goods: [],
      type3Goods: [],
      pendingData: [],
      pendingCount: 0,
      pendingPrice: 0,
      totalCount: 0,
      totalPrice: 0
    };
  },
  mounted() {
    let orderHeight = document.body.clientHeight;
    document.getElementById("order-list").style.height = orderHeight + "px";
  },
  created() {
    Axios.get("http://jspang.com/DemoApi/oftenGoods.php")
      .then(response => {
        this.oftenGoods = response.data;
      })
      .catch(err => {
        console.log(err);
        alert("不能访问");
      });
    Axios.get("http://jspang.com/DemoApi/typeGoods.php")
      .then(response => {
        this.type0Goods = response.data[0];
        this.type1Goods = response.data[1];
        this.type2Goods = response.data[2];
        this.type3Goods = response.data[3];
      })
      .catch(err => {
        console.log(err);
        alert("不能访问");
      });
  },
  methods: {
    addgoods(goods) {
      let isHas = false;
      let td = this.tableData;
      let len = this.tableData.length;
      for (let i = 0; i < len; i++) {
        if (goods.goodsId == td[i].goodsId) {
          isHas = true;
        }
      }
      if (isHas) {
        let arr = td.filter(ele => ele.goodsId == goods.goodsId);
        arr[0].count++;
      } else {
        let newGoods = {
          goodsId: goods.goodsId,
          goodsName: goods.goodsName,
          price: goods.price,
          count: 1
        };
        td.push(newGoods);
      }
      this.summaryGoods();
    },
    summaryGoods() {
      this.totalCount = 0;
      this.totalPrice = 0;
      this.tableData.forEach(ele => {
        this.totalCount += ele.count;
        this.totalPrice = this.totalPrice + ele.price * ele.count;
      });
    },
    deletegoods(goods) {
      this.tableData = this.tableData.filter(
        ele => ele.goodsId != goods.goodsId
      );
      this.summaryGoods();
    },
    deleteAll() {
      this.tableData = [];
      this.totalCount = 0;
      this.totalPrice = 0;
    },
    checkout() {
      if (this.totalCount != 0) {
        this.tableData = [];
        this.totalCount = 0;
        this.totalPrice = 0;
        this.$message({
          message: "结账成功，感谢你又为店里出了一份力!",
          type: "success"
        });
      } else {
        this.$message.error("不能空结。老板了解你急切的心情！");
      }
    },
    pending() {
      this.pendingCount = 0;
      this.pendingPrice = 0;
      if (this.totalCount != 0) {
        if (!this.pendingData) {
          this.pendingData = this.tableData;
          this.pendingCount = this.totalCount;
          this.pendingPrice = this.totalPrice;
        }else {
          this.tableData.forEach(ele1=>{
            let isExist = false;
            this.pendingData.forEach(ele2=>{
              if(ele2.goodsId == ele1.goodsId) {
                ele2.count += ele1.count;
                isExist = true;
              }
            })
            if(!isExist) {
              this.pendingData.push(ele1);
            }
          })
        }
        this.pendingData.forEach(ele=>{
          this.pendingCount += ele.count;
          this.pendingPrice = this.pendingPrice + (ele.count * ele.price); 
        })
        this.tableData = [];
        this.totalPrice = 0;
        this.totalCount = 0;
      }
    },
    checkPending() {
       if (this.pendingCount != 0) {
        this.pendingData = [];
        this.pendingCount = 0;
        this.pendingPrice = 0;
        this.$message({
          message: "结账成功，感谢你又为店里出了一份力!",
          type: "success"
        });
      } else {
        this.$message.error("不能空结。老板了解你急切的心情！");
      }
    }
  }
};
</script>
<style>
#order-list {
  border-right: 1px solid #ccc;
}
.sum {
  text-align: center;
}
.sum span {
  margin-left: 15px;
  font-size: 14px;
}
.btn-group {
  margin-top: 10px;
}
.title {
  height: 20px;
  border-bottom: 1px solid #d3dce6;
  background-color: #f9fafc;
  padding: 10px;
  text-align: left;
}
.often-lists ul li {
  list-style: none;
  float: left;
  border: 1px solid #e5e9f2;
  padding: 10px;
  margin: 5px;
  background-color: #fff;
  cursor: pointer;
}
.price {
  color: #58b7ff;
}
.goods-type {
  clear: both;
}
.cookList li {
  list-style: none;
  width: 23%;
  border: 1px solid #e5e9f2;
  height: auto;
  overflow: hidden;
  background-color: #fff;
  padding: 2px;
  float: left;
  margin: 2px;
  cursor: pointer;
}
.cookList li span {
  display: block;
  width: 35%;
  float: left;
  font-size: 14px;
}
.foodImg {
  width: 40%;
}
.foodName {
  font-size: 18px;
  padding-left: 10px;
  color: brown;
}
.foodPrice {
  font-size: 16px;
  padding-left: 10px;
  padding-top: 10px;
}
</style>
