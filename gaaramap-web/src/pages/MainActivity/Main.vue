<template>
  <div class="Main">
    <div id="map"> </div>
    <div class="menu" ref="attractionIntro">
      <span class="up-btn"></span>
      <div class="micro-intro">
        <img src="../../assets/gaaramap-logo.png" alt="logo" class="logo">
        <p class="intro"> {{curAttractionIntro.name}}</p>
      </div>
      <p class="complete-intro">{{curAttractionIntro.description}}</p>
    </div>
  </div>
</template>

<script>
  import {Toast} from "mint-ui";
  import Hammer from 'hammerjs';
  import anime from 'animejs';
  import AMap from 'AMap';
  import {
    getCurAttractionMessage,
    refreshCurrentAttractionSquare
  } from "../../components/mapTools";

  export default {
    name: "Main",
    data() {
      return {
        map: null,
        curAttractionIntro: {
          id: 'GMAP_0',
          name: '当前位置无景点信息',
          description: ''
        },
        geolocation: null,
        curAttrSquareId: undefined,
        watching: false
      }
    },
    mounted() {
      this.initMap();
      this.addSwipe();
    },
    methods: {
      initMap() {
        if (!AMap) {
          Toast({
            message: 'Can not get AMap, checkout your network',
            position: 'bottom',
            duration: 5000
          });
          return ;
        }
        this.map = new AMap.Map('map',{
          center: [116.397428, 39.90923],
          zoom : 10
        });
        // 添加控制插件 [工具条，定位]
        AMap.plugin(['AMap.Geolocation','AMap.ToolBar'],() => {
          const toolbar = new AMap.ToolBar();
          this.map.addControl(toolbar);
          this.geolocation = new AMap.Geolocation({
            zoomToAccuracy:true
          });
          this.map.addControl(this.geolocation);
          this.geolocation.getCurrentPosition((...argus) => {
            this.onInitGeolocationComplete(...argus);
            if (!this.watching) {
              this.geolocation.watchPosition(this.onInitGeolocationComplete);
              this.watching = true;
            }
          });

          AMap.event.addListener(this.geolocation, 'complete', geo => {
            if (geo.info === 'SUCCESS') {
              this.changeAttractionMessage(getCurAttractionMessage(geo));
            }
          });
        });
      },
      addSwipe() {
        const menu = this.$refs['attractionIntro'];
        const completeIntro = document.querySelector('.complete-intro');
        const mc = new Hammer(menu);
        const maxIntroHeight = document.querySelector('#map').clientHeight;
        const minTriggerHeight = document.body.clientHeight * 0.2;
        let introBaseHeight = 0;
        let hasIntroExtend = false;

        const swipeUp = () => {
          anime({
            targets: '.complete-intro',
            easing: 'linear',
            height: `${maxIntroHeight}px`,
            padding: '5px',
            duration: 500
          });

          hasIntroExtend = true;
          introBaseHeight = maxIntroHeight;
        };
        const swipeDown = () => {
          anime({
            targets: '.complete-intro',
            easing: 'linear',
            height: '0px',
            padding: '0 5px',
            duration: 500
          });
          introBaseHeight = 0;
          hasIntroExtend = false;
        };

        mc.get('swipe').set({
          direction: Hammer.DIRECTION_VERTICAL
        });
        mc.get('pan').set({
          direction: Hammer.DIRECTION_VERTICAL,
        });
        mc.on('swipeup', swipeUp);
        mc.on('swipedown',swipeDown);

        mc.on('pan', (e) => {
          if(e.isFinal){
            if (e.deltaY < 0 && !hasIntroExtend) {
              if (Math.abs(e.deltaY) > minTriggerHeight) {
                swipeUp();
              }else {
                swipeDown();
              }
            }
            else if(e.deltaY > 0 && hasIntroExtend){
              if (Math.abs(e.deltaY) > minTriggerHeight) {
                swipeDown()
              }else {
                swipeUp()
              }
            }
          }
          else {
            completeIntro.style['height'] =  `${introBaseHeight - e.deltaY}px`;
          }
        })
      },
      onInitGeolocationComplete (status, geo) {
        if (status !== 'complete') this.onGeolocationError(geo);
        else {
          this.changeAttractionMessage(getCurAttractionMessage(geo));
        }
      },
      onGeolocationError(error) {
        switch (error.code) {
          case 1 : {
            Toast({
              message: '您拒绝了获取位置的请求，应用无法正常运行',
              position: 'bottom',
              duration: 5000
            });
            break;
          }
          case 3 : {
            Toast({
              message: '获取位置超时，请检查权限',
              position: 'bottom',
              duration: 5000
            });
            break;
          }
          default : {
            Toast({
              message: '获取位置失败，请检查您的设备',
              position: 'bottom',
              duration: 5000
            });
          }
        }
      },
      changeAttractionMessage(attrMessage) {
        if (attrMessage.id === 'GMAP_0') {
          this.map.remove(this.curAttrSquareId);
        }
        else if (attrMessage.id !== this.curAttrSquareId) {
          this.curAttrSquareId = refreshCurrentAttractionSquare(this.map, attrMessage);
        }

        this.setAttractionMessage(attrMessage)
      },
      setAttractionMessage(attractionMessage) {
        this.curAttractionIntro =  Object.assign({}, attractionMessage);
      },
    }
  }
</script>

<style lang="less" scoped>
  .Main{
    height: 100%;
    display: flex;
    flex-direction: column;

    #map {
      flex-grow: 1;
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
        width: 100%;
        .logo {
          margin: 0 5px 0 10px;
        }
        .intro {
          color: #a29a9a;
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
