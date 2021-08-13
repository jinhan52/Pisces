<template>
  <div>
    <div class="top_box flex a-c j-s">
      <div class="flex">
        <el-input
          placeholder="关键词查询"
          prefix-icon="el-icon-date"
          v-model="searchCondition"
          class="radiusInput"
        >
        </el-input>

        <el-button
          icon="el-icon-search"
          circle
          class="margin-left"
          @click="initUsersData"
        ></el-button>
      </div>
      <div class="flex">
        <el-button
          icon="el-icon-refresh"
          circle
          @click="refreshData"
        ></el-button>
        <el-button type="primary" class="margin-left" @click="showUserAdd"
          >添加用户</el-button
        >
      </div>
    </div>
    <el-divider></el-divider>
    <div>
      <el-table :data="usersData" style="width: 100%">
        <el-table-column prop="userid" label="ID"> </el-table-column>
        <el-table-column prop="username" label="用户名称"> </el-table-column>
        <el-table-column prop="phone" label="用户电话"> </el-table-column>
        <el-table-column label="用户头像">
          <template slot-scope="scope">
            <div>
              <el-avatar :src="scope.row.avatar"></el-avatar>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="email地址"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div>
              <el-button
                type="primary"
                class="editorColor"
                size="mini"
                @click="showedtitorUser(scope.row.userid)"
                >编辑</el-button
              >
              <el-popconfirm
                confirm-button-text="好的"
                cancel-button-text="不用了"
                icon="el-icon-info"
                icon-color="red"
                @confirm="deleteUsers(scope.row.userid)"
                title="确定删除此用户吗?"
              >
                <el-button
                  slot="reference"
                  type="danger"
                  size="mini"
                  class="margin-left"
                  >删除</el-button
                >
              </el-popconfirm>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div class="flex j-e margin-top">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalCount"
          @current-change="handelPageChange"
        ></el-pagination>
      </div>
    </div>

    <el-dialog
      :title="isEditor ? '用户修改' : '用户添加'"
      :visible.sync="userddVisible"
      width="40%"
    >
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        :model="userFroms"
        :rules="addUsersRules"
        ref="user_ref"
      >
        <el-form-item prop="username" label="用户名称:">
          <el-input v-model="userFroms.username"></el-input>
        </el-form-item>

        <el-form-item prop="phone" label="用户电话:">
          <el-input v-model="userFroms.phone"></el-input>
        </el-form-item>

        <el-form-item prop="password" label="用户密码:">
          <el-input v-model="userFroms.password" show-password></el-input>
        </el-form-item>

        <el-form-item prop="email" label="用户Email:">
          <el-input v-model="userFroms.email"></el-input>
        </el-form-item>

        <el-form-item label="用户角色:">
          <el-transfer
            v-model="userFroms.roles"
            :data="roleData"
            :props="roleProps"
            :titles="['角色', '已选角色']"
          ></el-transfer>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button>重 置</el-button>
        <el-button v-if="!isEditor" type="primary" @click="submitUserAdd"
          >提 交</el-button
        >
        <el-button v-if="isEditor" type="primary" @click="edtitorUser"
          >修 改</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      searchCondition: "",
      currentPage: 1,
      pageSize: 10,
      totalCount: 10,
      usersData: [],
      isEditor: false,
      userddVisible: false,
      labelPosition: "left",
      userFroms: {
        userid: "",
        username: "",
        phone: "",
        password: "",
        email: "",
        roles: [],
      },
      roleData: [],
      roleProps: {
        key: "roleid",
        label: "rolename",
      },
      addUsersRules: {
        username: [
          { required: true, message: "请输入用户昵称", trigger: "blur" },
        ],
        phone: [{ required: true, message: "请输入电话号码", trigger: "blur" }],
        email: [
          { message: "请输入正确的邮箱格式", trigger: "blur", type: "email" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码长度不能低于6位", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    handelPageChange(nowpage) {},
    initUsersData() {
      this.$http
        .get("/permission/users/initUsersData", {
          params: {
            currentPage: this.currentPage,
            pageSize: this.pageSize,
            search: this.searchCondition,
          },
        })
        .then((res) => {
          this.usersData = res.data.data.data;
          this.totalCount = res.data.data.count;
        });
    },
    initRoleData() {
      this.$http.get("/permission/users/initRoleData", null).then((res) => {
        this.roleData = res.data.data;
      });
    },
    showUserAdd() {
      this.isEditor = false;
      this.userddVisible = true;
      this.userFroms = {
        userid: "",
        username: "",
        phone: "",
        password: "",
        email: "",
        roles: [],
      };
    },
    submitUserAdd() {
      this.$refs.user_ref.validate((valid) => {
        if (valid) {
          this.$http
            .post("/permission/users/addNewUser", this.userFroms, {
              headers: {
                "Content-Type": "application/json;charset=UTF-8",
              },
            })
            .then((res) => {
              this.initUsersData();
              this.userddVisible = false;
              this.OnlyNotify("用户添加成功");
            });
        } else {
          this.OnlyNotify("请完善用户信息", "error", "失败");
        }
      });
    },
    OnlyNotify(msg, typeStauts = "success", sucess = "成功") {
      this.$notify({
        title: sucess,
        message: msg,
        type: typeStauts,
      });
    },
    showedtitorUser(userid) {
      this.isEditor = true;
      const users = this.usersData.filter((item) => {
        if (item.userid === userid) return true;
        else return false;
      })[0];
      const roles = users.allRolesList.map((item) => {
        return item.roleid;
      });
      this.userFroms = {
        userid: users.userid,
        username: users.username,
        phone: users.phone,
        password: "******",
        email: users.email,
        roles: roles,
      };
      this.userddVisible = true;
    },
    edtitorUser() {
      this.$http
        .post("/permission/users/updateUser", this.userFroms, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        })
        .then((res) => {
          this.initUsersData();
          this.userddVisible = false;
          this.OnlyNotify("用户修改成功");
        });
    },
    deleteUsers(userId) {
      this.$http
        .post(
          "/permission/users/deleteUser",
          { userid: userId },
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
          }
        )
        .then((res) => {
          if (res.data.status === 20000) {
            this.OnlyNotify("用户删除成功", "warning");
            this.initUsersData();
          } else {
            this.OnlyNotify(res.data.message, "error", "失败");
          }
        });
    },
    refreshData() {
      this.initUsersData();
      this.initRoleData();
    },
  },
  mounted() {
    this.initUsersData();
    this.initRoleData();
  },
};
</script>
 
<style lang="less" scoped>
.top_box {
  height: 50px;
}
/deep/ .radiusInput > .el-input__inner {
  border-radius: 20px;
}
</style>