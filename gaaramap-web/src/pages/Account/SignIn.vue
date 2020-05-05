<template>
  <div id="signin">
    <el-form
        ref="signinForm"
        :model="formData"
        :rules="rules"
        :hide-required-asterisk="true"
    >
      <el-form-item label="用户名:" prop="username">
        <el-input
            v-model="formData.username"
            size="small"
            class="username-input"
            ref="usernameInput"
            placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input
            v-model="formData.password"
            size="small"
            class="password-input"
            placeholder="请输入密码"
            type="password"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码:" prop="secPassword">
        <el-input
            v-model="formData.secPassword"
            size="small"
            class="sec-password-input"
            placeholder="请确认密码"
            type="password"
        ></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱:" prop="email">
        <el-input
            v-model="formData.email"
            size="small"
            class="sec-password-input"
            placeholder="输入你的常用email"
            type="email"
        ></el-input>
      </el-form-item>
    </el-form>
    <mt-button id='submit-btn' ref="submit-btn" :disabled="signInBtnDisabled" @click.native="onSubmit" size="large">立即注册</mt-button>
  </div>
</template>

<script>
  import {Toast} from "mint-ui";
  import service from '../../service'

  export default {
    name: "SignIn",
    data() {
      return {
        formData:{
          username: '',
          password: '',
          secPassword: '',
          email: '',
        },
        rules: {
          username: [
            { required: true, message: '还没写名字呢', trigger: 'blur' },
            { pattern: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/, message: '只能使用数字、中文、字母和下划线哦', trigger: 'change' },
            { pattern: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/, message: '只能使用数字、中文、字母和下划线哦', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '没有密码可不行', trigger: 'blur' },
          ],
          secPassword: [
            {
              validator: (rule, val, callback) => {
                if(val === ''){
                  callback(new Error('再确认一下密码吧'));
                }
                else if(val !== this.formData.password) {
                  callback(new Error('怎么和上次说的不一样？'));
                }
                else {
                  callback();
                }
              },
              trigger: 'blur'
            }
          ],
          email: [
            { required: true, message: '邮箱呢?', trigger: 'blur' },
            { pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: '这个邮箱格式好像不对呀', trigger: 'blur' }
          ]
        },
        signInBtnDisabled: false
      }
    },
    methods: {
      onSubmit() {
        this.$refs['signinForm'].validate( res => {
          if(!res) return false;

          this.signInBtnDisabled = true;
          this.signIn(this.$refs['signinForm'].model)
          .then(
              loginMes => {
                if (loginMes.data.status === 'fail') {
                  this.signInBtnDisabled = false;
                  throw new Error(loginMes.data.message);
                } else {
                  Toast({
                    message: '注册成功,请登录',
                    position: 'bottom',
                  });
                  setTimeout( () => {
                    this.$router.push({name: 'login'})
                  }, 500);
                }
              }
          )
          .catch(e => {
            Toast({
              message: e.message || '注册失败，请重试',
              position: 'bottom',
            });
            this.signInBtnDisabled = false;
          })
        });
      },
      signIn(info) {
        const mes = Object.assign({}, info);
        Reflect.deleteProperty(mes, "secPassword");
        return service.signIn(mes)
      }
    },
  }
</script>

<style lang="less" scoped>
  #signin {
    padding: 20px;

    /deep/ .el-form-item__label{
      height: 1em;
      line-height: 1em;
      margin-top: 5px;
    }

    #submit-btn {
      font-size: 16px;
      height: 30px;
      border-radius: 0;
      background-color: #00875f;
      color: white;
    }
  }
</style>
