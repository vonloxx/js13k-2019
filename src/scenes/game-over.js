import compose from '../lib/compose';
import Scene from '../components/scene';

export default ({ gameState }) => {
  const { startGame, score = 0, highScore = 0, assets } = gameState;

  const zyxLogo = assets.getAsset('zyxplay');

  let
    timer = 0;

  return compose(Scene)({
    update(props) {
      const { isKeyPressed } = props;
      timer += 1;

      if (timer > 100 && isKeyPressed()) {
        startGame();
      }
    },

    render({context}) {
      context.di(zyxLogo, 0, 0, 51, 25, 405, 10, 102, 50);

      context.t('Game Over', 30, 160, {size: 8, stroke: 8});
      context.t(`Score:${score}`, 30, 240, {size: 4, stroke: 4});
      context.t(`High Score:${highScore}`, 30, 270, {size: 4, stroke: 4});

      timer > 100 && (
        context.t(`Press any key`, 178, 420, {size: 2, stroke: 2})
      );
      // context.text(`Loading`, 170, 140, {size: 4, fill: '#fff', stroke: 5});
      // context.t(`Loading`, 170 - (size * 20), 140 - (size * 3), {size: size + 4, fill: '#fff', stroke: 5});
    }
  });
}