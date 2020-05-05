<template>
  <div class="container">
    <mt-header title="关于应用" class="header">
      <router-link :to="{name: 'main', props: {selected: 'tab-mine'}}" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="body">
      <el-card class="about">
        <img src="../../assets/gaaramap-logo.png" alt="logo">
        <span class="app-name">GaaraMap</span>
        <div class="about-mes">
          <div class="mes-row">
            <span class="title">Author: </span>
            <span class="mes">Gaarahan</span>
          </div>
          <div class="mes-row">
            <span class="title">Contact: </span>
            <span class="mes">gaarahan@foxmail.com</span>
          </div>

          <div class="mes-row intro">
            <span class="title">Intro: </span>
            <p class="mes">GaaraMap is an online map tools that can help people who are traveling to find out where himself/herself is. </p>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: "About"
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

      .about {
        height: 100%;

        /deep/ .el-card__body {
          margin-top: 20%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .app-name {
          font-weight: 700;
          margin-top: 5px;
        }
        .about-mes {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          margin-top: 10%;

          .mes-row {
            margin: 10px 0;
            .title {
              font-weight: 700;
              display: inline-block;
              min-width: 6em;
            }
          }
          .mes-row.intro {
            .title {
              display: block;
              line-height: 25px;
            }
            .mes {
              text-indent: 2em;
            }
          }
        }
      }
    }
  }
</style>
