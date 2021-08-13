<template>
  <div class="full-hegiht full-width">
    <div class="logo_box"><img src="../assets/image/catLog.png" width="100%" height="100%"></div>
    
    <el-menu
      class="el-menu-demo"
      mode="vertical"
      background-color="#001428"
      text-color="#909499"
      active-text-color="#fff"
      :default-active="activeUrls"
      :unique-opened="true"
    >
      <el-submenu
        :index="item.menubaseurl"
        v-for="item in menus"
        :key="item.menubaseurl"
      >
        <template slot="title">
          <i :class="item.menuicon"></i>
          <span>{{ item.menuname }}</span>
        </template>
        <el-menu-item
          :index="child.menubaseurl"
          v-for="child in item.children"
          :key="child.menubaseurl"
          @click="openUrl(child.menubaseurl, child.menuname, child.menu)"
        >
          <i class="el-icon-menu"></i>
          <span>{{ child.menuname }}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
 
<script>
// import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      menus: [],
      menusUrls: [],
      activeUrls: "",
    };
  },
  created() {
    const menu = JSON.parse(localStorage.getItem("menu"));
    this.menus = menu;
  },
  methods: {
    ...mapMutations("navStore", ["openNewUrl", "setNewActiveUrl"]),
    openUrl(url, name, newmenu) {
      const self = this;
      const urls = JSON.parse(JSON.stringify(self.getHistoryUrls));
      let isAdd = false;

      if (url !== "/home/dashboard") {
        urls.forEach((e) => {
          if (e.url === url) {
            isAdd = true;
          }
        });
        if (!isAdd) {
          const menu = {
            url: url,
            menuname: name,
            menu: newmenu,
          };
          this.openNewUrl(menu);
        }
      }
      this.setNewActiveUrl(url);
    },
    handelNewActiveUrl(url) {
      this.activeUrls = url;
    },
    refreshMenu(val) {
      const menu = JSON.parse(localStorage.getItem("menu"));
      this.menus = menu;
    },
  },
  computed: {
    ...mapState("navStore", ["historyUrls"]),
    ...mapGetters("navStore", [
      "getHistoryUrls",
      "getActiveUrl",
      "getMenuAddState",
    ]),
  },
  watch: {
    getActiveUrl: {
      handler: "handelNewActiveUrl",
      immediate: true,
    },
    getMenuAddState: {
      handler: "refreshMenu",
    },
  },
};
</script>
 
<style lang="less" scoped>
.logo_box {
  width: 100%;
  height: 120px;
}
.el-menu {
  border-right: solid 0px #e6e6e6;
}
</style>