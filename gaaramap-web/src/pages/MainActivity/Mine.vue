<template>
  <div class="mine">
    <user-header
        :hasLogin="hasLogin"
        :username="userInfo.username"
        :headPic="userInfo.headPic"
    ></user-header>
    <div class="func">
      <mt-cell v-show="hasLogin" :is-link="true" title="个人信息" :to="{name: 'edit'}"></mt-cell>
<!--      <mt-cell :is-link="true" title="设置中心" :to="{name: 'setting'}"></mt-cell>-->
      <mt-cell :is-link="true" title="关于应用" :to="{name: 'about'}"></mt-cell>
      <mt-cell v-show="hasLogin">
        <mt-button size="large" @click="logout">退出登录</mt-button>
      </mt-cell>
    </div>
  </div>
</template>

<script>
  import UserHeader from '../../components/UserHeader.vue';
  import service from "../../service";
  import { mapState, mapActions } from 'vuex'

  export default {
    name: "Mine",
    components: {
      UserHeader
    },
    computed: {
      ...mapState([
        "hasLogin",
        "userInfo"
      ])
    },
    created () {
      this.fetchUserInfo()
    },
    methods: {
      ...mapActions(["fetchUserInfo"]),
      logout () {
        service.logout()
        .then( res => {
          if (res.data.status === 'success') {
            this.$store.commit('setLogout')
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
.mine {
  display: flex;
  flex-direction: column;
  height: 100%;
  .func {
    flex-grow: 1;
  }
}
  /deep/ .mint-cell:last-child {
    .mint-cell-title{
      flex: 0;
    }
    .mint-cell-value {
      flex-grow: 1;
      .mint-button {
        border: none;
        box-shadow: none;
      }
    }
  }
</style>
