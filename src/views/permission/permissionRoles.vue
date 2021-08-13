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
          @click="initRoleData"
          class="margin-left"
        ></el-button>
      </div>
      <div class="flex">
        <el-button icon="el-icon-refresh" circle @click="refreshInitData"></el-button>
        <el-button type="primary" class="margin-left" @click="showRoleVisible"
          >角色添加</el-button
        >
      </div>
    </div>
    <el-divider></el-divider>
    <div>
      <el-table :data="roleData" style="width: 100%">
        <el-table-column prop="roleid" label="ID"> </el-table-column>
        <el-table-column prop="rolename" label="角色名称"> </el-table-column>
        <el-table-column prop="createTime" label="创建时间"> </el-table-column>
        <el-table-column prop="updateTime" label="修改时间"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              slot="reference"
              @click="clickPermission(scope.row.roleid)"
              >角色修改</el-button
            >

            <el-popconfirm
              confirm-button-text="好的"
              cancel-button-text="不用了"
              icon="el-icon-info"
              icon-color="red"
              @confirm="deleteRolePermission(scope.row.roleid)"
              title="确定要删除此角色吗？"
            >
              <el-button
                slot="reference"
                type="danger"
                size="mini"
                class="margin-left"
                >角色删除</el-button
              >
            </el-popconfirm>
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
      :title="isEditor ? '角色修改' : '角色添加'"
      :visible.sync="roleaddVisible"
      @opened="dialoginitData"
      @closed="dialoginiRemoveData"
      width="30%"
    >
      <el-form
        :label-position="labelPosition"
        label-width="120px"
        :model="rolesFroms"
        ref="role_ref"
      >
        <el-form-item prop="name" label="角色名称:">
          <el-input v-model="rolesFroms.rolename"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="角色分配:">
          <el-tree
            node-key="permissionid"
            :props="permissionprops"
            :data="permissionData"
            show-checkbox
            ref="permission"
          >
          </el-tree>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button>重 置</el-button>
        <el-button v-if="!isEditor" type="primary" @click="submitRoleAdd"
          >提 交</el-button
        >
        <el-button v-if="isEditor" type="primary" @click="submitRoleEditor"
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
      roleData: [],
      roleaddVisible: false,
      permissionprops: {
        label: "menuname",
        children: "children",
      },
      permissionData: [],
      rolesFroms: {
        rolename: "",
        roleid: "",
      },
      labelPosition: "left",
      permissionlistcache: [],
      isEditor: false,
      currentPage: 1,
      pageSize: 10,
      totalCount: 10,
      searchCondition: "",
    };
  },
  methods: {
    initRoleData() {
      this.$http
        .get("/permission/role/getAllRoles", {
          params: {
            currentPage: this.currentPage,
            pageSize: this.pageSize,
            search: this.searchCondition,
          },
        })
        .then((res) => {
          this.roleData = res.data.data.data;
          this.totalCount = res.data.data.count;
        });
    },
    initPermissionData() {
      this.$http.get("/permission/role/getAllPermission", null).then((res) => {
        this.permissionData = res.data.data;
      });
    },
    showRoleVisible() {
      this.isEditor = false;
      this.roleaddVisible = true;
    },
    addPermission() {
      console.log(this.$refs.permission.getCheckedKeys());
    },
    clickPermission(roleId) {
      this.roleaddVisible = true;
      const permission = this.roleData.filter((item) => {
        if (item.roleid === roleId) {
          return true;
        }
        return false;
      })[0];
      this.isEditor = true;
      this.rolesFroms.rolename = permission.rolename;
      this.rolesFroms.roleid = permission.roleid;
      const permissionlist = permission.allPermission.map((item) => {
        return item.permissionid;
      });
      this.permissionlistcache = permissionlist;
    },
    submitRoleAdd() {
      const permissions = this.$refs.permission.getCheckedKeys();
      const parms = {
        permissions: permissions,
        rolename: this.rolesFroms.rolename,
      };
      if (this.rolesFroms.rolename === "") {
        this.OnlyNotify("角色名称不能为空", "info", "提示");
        return;
      }
      this.$http
        .post("/permission/role/addRolePermission", parms, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        })
        .then((res) => {
          this.initRoleData();
          this.roleaddVisible = false;
          this.OnlyNotify("角色添加成功");
        });
    },
    submitRoleEditor() {
      const permissions = this.$refs.permission.getCheckedKeys();
      const parms = {
        permissions: permissions,
        rolename: this.rolesFroms.rolename,
        roleid: this.rolesFroms.roleid,
      };
      this.$http
        .post("/permission/role/updateRolePermission", parms, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        })
        .then((res) => {
          this.initRoleData();
          this.roleaddVisible = false;
          this.OnlyNotify("角色修改成功");
        });
    },
    OnlyNotify(msg, typeStauts = "success", sucess = "成功") {
      this.$notify({
        title: sucess,
        message: msg,
        type: typeStauts,
      });
    },
    dialoginitData() {
      this.$refs.permission.setCheckedKeys(this.permissionlistcache);
    },
    dialoginiRemoveData() {
      this.rolesFroms.rolename = "";
      this.rolesFroms.roleid = "";
      this.permissionlistcache = [];
      this.$refs.permission.setCheckedKeys([]);
    },
    deleteRolePermission(roleid) {
      this.$http
        .post(
          "/permission/role/deleteRolePermission",
          { roleid: roleid },
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
          }
        )
        .then((res) => {
          if (res.data.status === 20000) {
            this.OnlyNotify("角色删除成功", "warning");
            this.initRoleData();
          } else {
            this.OnlyNotify(res.data.message, "error", "失败");
          }
        });
    },
    handelPageChange(nowpage) {
      this.currentPage = nowpage;
      this.initRoleData();
    },
    refreshInitData(){
        this.initRoleData();
        this.initPermissionData();
    }
  },
  mounted() {
    this.initRoleData();
    this.initPermissionData();
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