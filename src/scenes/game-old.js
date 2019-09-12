import compose from '../lib/compose';
import component from '../components/component';
import Scene from '../components/scene';
import Camera from '../components/camera';
import Hero from '../components/hero';

export default ({ gameState }) => {
  const { assets } = gameState;
  let timer = 0;

  const background = compose(component, (original) => {
    const { image } = original;
    return {
      ...original,
      render({ context }) {
        context.di(image, 0, 0, 256, 240, 0, 0, 512, 480);
        context.di(image, 0, 0, 256, 240, 512, 0, 512, 480);
      }
    }
  })({
    image: assets.getAsset('background'),
  });

  const clouds = compose(component, (original) => {
    const { image } = original;
    let x = 0;
    return {
      update(props) {
        x -= 1/4;
        (x < -512 || x > 512) && (x = 0);
      },
      render({ context }) {
        context.di(image, 0, 0, 256, 240, ~~x, 0, 512, 480);
        context.di(image, 0, 0, 256, 240, 512 + ~~x, 0, 512, 480);
      }
    }
  })({image: assets.getAsset('clouds')});

  const sun = compose(component, (original) => {
    const { image } = original;
    return {
      render({ context }) {
        context.di(image, 0, 0, 256, 240, 0, 295, 512, 480);
      }
    }
  })({image: assets.getAsset('sun')});

  const bgScene = compose(Scene)({
    state: {
      speed: 10,
      entities: [
        // background,
        // sun,
        // clouds,
      ],
    },
    // update(props) {
    //   const { setTarget } = props;
    //   setTarget(~~(hero.state.x / 2), ~~(hero.state.y / 2));
    // },
    update(props) {
      background.update(props);
      clouds.update(props);
    },
    render(props) {
      const { context } = props;
      let x = -~~hero.state.x;
      let y = -~~hero.state.y;

      y < -260 && (y = -260);
      // y < 240 && (y = 240);
      x > -256 && (x = -256);

      context.t(`${x} ${y}`, 10, 30, {stroke: 2});
      context.sv();
      context.tr((x / 20), 20 + (y / 20));
      background.render(props);
      context.ro();

      context.sv();
      context.tr((x / 20), (y / 20));
      sun.render(props);
      context.ro();

      context.sv();
      context.tr((x / 5), (y / 5));
      clouds.render(props);
      context.ro();
    }
  });

  const hero = compose(Hero)({gameState});
  hero.setAnimation('idle');
  hero.setScale(2);
  hero.play();

  return compose(Camera, Scene)({
    state: {
      speed: 10,
      entities: [
        hero,
      ],
    },
    update(props) {
      const { dt, isKeyPressed, setState, setTarget, setShake } = props;
      timer++;

      setTarget(hero.state.x, hero.state.y);

      // background.update(props);
      // clouds.update(props);
      bgScene.update(props);
    },

    beforeCameraRender(props) {
      bgScene.render(props);
      // background.render(props);
      // sun.render(props);
      // clouds.render(props);
    },

    render(props) {
      const { context, state } = props;
      // background.render(props);
      context.t(`Game ${timer} ${state.speed}`, 170, 480, {size: 4, fill: '#fff', stroke: 2});
    }
  });
}