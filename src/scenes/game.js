import compose from '../lib/compose';
import Component from '../components/component';
import Scene from '../components/scene';
import Camera from '../components/camera';
import Hero from '../entities/hero';
import Floor from '../entities/floor';
import Bubble from '../entities/bubble';
import Background from '../scenes/background';
import Zzfx from '../lib/zzfx';

export default ({ gameState }) => {
  const { assets, gameOver } = gameState;
  let timer = 0;
  let camX = 0, camY = 0;
  let bubbleTimer = 0;
  let heroFall = 0, heroDead = false, firstBubble = false, collided = false;
  let titleSound = false;
  let zzfx = new Zzfx();

  const background = Background({gameState});

  const hero = compose(Hero)({
    gameState,
    colliding(props){
      const { burst } = props;
      burst(props);
      hero.state.yVel = -7;
      hero.state.isJumping = true;
      heroFall = 0;
      firstBubble = true;
      gameState.score += gameState.height;
      !collided && zzfx.z(28209); // 25027
      collided = true;
      setTimeout(() => {
        collided = false;
      }, 50);
    },
  });

  hero.setAnimation('idle');
  hero.setScale(2);
  hero.setState({ x: 384, y: 460 });
  hero.playAnimation();

  const floor = Floor({
    image: assets.getAsset('spritesheet'),
  });

  const zyxLogo = assets.getAsset('zyxplay');

  function setBubble(getTarget) {
    const bubble = compose(Bubble)({gameState, getTarget});
    bubble.setAnimation('idle');
    bubble.setScale(2);
    // bubble.setState({ x: 384 - 20 + ~~(Math.random() * 40), y: 448-camY });
    // bubble.setRotation(~~(timer / 2));
    bubble.playAnimation();
    return bubble;
  }

  // const camHud = compose(Component)({
  //   render(props) {
  //     const {context} = props;
  //   }
  // });

  return compose(Camera, Scene)({
    state: {
      speed: 10,
      entities: [
        floor,
        hero,
        // camHud,
      ],
    },
    update(props) {
      const { state, setState, setTarget, getTarget, setShake } = props;
      timer++;

      setTarget(hero.state.x, hero.state.y);
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

      if (hero.state.y > 447 && firstBubble) {
        heroDead = true;
      }

      if (heroDead) {
        zzfx.z(35003);
        gameOver();
      }

      gameState.height = ~~((480 - hero.state.y) / 30);

      background.update(props);
      // clouds.update(props);
      // bgScene.update(props);
    },

    beforeCameraRender(props) {
      // bgScene.render(props);
      // sun.render(props);
      // clouds.render(props);
      const { context, state } = props;

      let x = -~~hero.state.x;
      let y = -~~hero.state.y;
      context.sv();
      context.tr((x / 20), 20 + (y / 20));
      background.render(props);
      context.ro();

      timer < 300 && (
        context.t(`Jump into the`, 139, 130, {size: 3, fill: '#fff', stroke: 2}),
        context.t(`bubbles to get`, 130, 160, {size: 3, fill: '#fff', stroke: 2})
      );

      timer > 150 && timer < 450 && (
        context.t(`back to`, 130, 200, {size: 6, fill: '#fff', stroke: 6}),
        context.t(`the stars`, 94, 240, {size: 6, fill: '#fff', stroke: 6}),
        !titleSound && zzfx.z(55428),
        titleSound = true
      );

      timer < 400 && (
        context.t(`Arrow keys to move`, 148, 410, {size: 2, fill: '#fff', stroke: 2}),
        context.t(`Space to jump`, 178, 430, {size: 2, fill: '#fff', stroke: 2})
      );

      // context.t(`Height ${gameState.height}`, 10, 10, {size: 2, fill: '#fff', stroke: 2});
      context.t(`Score ${gameState.score}`, 10, 10, {size: 2, fill: '#fff', stroke: 2});

      context.di(zyxLogo, 0, 0, 51, 25, 405, 10, 102, 50);

      // heroDead && context.t(`Game Over`, 170, 200, {size: 4, fill: '#fff', stroke: 2});
      // context.t(`fall ${heroFall} ${firstBubble}`, 170, 200, {size: 4, fill: '#fff', stroke: 2});
    },

    // render(props) {
    //   const { context, state } = props;
    //   // console.log(state);
    //   // background.render(props);
    //   // context.t(`${camX} ${camY}`, camX, camY, {size: 4, fill: '#fff', stroke: 2});
    // }
  });
}