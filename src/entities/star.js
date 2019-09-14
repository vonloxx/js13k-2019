import compose from "../lib/compose";
import Component from "../components/component";
import Spritesheet from "../components/spritesheet";
import Movable from "../components/movable";

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
      }
    }
  )({
    state: {
      x: 30,
      y: 30,
      animation: 'twinkle',
    },
    width: 16,
    height: 16,
    image: assets.getAsset('spritesheet'),
    animations: {
      twinkle: {
        frames: [12, 13, 14, 15, 16],
        speed: 3,
        direction: 'once',
      },
    },
    onEnd(props){
      const { state, setAnimation, playAnimation, setVisible } = props;
      state.x = Math.random() * 768;
      setVisible(false);
      setTimeout(() => {
        setVisible(true);
        playAnimation();
      }, Math.random() * 1000);
    },
    ...original,

    // render(props) {
    //   render && render(props);
    //   const { context, state } = props;
    //   // context.t(`j ${state.isJumping} ${state.y}`, state.x - 100, state.y + 20, {size: 2, stroke: 2});
    // }
  });
};
