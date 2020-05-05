<template>
  <div class="friends-container">
    <header class="friends-header">
      朋友
      <span class="search">搜索</span>
    </header>
    <div class="contacts">
      <mt-cell
          title="添加新朋友"
          :is-link="hasLogin"
          :class="{disabled: !hasLogin}"
          icon="more">
        <img slot="icon" src="../../assets/add-friends.png"
             width="200" height="200"
             class="head-img"
             alt="add-head-img"
        >
        <router-link v-if="!hasLogin" :to="{name: 'login'}">请登录</router-link>
      </mt-cell>
      <mt-cell v-for="(itm, i) in friends" :title="itm" icon="more" :key="i">
        <img slot="icon" src="../../assets/defaultHeadPic.png"
             width="200" height="200"
             class="head-img"
             alt="friend-head-img"
        >
      </mt-cell>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "Friends",
    computed: {
      ...mapState([
          'friends',
          "hasLogin"
      ])
    }
  }
</script>

<style scoped lang="less">
  .friends-container{
    display: flex;
    flex-direction: column;

    .friends-header{
      text-align: center;
      height: 6vh;
      line-height: 6vh;
      box-shadow: 0 1px 2px 0 grey;
      margin-bottom: 3px;

      .search {
        position: fixed;
        right: 0;
        margin: 0 4vw;
      }
    }
    .contacts{
      height: calc(100vh - 6vh - 6vh);
      width: 100vw;
      overflow: auto;

      /deep/ .disabled .mint-cell-text {
        color: gray;
      }
      .head-img {
        width: 20px;
        height: 20px;
      }
    }
  }
</style>
