import Hammer from "hammerjs";
import anime from "animejs";

export default {
  mounted() {
    this.addSwipe();
  },
  methods: {
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
  }
}
