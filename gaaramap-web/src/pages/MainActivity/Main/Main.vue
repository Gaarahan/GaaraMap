<template>
  <div class="Main">
    <div id="map"> </div>
    <el-drawer
        class="drawer"
        size="70%"
        :visible.sync="drawer"
        :direction="direction"
    >
      <div class="title" slot="title">
        <el-input
            v-if="drawerName === 'sightseeing'"
            v-model="search" ref="search"
            placeholder="搜索景点" size="small"
            @blur="cancelSearch"
        ></el-input>
        <div class="pathTitle" v-else>
          <span>{{`当前位置 -> ${pathEnd}`}}</span>
          <el-button
              type="primary"
              plain="plain" @click="backToSearch"
              size="mini" round="round">景点列表</el-button>
        </div>
      </div>

      <el-collapse v-model="activeName" accordion v-if="drawerName === 'sightseeing'">
        <el-collapse-item
            v-for="(itm, i) in filteredAttractions" :title="itm.name"
            :name="i" :key="i"
        >
          <div class="op-contain">
            <el-button
                @click="() => {showPosition(itm)}"
                plain icon="el-icon-warning-outline">查看</el-button>
            <el-button
                @click="() => {showPath(itm)}"
                plain icon="el-icon-guide">路线</el-button>
          </div>
        </el-collapse-item>
      </el-collapse>
      <div id="panel" v-else></div>
    </el-drawer>
    <div class="menu" ref="attractionIntro">
      <span class="up-btn"></span>
      <div class="micro-intro">
        <img src="../../../assets/gaaramap-logo.png" alt="logo" class="logo">
        <p class="intro"> {{curAttractionIntro.name}}</p>
        <el-button type="primary" plain="plain" class="find-btn" size="small" @click="drawer=true">{{drawerName === 'sightseeing'?"找景点":"看路线"}}</el-button>
      </div>
      <p class="complete-intro">{{curAttractionIntro.description}}</p>
    </div>
  </div>
</template>

<script>
  import MapMixin from './MapMixin'
  import UIMixin from './UIMixin'
  import attractions from "../../../data/attractions";

  export default {
    name: "Main",
    mixins: [MapMixin, UIMixin],
    data () {
      return {
        drawer: false,
        drawerName: 'sightseeing',
        direction: 'ltr',
        activeName: "0",
        search: '',
        pathEnd: '',
        attractions
      }
    },
    computed: {
      filteredAttractions () {
        return this.attractions.filter(val =>
            !this.search || val.name.includes(this.search)
        )
      }
    },
    methods: {
      cancelSearch () {
        this.search = ''
      },
      backToSearch () {
        this.driving.clear()
        this.drawerName = 'sightseeing'
      }
    }
  }
</script>

<style lang="less" scoped>
  .Main{
    height: 100%;
    display: flex;
    flex-direction: column;

    /deep/ .amap-call {
      display: none;
    }

    #map {
      flex-grow: 1;
    }
    .drawer {
      z-index: 10000!important;
      /deep/ .el-drawer {
        outline: none;
      }
      /deep/ .el-drawer__header {
        padding: 10px;
        margin: 0;
      }
      /deep/ .el-collapse-item__content{
        padding-bottom: 10px;
      }
      #panel /deep/ .planTitle {
        display: none;
      }
      .pathTitle {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        align-items: center;
      }
      .op-contain {
        display: flex;
        justify-content: space-around;
      }
    }
    .menu {
      border-radius: 10px 10px 0 0;
      box-shadow: 0 -1px 2px 0 #a29a9a;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 5px 0;

      .up-btn {
        display: inline-block;
        width: 40px;
        height: 5px;
        border-radius: 3px;
        background-color: #ccc7c7;
      }

      .micro-intro {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        .logo {
          margin: 0 5px 0 10px;
        }
        .intro {
          color: #a29a9a;
        }
        .find-btn {
          margin: 0 10px 0 5px;
        }
      }
      .complete-intro {
        height: 0;
        overflow: auto;
        padding: 0 5px;
        text-indent: 2em;
        position: relative;
        font-size: 16px;
        transform: translate3d(0,0,0);
      }
    }
  }
</style>
