import AMap from 'AMap';
import {Toast} from "mint-ui";
import {
  getCurAttractionMessage,
  refreshCurrentAttractionSquare
} from "../../../components/mapTools";

export default  {
  data() {
    return {
      map: null,
      curAttractionIntro: {
        id: 'GMAP_0',
        name: '当前位置无景点信息',
        description: ''
      },
      geolocation: null,
      driving: null,
      curAttrSquareId: undefined,
      watchingAttractions: false,
      watching: false,
      curPosition: null,
    }
  },
  mounted() {
    this.initMap()
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
      AMap.plugin(['AMap.Geolocation','AMap.ToolBar', 'AMap.Driving'],() => {
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
            this.changeAttractionMessage(geo);
          }
        });

        //构造路线导航类
        this.driving = new AMap.Driving({
          map: this.map,
          panel: 'panel'
        });
      });
    },
    onInitGeolocationComplete (status, geo) {
      if (status !== 'complete') this.onGeolocationError(geo);
      else {
        this.curPosition = geo.position
        this.changeAttractionMessage(geo);
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
    changeAttractionMessage(geo) {
      const attrMessage = getCurAttractionMessage(geo)

      if ( this.curAttrSquareId) {
        this.map.remove(this.curAttrSquareId);
      }

      if (attrMessage.id !== 'GMAP_0' && attrMessage.id !== this.curAttrSquareId) {
        this.curAttrSquareId = attrMessage.id;
        this.polygonId = refreshCurrentAttractionSquare(this.map, attrMessage);
      }

      this.setAttractionMessage(attrMessage)
    },
    setAttractionMessage(attractionMessage) {
      this.curAttractionIntro =  Object.assign({}, attractionMessage);
    },
    showPosition (msg) {
      this.drawer = false
      // 禁用当前位置监听
      this.watchingAttractions = true
      setTimeout(() => {
        this.watchingAttractions = false
      }, 20000)
      if (this.curAttrSquareId) {
        this.map.remove(this.curAttrSquareId);
      }
      this.curAttrSquareId = refreshCurrentAttractionSquare(this.map, msg)

      this.setAttractionMessage(Object.assign({}, msg, {
        name: `查看： ${msg.name}`
      }))
    },
    showPath(msg) {
      if (this.curAttrSquareId === msg.id) {
        return false
      }
      const searchPath = () => {
        this.drawerName = 'path'
        const pathStart = this.curPosition
        this.pathEnd = msg.name
        this.driving.search(pathStart, new AMap.LngLat(...msg.edge[0]), function(status) {
          if (status !== 'complete') {
            Toast({
              message: '导航失败',
              position: 'bottom',
              duration: 5000
            })
          }
        });
      }

      this.drawer = false
      Toast({
        message: '正在为您规划行车路线，请稍等',
        position: 'bottom',
        duration: 5000
      })
      if (!this.curPosition) {
        this.geolocation.getCurrentPosition(status => {
          if (status === 'complete') {
            searchPath()
          }
          else {
            Toast({
              message: '获取当前位置失败,当前GPS信号弱',
              position: 'bottom',
              duration: 5000
            })
          }
        })
      }
      else {
        searchPath()
      }
    }
  }
}