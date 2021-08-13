<template>
  <div class="main_box">
    <el-tabs v-model="editableTabsValue" type="card" @tab-remove="removeTab" @tab-click="clickHistoryTap">

      <el-tab-pane :key="homeMenu.url" :label="homeMenu.menuname" :name="homeMenu.url">
        <router-view :name="homeMenu.menu" class="margin-tw"></router-view>
      </el-tab-pane>

      <el-tab-pane
        v-for="item in getHistoryUrls"
        :key="item.url"
        :label="item.menuname"
        :name="item.url"
        :closable="true"
      >
        <router-view :name="item.menu" class="margin-tw"></router-view>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>
 
<script>
// import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      editableTabsValue: "/home/dashboard",
      third: "3",
      namesd: "首页",
      homeMenu: {
        url: "/home/dashboard",
        menuname: "首页",
        menu: "homeDashboard"
      }
    };
  },
  methods: {
    ...mapMutations("navStore", ["setNewActiveUrl", "removeHistoryUrl"]),
    removeTab(targetName) {
      this.removeHistoryUrl(targetName);
    },
    clickHistoryTap(val){
      const url = val.name;
      this.setNewActiveUrl(url);
    },
    setLocalNewActiveUrl(url){
      this.editableTabsValue = url;
    }
  },
  computed: {
    ...mapState("navStore", ["historyUrls"]),
    ...mapGetters("navStore", ["getHistoryUrls", "getActiveUrl"])
  },
  watch: {
    getActiveUrl: {
      handler: "setLocalNewActiveUrl",
      immediate: true
    }
  }
};
</script>
 
<style lang="less" scoped>
.main_box{
  background-color: white;
}
/deep/ .el-tabs__item.is-active {
  color: black;
}
/deep/ .el-tabs__item:hover {
  color: black;
}
/deep/ .el-tabs__item {
  color: #bdbdc0;
}
</style>