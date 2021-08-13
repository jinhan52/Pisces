<template>
  <div class="login_container flex j-c a-c">
    <div class="login_box">
      <div class="avatar_box">
        <img
          src="https://thirdwx.qlogo.cn/mmopen/vi_32/NXoTIWG0iaT4VgibeHgprMYic8icqZkVWIpWQW12dKRcG2gUXvnT5BfsVfrA3oexIM8fy1Z1cbaPJmiafBYxfG76RdQ/132"
        />
      </div>
      <div class="form_box">
        <el-form
          ref="login_ref"
          :rules="login_rules"
          :model="loginform"
          label-width="0px"
          class="formdetails_box"
        >
          <!-- 账号 -->
          <el-form-item prop="phone">
            <el-input
              v-model="loginform.phone"
              prefix-icon="el-icon-user-solid"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <!-- 密码  -->
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="loginform.password"
              prefix-icon="el-icon-s-finance"
              placeholder="请输入密码"
            ></el-input>
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
        phone: "",
        password: "",
      },
      login_rules: {
        phone: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ],
      },
    };
  },
  methods: {
    resetloginFrom() {
      this.$refs.login_ref.resetFields();
    },
    OnlyNotify(msg, typeStauts = "success", sucess = "成功") {
      this.$notify({
        title: sucess,
        message: msg,
        type: typeStauts,
      });
    },
    login() {
      // 判断表单验证
      const self = this;
      this.$refs.login_ref.validate((valid) => {
        const parms = {
          phone: self.loginform.phone,
          password: self.loginform.password,
        };
        if (valid) {
          self.$http
            .post("/auth/authLogin", parms, {
              headers: {
                "Content-Type": "application/json;charset=UTF-8",
              },
            })
            .then((res) => {
              if (res.data.status === 20000) {
                self.$cookies.set(
                  "wnwtoken",
                  res.data.tokens.token,
                  "3d",
                  self.$http.baseURL
                );
                self.$cookies.set(
                  "wnwrefreshtoken",
                  res.data.tokens.token,
                  "30d",
                  self.$http.baseURL
                );
                localStorage.setItem(
                  "user",
                  JSON.stringify(res.data.data.user)
                );
                localStorage.setItem(
                  "menu",
                  JSON.stringify(res.data.data.menu)
                );
                self.$router.push("/home");
              } else {
                this.OnlyNotify("你输入的账号密码有误,请重新输入!", "error", "失败");
                this.loginform.password = "";
              }
            });
        }
      });
    },
  },
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