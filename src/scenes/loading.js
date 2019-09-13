import compose from '../lib/compose';
import Scene from '../components/scene';

export default ({ gameState }) => {
  let timer = 0;
  return compose(Scene)({
    update(prop) {
      timer++;
    },
    render({context}) {
      context.t(`Loading`, 172, 140, {size: 4, fill: '#fff', stroke: 5});

      context.sv();
      context.tr(256, 240);
      context.rt(timer / 50);
      context.t('#', -30, -30, { size: 10, stroke: 0});
      context.ro();

    }
  });
}