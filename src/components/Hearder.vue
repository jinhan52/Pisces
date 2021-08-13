<template>
  <div class="flex j-s a-c full-hegiht">
    <div> </div>
    <div class="flex a-c left-header">
      <el-dropdown trigger="hover" placement="bottom" size="small" @command="handleCommand">
        <el-avatar
          size="medium"
          icon="el-icon-user-solid"
          class="cu-pointer"
          :src="avatar"
        ></el-avatar>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="setting">个人设置</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <i class="el-icon-setting setting-buttom cu-pointer"></i>
    </div>
  </div>
</template>
 
<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
        avatar: ""
    };
  },
  methods: {
    ...mapMutations("navStore", ["cleanHistoryUrls"]),
      handleCommand(command){
          if(command === 'logout'){
              this.$cookies.remove("wnwtoken");
              this.$cookies.remove("wnwrefreshtoken");
              this.cleanHistoryUrls();
              localStorage.clear();
              this.$router.push("/login");
          }
      }
  },
  mounted(){
      const user = JSON.parse(localStorage.getItem("user"));
      this.avatar = user.avatar;
  }
};
</script>
 
<style lang="less" scoped>
.setting-buttom {
  font-size: 22px;
}
.left-header > * {
  margin-right: 25px;
}
.el-dropdown-menu__item:hover{
background-color:#ECECEC;
color: black;
}
</style>