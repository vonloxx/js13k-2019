import compose from "../lib/compose";
// import Component from "./component";
import Spritesheet from "./spritesheet";

export default (wrapped) => {
  // const { update, render, setState} = wrapped;
  let timer = 0, angle = 0;

  return compose(Spritesheet)({
    state: {
      x: 0,
      y: 0,
    },
    ...wrapped,
    update(props) {
      const { setState } = props;

      timer++;
      angle = (timer * Math.PI / 180);
      // setState({x: ~~(100 + Math.sin(timer/100) * 100)});
    },

    render(props) {
      const { context, state } = props;
      context.sv();
      context.tr(state.x, state.y);
      context.rt(angle);
      context.r(-6, -2, 12, 4);
      context.r(-2, -6, 4, 12);
      context.ro();
      context.t(`star ${angle} ${timer}`, state.x, 100, {size: 5});
    }
  });
};
