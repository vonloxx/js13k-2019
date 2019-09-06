import compose from "../lib/compose";
import Component from "./component";
import Controller from "./controller";
import Spritesheet from "./spritesheet";
import Movable from "./movable";
import Jumpable from "./jumpable";

export default (original) => {
  const { gameState, update, render } = original;
  const { assets } = gameState;
  let timer = 0;

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

          state.y > 460 && (setState({
            y: 460,
            yVel: 0,
            isJumping: false,
          }));    
        }
      }
    },
    Jumpable, 
    Movable, 
    Controller
  )({
    state: {
      x: 0,
      y: 0,
      xVel: 0,
      yVel: 0,
      speed: 0.2,
      maxSpeed: 5,
      friction: 1,
      gravity: 10,
      isJumping: false,
      animation: 'idle',
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
        frames: [1],
      },
      walk: {
        frames: [1, 2, 3, 4, 5],
        speed: 3,
        direction: 'alternate',
      },
      jump: {
        frames: [1],
      },
      fall: {
        frames: [6],
      },
      talk: {
        frames: [1, 6],
        speed: 15,
        direction: 'alternate',
      },
    },
    ...original,
    update(props) {
      update && update(props);
      const { state, setState, setDirection, setAnimation, isPressed, incXVel, decXVel, jump } = props;

      setAnimation('idle');
      isPressed('left') && (decXVel(), setDirection(-1), setAnimation('walk'));
      isPressed('right') && (incXVel(), setDirection(1), setAnimation('walk'));
      isPressed('jump') && !state.isJumping && (jump(), setAnimation('jump'));
      state.isJumping && setAnimation('jump');
      ~~state.yVel > 1 && setAnimation('fall');

      // state.y >= 480 && (setState({
      //   y: 480,
      //   yVel: 0,
      //   isJumping: false,
      // }));
    },

    render(props) {
      render && render(props);
      const { context, state } = props;
      context.t(`j ${state.isJumping} ${state.y}`, state.x - 100, state.y + 20, {size: 2, stroke: 2});
    }
  });
};
