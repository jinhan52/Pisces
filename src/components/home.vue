<template>
  <el-container class="home_box">
    <el-aside width="230px">
      <MyAsider></MyAsider>
    </el-aside>
    <el-container>
      <el-header>
        <MyHeaders></MyHeaders>
      </el-header>
      <el-main>
        <MyMain></MyMain>
      </el-main>
    </el-container>
  </el-container>
</template>
 
<script>
import MyHeaders from "../components/Hearder"
import MyAsider from "../components/Asider"
import MyMain from "../components/Main.vue"

export default {
  data() {
    return {};
  },
  components: {
    MyHeaders,
    MyAsider,
    MyMain
  }
};
</script>
 
<style lang="less" scoped>
.home_box {
  height: 100%;
}
.el-aside {
  background-color: #001428;
}
.el-header {
  border-bottom: 1px solid #ececec;
}
.el-main{
  background-color: #F5F7F9;
}
</style>