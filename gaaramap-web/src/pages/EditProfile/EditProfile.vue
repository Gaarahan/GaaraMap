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
        <el-form ref="form" :rules="profileFormRules" :model="profileForm" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="profileForm.username" :disabled="!showEditUsernameForm"></el-input>
          </el-form-item>
          <el-form-item :label="!showEditPasswordForm?'密码':'原密码'" prop="password">
            <el-input v-model="profileForm.password" type="password" :disabled="!showEditPasswordForm"></el-input>
          </el-form-item>
          <el-form-item label="新密码" v-if="showEditPasswordForm" prop="newPassword">
            <el-input v-model="profileForm.newPassword" type="password"></el-input>
          </el-form-item>
          <el-form-item label="注册时间">
            <el-input v-model="profileForm.dateString" disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="注册邮箱">
            <el-input v-model="profileForm.email" disabled="disabled"
                      type="email"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <!--取消修改用户名设定-->
            <el-button
                type="primary"
                size="small"
                @click="onEditUsername"
                v-if="false"
            >{{!this.showEditUsernameForm?'修改用户名':'确认修改'}}</el-button>
            <el-button
                type="primary"
                size="small"
                @click="onEditPassword"
                v-show="!showEditUsernameForm"
            >{{!this.showEditPasswordForm?'修改密码':'确认修改'}}</el-button>
            <el-button plain="plain" type="primary" size="small" @click="onEditCancel" v-show="showEditUsernameForm || showEditPasswordForm">取消修改</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {Toast} from "mint-ui";
  import service from '../../service';
  const defaultHeadPic = require('../../assets/defaultHeadPic.png');

  export default {
    name: "EditProfile",
    data() {
      return {
        showEditPasswordForm: false,
        showEditUsernameForm: false,
        usernameEditing: false,
        passwordEditing: false,
        profileForm: {
          username: '',
          email: '',
          password: '',
          newPassword: ''
        },
        profileFormRules: {
          username: [
            { required: true, message: '还没写名字呢', trigger: 'blur' },
            { pattern: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/, message: '只能使用数字、中文、字母和下划线', trigger: 'change' },
          ],
          password: [
            { required: true, message: '请输入原密码'},
          ],
          newPassword: [
            { required: true, message: '请输入新密码'},
          ],
          email: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' },
            { pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: '请输入正确的邮箱格式', trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      ...mapGetters(['profileFormInfo'])
    },
    mounted() {
      this.$refs.headPic.setAttribute('src', this.profileForm.headPic || defaultHeadPic);
      this.profileForm = Object.assign({
        password: 'password',
        newPassword: '',
      }, this.profileFormInfo)
    },
    methods: {
      onEditUsername () {
        this.usernameEditing = true;
        if (!this.showEditUsernameForm) {
          this.showEditUsernameForm = !this.showEditUsernameForm;
          return false;
        }
        this.editUsername()
      },
      onEditPassword () {
        if (!this.showEditPasswordForm) {
          this.profileForm.password = '';
          this.showEditPasswordForm = !this.showEditPasswordForm;
          return false;
        }
        this.editPassword()
      },
      onEditCancel () {
        this.showEditPasswordForm = false;
        this.showEditUsernameForm = false;
        this.profileForm = Object.assign({
          password: 'password',
          newPassword: '',
        }, this.profileFormInfo)
      },
      editUsername () {
        this.$refs['form'].validateField(['username'], (err) => {
          if(!err) {
            service.editUsername(this.$refs['form'].model)
                .then(res => {
                  if (res.data.status === 'fail') {
                    throw new Error(res.data.message);
                  } else {
                    Toast({
                      message: '修改用户名成功',
                      position: 'bottom',
                    });
                    setTimeout( () => {
                      this.$router.push({name: 'main'})
                    }, 500);
                  }
                  this.onEditCancel()
                })
                .catch((e) => {
                  Toast({
                    message: e.message || '修改密码失败',
                    position: 'bottom',
                  });
                })
          }
        })
      },
      editPassword() {
        let errMes = [];
        this.$refs['form'].validateField(['password', 'newPassword'], (err) => {
          errMes.push(err);
          if(errMes.length === 2 && !errMes[0] && !errMes[1]) {
            service.editPassword(this.$refs['form'].model)
                .then(res => {
                  if (res.data.status === 'fail') {
                    throw new Error(res.data.message);
                  } else {
                    Toast({
                      message: '修改密码成功',
                      position: 'bottom',
                    });
                    setTimeout( () => {
                      this.$router.push({name: 'main'})
                    }, 500);
                  }
                  this.onEditCancel()
                })
                .catch((e) => {
                  Toast({
                    message: e.message || '修改用户名失败',
                    position: 'bottom',
                  });
                })
          }
        })
      }
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
