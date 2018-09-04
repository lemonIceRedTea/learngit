<template>
    <div class="left-nav">
        <ul>
            <li>
                <i class="icon iconfont icon-sousuo"></i>
                <div>搜索</div>
            </li>
            <li>
                <i class="icon iconfont icon-yinshi"></i>
                <div>食物</div>
            </li>
            <li>
                <i class="icon iconfont icon-yigou"></i>
                <div>购物车</div>
            </li>
            <li>
                <i class="icon iconfont icon-shouye"></i>
                <div>首页</div>
            </li>
            <li>
                <i class="icon iconfont icon-remen"></i>
                <div>热门</div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  name: "leftNav",
  data() {
    return {};
  }
};
</script>
<style>
    .left-nav {
        color: #fff;
        font-size: 10px;
        height: 100%;
        background-color: #1d8ce0;
        float: left;
        width: 5%;
    }
    .iconfont {
        font-size: 24px;
    }
    .left-nav ul {
        padding: 0px;
        margin: 0px;
    }
    .left-nav li {
        list-style: none;
        text-align: center;
        border-bottom: 1px solid #20a0ff;
        padding: 10px;
    }
</style>
