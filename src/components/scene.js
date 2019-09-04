import compose from '../lib/compose';
import Component from './component';

export default (wrapped) => {
  const { state = {}, update, render } = wrapped;

  return compose(Component)({
    ...wrapped,
    update(props) {
      state.entities && state.entities.forEach(entity => {
        entity.update(props);
      });
      update && update(props);
    },

    render(props) {
      state.entities && state.entities.forEach(entity => {
        entity.render(props);
      });
      render && render(props);
    }
  });
};