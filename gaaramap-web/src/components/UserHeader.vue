<template>
  <div>
    <div class="header">
      <img
          alt="head-pic"
          ref="headPic"
          class="head-pic"
          src="../assets/defaultHeadPic.png">
      <router-link
          v-if="!hasLogin"
          :to="{name: 'login'}"
          id="to-account"
      >登录/注册</router-link>
      <p v-else class="user-name">{{username}}</p>
    </div>
  </div>
</template>

<script>
  const defaultHeadPic = require('../assets/defaultHeadPic.png');
  export default {
    name: "UserHeader",
    props: ['hasLogin', "username", "headPic"],
    watch: {
      headPic (val) {
        this.setHeadPic(val)
      }
    },
    methods: {
      setHeadPic (val) {
        this.$refs.headPic.setAttribute('src', val || defaultHeadPic)
      }
    },
    mounted() {
      this.setHeadPic(this.headPic || defaultHeadPic)
    }
  }
</script>

<style lang="less" scoped>
  .header{
    height: 40vh;
    background-image: url("../assets/background-pic.jpg");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    #to-account {
      text-decoration: none;
      color: white;
    }
    .head-pic{
      height: 10vh;
      border:1px solid gainsboro;
      border-radius: 50%;
      background-color: white;
    }
    .user-name{
      font-size: 20px;
      margin-top: 1vh;
      text-shadow: -1px -1px 0px white;
      background-color: #f0f8ff4d;
      border-radius: 5px;
    }
  }
</style>
