<template>
  <div class="container">
    <mt-header title="个人信息" class="header">
      <router-link :to="{name: 'main', props: {selected: 'tab-mine'}}" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="body">
      <el-card class="edit">
        <img alt="headPic" class="head-pic" ref="headPic" src="">
        <el-form ref="form" :model="profileForm" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="profileForm.username" disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="注册时间">
            <el-input v-model="profileForm.dateString" disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="注册邮箱">
            <el-input v-model="profileForm.email" disabled="disabled"
                      type="email"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  const defaultHeadPic = require('../../assets/defaultHeadPic.png');

  export default {
    name: "EditProfile",
    computed: {
      ...mapGetters(['profileForm'])
    },
    mounted() {
      this.$refs.headPic.setAttribute('src', this.profileForm.headPic || defaultHeadPic)
    }
  }
</script>

<style scoped lang="less">

  .container {
    display: flex;
    flex-direction: column;
    height: 100%;

    .body {
      flex-grow: 1;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;

      .edit {
        width: 100%;
        padding: 20px 0;
        /deep/ .el-card__body {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .head-pic{
          height: 10vh;
          border:1px solid gainsboro;
          border-radius: 50%;
          background-color: white;
          margin-bottom: 30px;
        }
      }
    }
  }
</style>
