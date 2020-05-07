<template>
  <div id="main-activity">
    <mt-tab-container :swipeable="false" v-model="selected" class="content">
      <mt-tab-container-item id="tab-main">
        <Main></Main>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-friends">
        <Friends></Friends>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-mine">
        <Mine></Mine>
      </mt-tab-container-item>
    </mt-tab-container>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="tab-main">
        首页
      </mt-tab-item>
      <mt-tab-item id="tab-friends">
        朋友
      </mt-tab-item>
      <mt-tab-item id="tab-mine">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
  import Friends from "./Friends/Friends";
  import Main from "./Main";
  import Mine from "./Mine";

  export default {
    name: 'MainActivity',
    data() {
      return {
        selected: "tab-main",
      }
    },
    components: {
      Friends,
      Main,
      Mine
    }
  }
</script>

<style lang="less" scoped>
  #main-activity{
    display: flex;
    flex-direction: column;
    height: 100%;

    .content{
      height: calc(100% - 6vh);
    }
    /deep/ div.mint-tabbar{
      height: 6vh;
      display: flex;
      align-items: center;
      position: fixed;
      bottom: 0;
      box-shadow: 0 0 2px 0 #a79b9b;
    }

    /deep/ .mint-tab-container-item,
    /deep/ .mint-tab-container-wrap{
      height: 100%;
    }
  }
</style>
