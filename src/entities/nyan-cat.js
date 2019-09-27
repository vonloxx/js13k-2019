import compose from "../lib/compose";
import Component from "../components/component";
import Spritesheet from "../components/spritesheet";

export default (original) => {
  const { gameState, update, render } = original;
  const { assets } = gameState;
  let timer = 0, trailFlick = 1;

  function createTrail(x, y, alt) {
    return compose(Component, Spritesheet, (original) => {
      const { update, state } = original;
      let timer = 0;
      let originalY = state.y;

      return {
        ...original,
        // update(props) {
        //   update && update(props);
        //   // const { state } = props;
        //   timer++;
  
        //   timer % 20 === 0 && (trailFlick = alt ? 1 : -1);
        //   timer % 40 === 0 && (trailFlick = alt ? -1 : 1);
    
        //   state.y = originalY + trailFlick;
        // },
      }
    })({
      state: {
        x: x,
        y: y,
        animation: 'default',
        flying: false,
        trailFlick: 1,
        alt,
      },
      width: 16,
      height: 16,
      image: assets.getAsset('spritesheet'),
      animations: {
        default: {
          frames: [29],
        },
      },
    });
  }

  const trails = [];

  return compose(
    Component,
    Spritesheet,
    (original) => {
      const { update } = original;
      return {
        ...original,
      }
    }
  )({
    state: {
      x: 0,
      y: 330,
      animation: 'flying',
      bbox: {
        x: 0,
        y: 0,
        w: 64,
        h: 32,
      },
    },
    width: 32,
    height: 16,
    image: assets.getAsset('spritesheet'),
    animations: {
      flying: {
        frames: [9, 10, 9],
        speed: 15,
        // animation: 'alternate',
      },
    },
    // onEnd(props){
    //   const { state, setAnimation, playAnimation, setVisible } = props;
    //   state.x = Math.random() * 768;
    //   setVisible(false);
    //   setTimeout(() => {
    //     setVisible(true);
    //     playAnimation();
    //   }, Math.random() * 1000);
    // },
    ...original,

    update(props) {
      update && update(props);
      const { state } = props;

      state.x += 2;
      // state.y -= 0.5;
      timer++;

      // rainbowTrail.update(props);
      // rainbowTrail.state.x = state.x + 32;
      trails.map((trail, i) => {
        trail.update(props);
        trail.state.x = state.x - (16 * i);
        // trail.state.y = state.y;
      });

      if (trails.length > 200) {
        trails.pop();
      }

      trails.unshift(createTrail(100, state.y - (timer % 20 >= 0 && timer % 20 < 10 ? 2:0), false));

      // timer % 20 === 0 && (trailFlick = -1);
      // timer % 40 === 0 && (trailFlick = 1);

      // rainbowTrail.state.y = state.y + trailFlick;
    },

    render(props) {
      const { context, state } = props;
      // rainbowTrail.render(props);
      trails.map(trail => {
        trail.render(props);
      });
      render && render(props);
      // context.t(`j ${state.isJumping} ${state.y}`, state.x - 100, state.y + 20, {size: 2, stroke: 2});
    }
  });
};
