<template>
  <el-container>
    <el-header class="header">
      <el-form inline="inline">
        <el-form-item class="search">
          <el-input
              v-model="addFriendForm.name"
              placeholder="输入名字添加好友"
              size="small"
          ></el-input>
          <el-button
              type="primary"
              round="round"
              size="mini"
              @click="onSubmit"
          >添加</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <div class="req-head">
        好友请求
      </div>
        <div class="friendsReq">
          <mt-cell title="还没有好友请求" icon="more" v-if="!friends.friendReq.length"></mt-cell>
          <mt-cell v-for="(itm, i) in friends.friendReq" :title="itm.status === 'WAITING_FOR_APPROVE'?`等待${itm.name}同意`:`${itm.name}请求加你为好友`" :key="i">
            <img slot="icon" src="../../../assets/defaultHeadPic.png"
                 width="20" height="20"
                 class="head-img"
                 alt="friend-head-img"
            >
            <span v-if="itm.status === 'APPROVED'">已添加</span>
            <span v-else-if="itm.status === 'REJECTED'">已拒绝</span>
            <div  v-else-if="itm.status === 'PENDING'" class="op-btn" >
              <el-button
                  type="primary"
                  size="mini"
                  @click="handleReq(itm.name, 'APPROVE')"
              >同意</el-button>
              <el-button
                  type="danger"
                  size="mini"
                  @click="handleReq(itm.name, 'REJECT')"
              >拒绝</el-button>
            </div>
          </mt-cell>
        </div>
    </el-main>
    <el-footer>
      <el-button size="large" @click="backToFriendList">返回好友列表</el-button>
    </el-footer>
  </el-container>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import service from '../../../service'
  import { Toast } from 'mint-ui'
  export default {
    name: "AddFriends",
    data () {
      return {
        addFriendForm: {
          name: '',
        },
      }
    },
    computed: {
      ...mapState(["friends"])
    },
    methods: {
      ...mapActions(["fetchUserInfo"]),
      handleReq (name, flag) {
        const promise = flag === 'APPROVE'? service.approveFriend(name): service.rejectFriend(name)
        promise
            .then(res => {
              if (res.data.status === 'fail') {
                throw new Error(res.data.message);
              } else {
                Toast({
                  message: '已同意',
                  position: 'bottom',
                });
                this.fetchUserInfo()
              }
            })
            .catch((e) => {
              Toast({
                message: e.message || '添加好友失败',
                position: 'bottom',
              });
            })
      },
      onSubmit () {
        if (this.addFriendForm.name.trim() !== '') {
          service.addFriend(this.addFriendForm)
              .then(res => {
                if (res.data.status === 'fail') {
                  throw new Error(res.data.message);
                } else {
                  Toast({
                    message: '发送好友请求成功,等待对方同意',
                    position: 'bottom',
                  });
                  this.fetchUserInfo()
                }
              })
              .catch((e) => {
                Toast({
                  message: e.message || '添加好友失败',
                  position: 'bottom',
                });
              })
        }
      },
      backToFriendList () {
        this.$router.push({name: 'main'})
      }
    }
  }
</script>

<style scoped lang="less">
  .header {
    margin-top: 2vh;
  }
  .req-head {
    color: gray;
    margin-bottom: 3px;
  }
  .search {
    width: 100%;
    margin-right: 0;

    /deep/ .el-form-item__content{
      display: flex;
      justify-content: space-between;
    }
  }
</style>
