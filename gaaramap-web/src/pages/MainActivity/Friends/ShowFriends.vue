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
        v-if="hasLogin"
        :is-link="true"
        :to="{name: 'addFriends'}"
        icon="more">
      <img slot="icon" src="../../../assets/add-friends.png"
           width="200" height="200"
           class="head-img"
           alt="add-head-img"
      >
    </mt-cell>
    <mt-cell
        title="请登录"
        v-if="!hasLogin"
        :is-link="true"
        :to="{name: 'login'}"
        icon="more">
      <img slot="icon" src="../../../assets/add-friends.png"
           width="200" height="200"
           class="head-img"
           alt="add-head-img"
      >
    </mt-cell>
    <mt-cell v-for="(itm, i) in filteredFriends"
             :title="itm.name" icon="more" :key="i"
    >
      <img slot="icon" src="../../../assets/defaultHeadPic.png"
           width="200" height="200"
           class="head-img"
           alt="friend-head-img"
      >
      <span class="status" v-if="itm.status === ONLINE_STATUS.online">
        <span class="online-circle" ></span>
        <span class="online-text">在线   </span>
        <el-button size="mini" plain="plain" type="primary" class="text" @click="showFriendPath(itm.name)"> 查看位置 </el-button>
      </span>
    </mt-cell>
  </div>
</template>

<script>
  import { ONLINE_STATUS } from "../../../constants";
  import { mapState } from 'vuex'
  export default {
    name: "ShowFriends",
    computed: {
      ...mapState([
        'friends',
        "hasLogin"
      ]),
      filteredFriends () {
        return this.friends.friendList.filter(val =>
            !this.search || val.name.includes(this.search)
        )
      }
    },
    data () {
      return {
        showSearch: false,
        search: '',
        ONLINE_STATUS
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
      },
      showFriendPath (name) {
        this.$store.state.mainPage.showPathTo({
          name: name
        })
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
    .online-circle {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #00f05f;
    }
  }
  .status .text {
    font-size: small;
  }
</style>
