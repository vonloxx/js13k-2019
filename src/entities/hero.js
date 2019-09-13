import compose from "../lib/compose";
import Component from "../components/component";
import Controller from "../components/controller";
import Spritesheet from "../components/spritesheet";
import Movable from "../components/movable";
import Jumpable from "../components/jumpable";
import Zzfx from '../lib/zzfx';

export default (original) => {
  const { gameState, update, render, colliding } = original;
  const { assets } = gameState;
  let zzfx = new Zzfx();
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

          state.y > 480 - 32 && (setState({
            y: 480 - 32,
            yVel: 0,
            isJumping: false,
          }));

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
      bbox: {
        x: 0, y: 0, w: 32, h: 32,
      },
      colliders: [],
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
      isPressed('jump') && !state.isJumping && (zzfx.z(28209), jump(), setAnimation('jump'));
      state.isJumping && setAnimation('jump');
      ~~state.yVel > 1 && setAnimation('fall');

      state.colliders.forEach(entity => {
        const x1 = state.x + state.bbox.x;
        const x2 = state.x + state.bbox.x + state.bbox.w;
        const x3 = entity.state.x + entity.state.bbox.x;
        const x4 = entity.state.x + entity.state.bbox.x + entity.state.bbox.w;

        const y1 = state.y + state.bbox.y;
        const y2 = state.y + state.bbox.y + state.bbox.h;
        const y3 = entity.state.y + entity.state.bbox.y;
        const y4 = entity.state.y + entity.state.bbox.y + entity.state.bbox.h;

        colliding &&
        x2 > x3 &&
        x1 < x4 &&
        y2 > y3 &&
        y1 < y4 && (
          // console.log('coliding'),
          colliding(entity)
        );
      });

      // state.y >= 480 && (setState({
      //   y: 480,
      //   yVel: 0,
      //   isJumping: false,
      // }));
    },

    render(props) {
      render && render(props);
      const { context, state } = props;
      // context.t(`hero ${state.y}`, state.x - 100, state.y + 20, {size: 2, stroke: 2});
    }
  });
};
