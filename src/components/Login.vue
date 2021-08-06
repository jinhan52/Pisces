<template>
  <div class="login_container flex j-c a-c">
    <div class="login_box">
      <div class="avatar_box">
        <img
          src="https://thirdwx.qlogo.cn/mmopen/vi_32/NXoTIWG0iaT4VgibeHgprMYic8icqZkVWIpWQW12dKRcG2gUXvnT5BfsVfrA3oexIM8fy1Z1cbaPJmiafBYxfG76RdQ/132"
        />
      </div>
      <div class="form_box">
        <el-form ref="login_ref" :rules="login_rules" :model="loginform" label-width="0px" class="formdetails_box">
          <!-- 账号 -->
          <el-form-item prop="username">
            <el-input v-model="loginform.username" prefix-icon="el-icon-user-solid" placeholder="请输入账号"></el-input>
          </el-form-item>
          <!-- 密码  -->
          <el-form-item prop="password">
            <el-input type="password" v-model="loginform.password" prefix-icon="el-icon-s-finance" placeholder="请输入密码"></el-input>
          </el-form-item>
          <!-- 登录 -->
          <el-form-item class="flex j-e">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button @click="resetloginFrom">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      loginform: {
        username: '',
        password: ''
      },
      login_rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码需要在6-15位中', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetloginFrom(){
      this.$refs.login_ref.resetFields();
    },
    login(){
      // 判断表单验证
      const self = this;
      this.$refs.login_ref.validate((valid) => {
        if (valid){
          console.log('object');
          console.log(self.$router);
          self.$router.push('/home');
        }
      })
    }
  }
};
</script>
 
<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: white;
  border-radius: 20px;
  position: relative;
}
.avatar_box {
  width: 120px;
  height: 120px;
  background-color: white;
  box-shadow: 0 0 10px #2b4b6b;
  border-radius: 50%;
  padding: 5px;
  position: absolute;
  transform: translate(165px, -60px);
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
.form_box {
  width: 100%;
  margin-top: 100px;
}
.formdetails_box {
  padding: 0 15px;
}
</style>