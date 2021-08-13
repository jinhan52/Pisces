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
          @click="initMenuDataWithSearch"
          circle
          class="margin-left"
        ></el-button>
      </div>
      <div class="flex">
        <el-button
          icon="el-icon-refresh"
          @click="refreshInit"
          circle
        ></el-button>
        <el-button type="primary" class="margin-left" @click="showAddMenu"
          >新增菜单</el-button
        >
      </div>
    </div>
    <el-divider></el-divider>
    <div class="bottom_box">
      <el-table :data="menuData" style="width: 100%">
        <el-table-column
          prop="permissionid"
          label="ID"
          width="50px"
        ></el-table-column>
        <el-table-column prop="menuname" label="菜单名称"> </el-table-column>
        <el-table-column prop="menu" label="菜单组件"> </el-table-column>
        <el-table-column prop="menubaseurl" label="菜单路径"> </el-table-column>
        <el-table-column
          prop="parent.menuname"
          label="父级菜单"
        ></el-table-column>
        <el-table-column label="Icon图标" width="150px">
          <template slot-scope="scope">
            <i class="bigIcon" :class="scope.row.menuicon"></i>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间"> </el-table-column>
        <el-table-column prop="updateTime" label="修改时间"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              class="editorColor"
              size="mini"
              @click="editorMenu(scope.row.permissionid)"
              >编辑</el-button
            >

            <el-popconfirm
              confirm-button-text="好的"
              cancel-button-text="不用了"
              icon="el-icon-info"
              icon-color="red"
              @confirm="deleteMenu(scope.row.permissionid)"
              title="确定删除此菜单吗?"
            >
              <el-button
                class="margin-left"
                slot="reference"
                type="danger"
                size="mini"
                >删除</el-button
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
      :title="isEditor ? '菜单修改' : '菜单添加'"
      :visible.sync="menuAddVisible"
      width="30%"
    >
      <el-form
        :label-position="labelPosition"
        label-width="120px"
        :model="menuFroms"
        ref="menu_ref"
        :rules="addMenuRules"
      >
        <el-form-item prop="name" label="菜单名称:">
          <el-input v-model="menuFroms.name"></el-input>
        </el-form-item>
        <el-form-item prop="menuBaseUrl" label="菜单路径:">
          <el-input v-model="menuFroms.menuBaseUrl"></el-input>
        </el-form-item>
        <el-form-item prop="menu" label="菜单组件:">
          <el-input v-model="menuFroms.menu"></el-input>
        </el-form-item>
        <el-form-item label="是否为父菜单">
          <el-switch v-model="menuFroms.isParent" active-color="#13ce66">
          </el-switch>
        </el-form-item>

        <el-form-item v-if="!menuFroms.isParent" label="父菜单:">
          <el-select
            v-model="menuFroms.parentId"
            filterable
            placeholder="请选择"
          >
            <el-option
              v-for="item in menuParent"
              :key="item.menubaseurl"
              :label="item.menuname"
              :value="item.permissionid"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item v-if="menuFroms.isParent" label="菜单Icon:">
          <div class="flex a-c">
            <i
              :class="menuFroms.menuIcon"
              style="font-size: 35px; margin-right: 15px"
            ></i>
            <el-button
              icon="el-icon-search"
              circle
              @click="iconDrawerVisible = true"
            ></el-button>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button>重 置</el-button>
        <el-button v-if="!isEditor" type="primary" @click="submitMenu"
          >提 交</el-button
        >
        <el-button v-if="isEditor" type="primary" @click="submitEditorMenu"
          >修 改</el-button
        >
      </span>
    </el-dialog>

    <el-drawer
      title="Icon选择"
      :visible.sync="iconDrawerVisible"
      :direction="iconDrawerDirection"
    >
      <div class="flex f-w">
        <template v-for="item in AllmenuIcons">
          <i
            :class="item"
            style="font-size: 25px; margin: 15px; cursor: pointer"
            :key="item"
            @click="selectMenuIcon(item)"
          ></i>
        </template>
      </div>
    </el-drawer>
  </div>
</template>
 
<script>
import MenuIcons from "../../assets/json/MenuIcon";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      searchCondition: "",
      menuData: [],
      currentPage: 1,
      pageSize: 10,
      menuAddVisible: false,
      labelPosition: "left",
      menuFroms: {
        name: "",
        menuBaseUrl: "",
        menu: "",
        isParent: false,
        parentId: "",
        menuIcon: "",
        permissionid: "",
      },
      iconDrawerVisible: false,
      iconDrawerDirection: "rtl",
      isEditor: false,
      AllmenuIcons: [],
      menuParent: [],
      addMenuRules: {
        name: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
        menuBaseUrl: [
          { required: true, message: "请填写菜单路径", trigger: "blur" },
        ],
        menu: [
          { required: true, message: "请填写菜单组件名称", trigger: "blur" },
        ],
      },
      totalCount: 10,
    };
  },
  methods: {
    ...mapMutations("navStore", ["updateNewAddMenuState"]),
    initMenuData() {
      this.$http
        .get("/permission/initMenuData", {
          params: {
            currentPage: this.currentPage,
            pageSize: this.pageSize,
          },
        })
        .then((res) => {
          this.totalCount = res.data.data.count;
          this.menuData = res.data.data.data;
        });
    },
    initMenuDataWithSearch() {
      this.$http
        .get("/permission/initMenuDataWithSearch", {
          params: {
            currentPage: this.currentPage,
            pageSize: this.pageSize,
            search: this.searchCondition,
          },
        })
        .then((res) => {
          this.totalCount = res.data.data.count;
          this.menuData = res.data.data.data;
        });
    },
    initMenuParentData() {
      this.$http.get("/permission/initMenuParentData", null).then((res) => {
        this.menuParent = res.data.data;
      });
    },
    selectMenuIcon(icon) {
      this.menuFroms.menuIcon = icon;
      this.iconDrawerVisible = false;
    },
    submitMenu() {
      let parms;
      if (this.menuFroms.isParent) {
        parms = {
          menu: this.menuFroms.menu,
          menuname: this.menuFroms.name,
          menubaseurl: this.menuFroms.menuBaseUrl,
          menuicon: this.menuFroms.menuIcon,
        };
      } else {
        parms = {
          parentid: this.menuFroms.parentId,
          menu: this.menuFroms.menu,
          menuname: this.menuFroms.name,
          menubaseurl: this.menuFroms.menuBaseUrl,
        };
      }
      this.$refs.menu_ref.validate((valid) => {
        if (!valid) {
          this.OnlyNotify("请完善基本信息", "info", "失败");
          return;
        } else {
          if (this.menuFroms.isParent) {
            if (!parms.menuicon) {
              this.OnlyNotify("请完善基本信息", "info", "失败");
              return;
            }
          } else {
            if (!parms.parentid) {
              this.OnlyNotify("请完善基本信息", "info", "失败");
              return;
            }
          }
        }

        this.$http
          .post("/permission/addNewMenu", parms, {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
          })
          .then((res) => {
            localStorage.setItem("menu", JSON.stringify(res.data.data));
            this.initMenuData();
            this.initMenuParentData();
            this.updateNewAddMenuState();
            this.successNotify("菜单成功添加");
          });
      });
    },
    handelPageChange(nowpage) {
      this.currentPage = nowpage;
      this.initMenuData();
    },
    refreshInit() {
      this.initMenuData();
    },
    successNotify(msg, typeStauts = "success", sucess = "成功") {
      this.menuAddVisible = false;
      this.$notify({
        title: sucess,
        message: msg,
        type: typeStauts,
      });
      this.menuFroms = {
        name: "",
        menuBaseUrl: "",
        menu: "",
        isParent: false,
        parentId: "",
        menuIcon: "",
      };
    },
    OnlyNotify(msg, typeStauts = "success", sucess = "成功") {
      this.$notify({
        title: sucess,
        message: msg,
        type: typeStauts,
      });
    },
    editorMenu(permissionid) {
      const menuNow = this.menuData.filter((item) => {
        if (item.permissionid === permissionid) {
          return true;
        }
        return false;
      })[0];
      this.menuFroms = {
        name: menuNow.menuname,
        menuBaseUrl: menuNow.menubaseurl,
        menu: menuNow.menu,
        isParent: menuNow.parentid === 0,
        parentId: menuNow.parentid,
        menuIcon: menuNow.menuicon,
        permissionid: menuNow.permissionid,
      };
      this.isEditor = true;
      this.menuAddVisible = true;
      this.$refs.menu_ref.resetFields();
    },
    showAddMenu() {
      this.menuFroms = {
        name: "",
        menuBaseUrl: "",
        menu: "",
        isParent: false,
        parentId: "",
        menuIcon: "",
      };
      this.isEditor = false;
      this.menuAddVisible = true;
    },
    submitEditorMenu() {
      let parms;
      if (this.menuFroms.isParent) {
        parms = {
          permissionid: this.menuFroms.permissionid,
          menu: this.menuFroms.menu,
          menuname: this.menuFroms.name,
          menubaseurl: this.menuFroms.menuBaseUrl,
          menuicon: this.menuFroms.menuIcon,
          parentId: 0,
        };
      } else {
        parms = {
          permissionid: this.menuFroms.permissionid,
          parentid: this.menuFroms.parentId,
          menu: this.menuFroms.menu,
          menuname: this.menuFroms.name,
          menubaseurl: this.menuFroms.menuBaseUrl,
          menuicon: "",
        };
      }

      this.$refs.menu_ref.validate((valid) => {
        if (!valid) {
          this.OnlyNotify("请完善基本信息", "info", "失败");
          return;
        } else {
          if (this.menuFroms.isParent) {
            if (!parms.menuicon) {
              this.OnlyNotify("请完善基本信息", "info", "失败");
              return;
            }
          } else {
            if (!parms.parentid || parms.parentid === 0) {
              this.OnlyNotify("请完善基本信息", "info", "失败");
              return;
            }
          }
        }
        this.$http
          .post("/permission/eiditorMenu", parms, {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
          })
          .then((res) => {
            localStorage.setItem("menu", JSON.stringify(res.data.data));
            this.initMenuData();
            this.initMenuParentData();
            this.updateNewAddMenuState();
            this.successNotify("菜单修改成功");
          });
      });
    },
    deleteMenu(permissionid) {
      this.$http
        .post(
          "/permission/deleteMenu",
          { permissionid: permissionid },
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
          }
        )
        .then((res) => {
          if (res.data.status === 20000) {
            localStorage.setItem("menu", JSON.stringify(res.data.data));
            this.initMenuData();
            this.initMenuParentData();
            this.updateNewAddMenuState();
            this.successNotify("菜单删除成功");
          } else {
            this.successNotify(res.data.message, "error", "失败");
          }
        });
    },
  },
  mounted() {
    this.initMenuData();
    this.initMenuParentData();
    this.AllmenuIcons = MenuIcons.menuIcon;
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
.bigIcon {
  font-size: 25px;
}
/deep/ .editorColor {
  background-color: blueviolet;
  border-color: white;
}
</style>