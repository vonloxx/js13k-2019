import compose from "../lib/compose";
import Component from "../components/component";
import Spritesheet from "../components/spritesheet";

export default (original) => {
  const { gameState, update, render } = original;
  const { assets } = gameState;
  let timer = 0;

  const rainbowTrail = compose(Component, Spritesheet)({
    state: {
      x: 330,
      y: 330,
      animation: 'default',
    },
    width: 16,
    height: 16,
    image: assets.getAsset('spritesheet'),
    animations: {
      default: {
        frames: [27],
      },
    },
  });

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
      x: 330,
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
        frames: [9],
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
      rainbowTrail.update(props);
      rainbowTrail.state.x = state.x + 32;
      rainbowTrail.state.y = state.y;
    },

    render(props) {
      const { context, state } = props;
      rainbowTrail.render(props);
      render && render(props);
      // context.t(`j ${state.isJumping} ${state.y}`, state.x - 100, state.y + 20, {size: 2, stroke: 2});
    }
  });
};
