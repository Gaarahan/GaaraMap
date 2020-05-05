import Vuex from 'vuex';
import Vue from "vue";
import service from "../service";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {
      username: '',
      registerTime: 0,
      email: ''
    },
    friends: [],
    hasLogin: false
  },
  getters: {
    profileForm: state => {
      const dateTime = new Date(state.userInfo.registerTime);
      return Object.assign({
        dateString: `${dateTime.getFullYear()}-${dateTime.getMonth() + 1}-${dateTime.getDay()} ${dateTime.getHours().toString().padStart(2, '0')}:${dateTime.getMinutes().toString().padStart(2, '0')}`,
      }, state.userInfo)
    }
  },
  mutations: {
    setLoginInfo (state, val) {
      state.hasLogin = true;
      state.userInfo = Object.assign({}, val.userInfo);
      state.friends = Object.assign({}, val.friends);
    },
    setLogout (state) {
      state.hasLogin = false;
      state.userInfo = {
        username: '',
        registerTime: 0,
        email: ''
      };
      state.friends = [];
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

    }
  }
})
