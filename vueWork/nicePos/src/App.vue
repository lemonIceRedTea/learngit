<template>
  <div id="app">
    <left-nav></left-nav>
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>

<script>
import LeftNav from '@/components/common/LeftNav';

export default {
  name: 'App',
  components: {
    'leftNav': LeftNav
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.main {
  width: 95%;
  height: 100%;
  float: left;
  background-color: #EFF2F7;
  overflow: auto;
}
</style>
