import compose from "../lib/compose";
import Component from "./component";
import Controller from "./controller";
import Spritesheet from "./spritesheet";

export default (original) => {
  const { gameState, update, render } = original;
  const { assets } = gameState;
  let timer = 0;

  return compose(Component, Spritesheet, Controller)({
    state: {
      x: 0,
      y: 0,
      keys: {
        left: 37,
        right: 39,
        jump: 32,
      },
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
        speed: 5,
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
      const { setState } = props;

      timer++;
      setState({x: ~~(100 + Math.sin(timer/100) * 300)});
    },

    render(props) {
      render && render(props);
      const { context, state } = props;
      context.text(`hero ${timer}`, state.x, 100, {size: 5});
    }
  });
};
