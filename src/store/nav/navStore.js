const nav = {
  namespaced: true,
  state: {
    activeUrl: '/home/dashboard',
    historyUrls: [],
    menuAddState: 1
  },
  mutations: {
    openNewUrl(state, menu) {
      state.historyUrls.push(menu);
    },
    setNewActiveUrl(state, newUrl){
      state.activeUrl = newUrl
    },
    removeHistoryUrl(state, oldUrl){
      // console.log(oldUrl);
      state.historyUrls = state.historyUrls.filter(e => {
        if(e.url === oldUrl){
          return false;
        }
        return true;
      });
      if(state.historyUrls.length === 0){
        state.activeUrl = '/home/dashboard'
      }else{
        state.activeUrl = state.historyUrls[state.historyUrls.length - 1].url;
      }
    },
    updateNewAddMenuState(state){
      state.menuAddState += 1;
    },
    cleanHistoryUrls(state){
      state.activeUrl = '/home/dashboard';
      state.historyUrls = [];
    }
  },
  actions: {

  },
  getters: {
    getHistoryUrls: (state) => {
      return state.historyUrls;
    },
    getActiveUrl: (state) => {
      return state.activeUrl;
    },
    getMenuAddState: (state) => {
      return state.menuAddState;
    }
  }
}
export default {
  nav
}
