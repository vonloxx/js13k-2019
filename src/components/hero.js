import compose from "../lib/compose";
import Component from "./component";

export default (wrapped) => {
  const { state, update, render, setState} = wrapped;
  let timer = 0;

  return compose(Component)({
    state: {
      x: 0,
      y: 0,
    },
    ...wrapped,
    update(props) {
      update && update(props);
      const { setState } = props;

      timer++;
      setState({x: ~~(100 + Math.sin(timer/100) * 100)});
    },

    render(props) {
      render && render(props);
      const { context, state } = props;
      context.text(`hero ${timer}`, state.x, 100, {size: 5});
    }
  });
};
