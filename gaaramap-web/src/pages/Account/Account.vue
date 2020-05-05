<template>
  <div id="account">
    <mt-header :title="title" class="header">
      <router-link :to="{name: 'main'}" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <router-link :to="nextRouter" slot="right">
        <mt-button>{{routerText}}</mt-button>
      </router-link>
    </mt-header>
    <router-view ref="routerView"></router-view>
  </div>
</template>

<script>
  export default {
    name: "LogIn",
    data() {
      return {
        title: '',
        routerText: '',
        nextRouter: {
          name: ''
        }
      }
    },
    beforeMount() {
      this.changeRouterPrompt(this.$route.name)
    },
    methods: {
      changeRouterPrompt(routerName) {
        if(routerName === 'login'){
          this.title = '登录Gmap';
          this.routerText = '前往注册';
          this.nextRouter = {
            name: 'signin'
          }
        }else {
          this.title = '注册Gmap';
          this.routerText = '前往登录';
          this.nextRouter = {
            name: 'login'
          }
        }
      }
    },
    watch: {
      '$route': function(to) {
        this.changeRouterPrompt(to.name)
      }
    }
  }
</script>

<style scoped>
</style>
