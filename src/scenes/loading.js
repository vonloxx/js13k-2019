import compose from '../lib/compose';
import Scene from '../components/scene';

export default ({ gameState }) => {
  let
    timer = 0,
    size = 0;

  return compose(Scene)({
    update({dt}) {
      timer += 5;
    },

    render({context}) {
      if (timer === 50) {
        size = 0;
      }
      if (timer === 100) {
        size = 1;
      }
      if (timer === 150) {
        size = 2;
      }
      if (timer === 200) {
        size = 1;
        timer = 0;
      }

      // context.text(`Loading`, 170, 140, {size: 4, fill: '#fff', stroke: 5});
      context.t(`Loading`, 170 - (size * 20), 140 - (size * 3), {size: size + 4, fill: '#fff', stroke: 5});
    }
  });
}