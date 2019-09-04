import compose from '../lib/compose';
import Scene from '../components/scene';

export default ({ gameState }) => {
  let timer = 0;
  return compose(Scene)({
    update({dt}) {
      timer += 5;
    },

    render({context}) {
      context.text(`Game`, 170, 140, {size: 4, fill: '#fff', stroke: 5});
    }
  });
}