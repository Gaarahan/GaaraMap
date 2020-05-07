<template>
  <div class="contacts">
    <mt-cell title="搜索" icon="more">
      <img slot="icon" src="../../../assets/search.png"
           width="200" height="200"
           class="head-img"
           alt="add-head-img"
      >
      <div class="search" v-if="showSearch">
        <el-input
            v-model="search" ref="search"
            placeholder="搜索好友" size="small"
            @blur="cancelSearch"
        ></el-input>
      </div>
      <mt-button size="small" @click="toggleSearch"
                 type="primary" plain="plain"
                 icon="back"
                 v-show="!showSearch"
      >搜索好友</mt-button>
    </mt-cell>
    <mt-cell
        title="添加新朋友"
        :is-link="hasLogin"
        :to="{name: 'addFriends'}"
        :class="{disabled: !hasLogin}"
        icon="more">
      <img slot="icon" src="../../../assets/add-friends.png"
           width="200" height="200"
           class="head-img"
           alt="add-head-img"
      >
      <router-link v-if="!hasLogin" :to="{name: 'login'}">请登录</router-link>
    </mt-cell>
    <mt-cell v-for="(itm, i) in filteredFriends" :title="itm" icon="more" :key="i">
      <img slot="icon" src="../../../assets/defaultHeadPic.png"
           width="200" height="200"
           class="head-img"
           alt="friend-head-img"
      >
    </mt-cell>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "ShowFriends",
    computed: {
      ...mapState([
        'friends',
        "hasLogin"
      ]),
      filteredFriends () {
        return this.friends.friendList.filter(val => !this.search || val.includes(this.search))
      }
    },
    data () {
      return {
        showSearch: false,
        search: ''
      }
    },
    methods: {
      toggleSearch () {
        this.showSearch = !this.showSearch
        if (this.showSearch) {
          this.$nextTick(() => {
            this.$refs['search'].focus()
          })
        }
      },
      cancelSearch () {
        this.search = ''
        this.toggleSearch()
      }
    }
  }
</script>

<style scoped lang="less">
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
</style>
