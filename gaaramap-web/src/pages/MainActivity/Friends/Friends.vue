<template>
  <div class="friends-container">
    <mt-header title="朋友" class="header"></mt-header>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "Friends"
  }
</script>

<style scoped lang="less">
  .friends-container{
    display: flex;
    flex-direction: column;
  }
</style>
