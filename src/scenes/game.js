import compose from '../lib/compose';
import Component from '../components/component';
import Scene from '../components/scene';
import Camera from '../components/camera';
import Hero from '../entities/hero';
import Floor from '../entities/floor';
import Bubble from '../entities/bubble';

export default ({ gameState }) => {
  const { assets } = gameState;
  let timer = 0;
  let camX = 0, camY = 0;
  let bubbleTimer = 0;
  let heroFall = 0, heroDead = false;

  const hero = compose(Hero)({
    gameState,
    colliding(props){
      const { burst } = props;
      burst(props);
      hero.state.yVel = -7;
      heroFall = 0;
    },
  });

  hero.setAnimation('idle');
  hero.setScale(2);
  hero.setState({ x: 384, y: 460 });
  hero.playAnimation();

  const floor = Floor({
    image: assets.getAsset('spritesheet'),
  });

  function setBubble(getTarget) {
    const bubble = compose(Bubble)({gameState, getTarget});
    bubble.setAnimation('idle');
    bubble.setScale(4);
    // bubble.setState({ x: 384 - 20 + ~~(Math.random() * 40), y: 448-camY });
    // bubble.setRotation(~~(timer / 2));
    bubble.playAnimation();
    return bubble;
  }

  // hero.state.colliders.push(bubble);

  const camHud = compose(Component)({
    render(props) {
      const {context} = props;
      context.t(`${camX} ${camY}`, 170, 480, {size: 4, fill: '#fff', stroke: 2});
    }
  });

  return compose(Camera, Scene)({
    state: {
      speed: 10,
      entities: [
        floor,
        hero,
        // bubble,
        camHud,
      ],
    },
    update(props) {
      const { state, setState, setTarget, getTarget, setShake } = props;
      timer++;

      setTarget(hero.state.x, hero.state.y);
      // bubble.setRotation(~~(timer / 2));
      const target = getTarget();
      camX = target.x;
      camY = target.y;
      bubbleTimer++;
      ~~hero.state.yVel > 0 && heroFall++;
      ~~hero.state.yVel <= 0 && (heroFall = 0);

      if (bubbleTimer % 100 === 0 && state.entities.length < 10) {
        const bubble = setBubble(getTarget);
        state.entities.push(bubble);
        hero.state.colliders.push(bubble);
      }

      if (heroFall > 120) {
        heroDead = true;
      }

      // background.update(props);
      // clouds.update(props);
      // bgScene.update(props);
    },

    beforeCameraRender(props) {
      // bgScene.render(props);
      // background.render(props);
      // sun.render(props);
      // clouds.render(props);
      const { context, state } = props;
      
      timer < 10000 && (
        context.t(`Jump to the bubbles to get`, 20, 180, {size: 3, fill: '#fff', stroke: 2}),
        context.t(`back to`, 100, 200, {size: 6, fill: '#fff', stroke: 6}),
        context.t(`the stars`, 80, 240, {size: 6, fill: '#fff', stroke: 6})
      );

      heroDead && context.t(`Game Over`, 170, 200, {size: 4, fill: '#fff', stroke: 2});
      // context.t(`fall ${heroFall}`, 170, 200, {size: 4, fill: '#fff', stroke: 2});
    },

    render(props) {
      const { context, state } = props;
      // console.log(state);
      // background.render(props);
      context.t(`${camX} ${camY}`, camX, camY, {size: 4, fill: '#fff', stroke: 2});
    }
  });
}