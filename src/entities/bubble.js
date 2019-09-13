import compose from "../lib/compose";
import Component from "../components/component";
import Spritesheet from "../components/spritesheet";
import Movable from "../components/movable";

export default (original) => {
  const { gameState, update, render, getTarget } = original;
  const { assets } = gameState;
  let timer = 0;

  function burst(props) {
    const { state, setAnimation, playAnimation } = props;
    if (state.bursting) return;
    state.bursting = true;
    setAnimation('burst');
    playAnimation();
  }

  function setX() {
    return 384 - 150 + ~~(Math.random() * 300);
  }

  return compose(
    Component,
    Spritesheet,
    (original) => {
      const { update } = original;
      return {
        ...original,
        update(props) {
          update && update(props);
          const { state, setState } = props;

          const target = getTarget();

          state.y > target.y - 32 && (
            setState({
              y: 480 - target.y
            }),
            burst(props)
          );

          state.x < 0 && (setState({
            x: 0,
            xVel: 0,
          }));

          state.x > 768 - 32 && (setState({
            x: 768 -32,
            xVel: 0,
          }));
        }
      }
    },
    Movable
  )({
    state: {
      x: setX(),
      y: 480 - getTarget().y,
      xVel: 0,
      yVel: 0,
      speed: 0.2,
      maxSpeed: 5,
      friction: 1,
      gravity: 1.5,
      animation: 'idle',
      bbox: {
        x: 0, y: 0, w: 32, h: 32,
      },
      bursting: false,
    },
    keys: {
      left: 37,
      right: 39,
      jump: 32,
    },
    width: 16,
    height: 16,
    image: assets.getAsset('spritesheet'),
    animations: {
      idle: {
        frames: [19, 20],
        speed: 10,
        direction: 'alternate',
      },
      burst: {
        frames: [19, 21, 22, 23, 24, 25, 26],
        speed: 3,
        direction: 'once',
      },
    },
    onEnd(props){
      const { state, setAnimation, playAnimation } = props;
      // setTimeout(() => {
        state.bursting = false;
        setAnimation('idle');
        state.y = getTarget().y - 480;
        state.x = setX();
        playAnimation();
      // }, 200);
      // console.log('anim ended', props);
    },
    ...original,
    burst,
    update(props) {
      update && update({...props}, burst);
      const { state, setState, setAnimation } = props;
      timer++;

      timer % ~~(Math.random() * 40) === 0 && (state.xVel = 3 - ~~(Math.random() * 6));

      // setAnimation('idle');
    },

    // render(props) {
    //   render && render(props);
    //   const { context, state } = props;
    //   // context.t(`j ${state.isJumping} ${state.y}`, state.x - 100, state.y + 20, {size: 2, stroke: 2});
    // }
  });
};
