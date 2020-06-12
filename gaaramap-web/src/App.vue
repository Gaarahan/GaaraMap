<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex'
  import { SOCKET_EVENTS } from "./constants";

  export default {
    name: 'App',
    computed: {
      ...mapState([
        "hasLogin",
        "socket"
      ])
    },
    watch: {
      hasLogin (val) {
        if (val) {
          this.createSocket()
          this.bindSocketService()
        } else {
          this.destroySocket()
        }
      }
    },
    methods: {
      ...mapMutations({
        setFriendsOnlineStatus: 'setFriendsOnlineStatus'
      }),
      ...mapActions({
        createSocket: 'createSocket' ,
        destroySocket: 'destroySocket',
      }),
      bindSocketService () {
        console.log(this.socket);
        this.socket.on(SOCKET_EVENTS.friendConnect, (name, status) => {
          this.setFriendsOnlineStatus(name, status)
        })
      },
    }
  }
</script>

<style scoped>
  #app {
    height: 100%;
    width: 100%;
  }
</style>
