import Vuex from 'vuex';
import Vue from "vue";
import service from "../service";
const defaultData = {
  userInfo: {
    username: '',
    registerTime: 0,
    email: ''
  },
  friends: {
    friendList: [],
    friendReq: []
  },
  hasLogin: false
}

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {
      username: '',
      registerTime: 0,
      email: ''
    },
    friends: {
      friendList: [],
      friendReq: []
    },
    hasLogin: false
  },
  getters: {
    profileFormInfo: state => {
      const dateTime = new Date(state.userInfo.registerTime);
      const info = Object.assign({}, state.userInfo);
      Reflect.deleteProperty(info, 'registerTime')
      return Object.assign({
        dateString: `${dateTime.getFullYear()}-${dateTime.getMonth() + 1}-${dateTime.getDay()} ${dateTime.getHours().toString().padStart(2, '0')}:${dateTime.getMinutes().toString().padStart(2, '0')}`,
      }, info);
    }
  },
  mutations: {
    setLoginInfo (state, val) {
      state.hasLogin = true;
      state.userInfo = Object.assign({}, val.userInfo);
      state.friends =  Object.assign({
        friendList: [],
        friendReq: []
      }, val.friends)
    },
    setLogout (state) {
      state.hasLogin = false;
      state.userInfo = Object.assign({}, defaultData.userInfo);
      state.friends = Object.assign({}, defaultData.friends);
    }
  },
  actions: {
    async login({commit}, mes) {
      const res = await service.login(mes);
      if (res.data.status === 'fail') {
        this.loginBtnDisabled = false;
        throw new Error(res.data.message);
      }
      commit('setLoginInfo', res.data)
    },
    async fetchUserInfo ({commit}) {
      const res = await service.fetchUserInfo()
      if (res.data.status === 'success') {
        commit('setLoginInfo', res.data)
      }
    },
  }
})
