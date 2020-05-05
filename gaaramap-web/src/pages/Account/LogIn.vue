<template>
  <div>
    <img
        src="../../assets/login-background.jpg"
        alt="login-background"
        class="login-background"
    >
    <div class="form-container">
      <div id="login">
        <el-form
            ref="loginForm"
            label-position="left"
            label-width="60px"
            :model="formData"
            :rules="rules"
            :hide-required-asterisk="true"
        >
          <el-form-item label="名字:" prop="username">
            <el-input
                v-model="formData.username"
                size="small"
                class="username-input"
                ref="usernameInput"
                placeholder="请输入用户名"
                @focus="() => {changeLoginImg('drawn')}"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input
                v-model="formData.password"
                size="small"
                class="password-input"
                placeholder="请输入密码"
                type="password"
                @focus="() => {changeLoginImg('muffle')}"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="cartoon">
          <img ref="login-img" src="../../assets/drawn.jpg" alt="login-img">
        </div>
      </div>
      <mt-button id='submit-btn' ref="submit-btn"
                 @click.native="onSubmit" size="large"
                 :disabled="loginBtnDisabled"
      >登录</mt-button>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  const drawn = require('../../assets/drawn.jpg');
  const muffle = require('../../assets/muffle-eyes.jpg');
  import { mapActions } from 'vuex'

  export default {
    name: "LogIn",
    data() {
      return {
        formData: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '还没写名字呢', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '没有密码不让进', trigger: 'blur' },
          ],
        },
        loginBtnDisabled: false
      }
    },
    mounted() {
    },
    computed: {
      hasFormFinished() {
        return false
      }
    },
    methods: {
      ...mapActions(['login']),
      changeLoginImg(signal) {
        const img = signal === 'drawn'?drawn:muffle;
        this.$refs['login-img'].setAttribute('src', img);
      },
      onSubmit() {
        this.$refs.loginForm.validate(res => {
          if(!res) return false;

          this.loginBtnDisabled = true;
          this.login(this.$refs['loginForm'].model)
              .then(() => {
                Toast({
                  message: '登录成功',
                  position: 'bottom',
                });
                setTimeout( () => {
                  this.$router.push({
                    name: 'main',
                    props: {
                      selected: 'tab-mine',
                    }
                  });
                }, 500);
              })
              .catch(e => {
                Toast({
                  message: e.message || '登录失败，请重试',
                  position: 'bottom'
                });
                this.loginBtnDisabled = false;
              });
        });
      }
    },
  }
</script>

<style lang="less" scoped>
  .login-background{
    width: 100%;
    filter: opacity(0.8);
    position: relative;
  }
  .form-container {
    padding: 0 10px;

    #login {
      display: flex;
      padding-left: 5px;
      justify-content: space-between;

      .cartoon img {
        height: 110px;
      }
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
