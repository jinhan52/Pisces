<template>
  <el-container class="home_box">
    <el-aside width="200px">
      <div class="logo_box">Logo</div>
    </el-aside>
    <el-container>
      <el-header> Header </el-header>
      <el-main>
        Main
      </el-main>
    </el-container>
  </el-container>
</template>
 
<script>
export default {
  data() {
    return {};
  },
};
</script>
 
<style lang="less" scoped>
.home_box {
  height: 100%;
}
.el-aside {
  background-color: #1b2a47;
}
.el-header {
  border-bottom: 1px solid #ececec;
}
.logo_box {
  width: 100%;
  height: 60px;
  background-color: blue;
}
</style>