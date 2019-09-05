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
        context.drawImage(image, 0, 0, 256, 240, 0, 0, 512, 480);
        context.drawImage(image, 0, 0, 256, 240, 512, 0, 512, 480);
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
        context.drawImage(image, 0, 0, 256, 240, ~~x, 0, 512, 480);
        context.drawImage(image, 0, 0, 256, 240, 512 + ~~x, 0, 512, 480);
      }
    }
  })({image: assets.getAsset('clouds')});

  const sun = compose(component, (original) => {
    const { image } = original;
    return {
      render({ context }) {
        context.drawImage(image, 0, 0, 256, 240, 0, 295, 512, 480);
      }
    }
  })({image: assets.getAsset('sun')});

  const hero = compose(Hero)({gameState});
  hero.setAnimation('talk');
  hero.setScale(4);
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
      // timer === 100 && setTarget(400, 200);
      // timer === 200 && setTarget(200, 0);
      // timer === 300 && setTarget(0, 400);
      // timer === 400 && (
      //   // setSpeed(50),
      //   setState({ speed: 50 }),
      //   setTarget(0, 0),
      //   setShake(1000)
      // );
      // timer === 500 && setTarget(256, 240);

      background.update(props);
      clouds.update(props);
    },

    beforeCameraRender(props) {
      background.render(props);
      sun.render(props);
      clouds.render(props);
    },

    render(props) {
      const { context, state } = props;
      // background.render(props);
      context.text(`Game ${timer} ${state.speed}`, 170, 140, {size: 4, fill: '#fff', stroke: 2});
    }
  });
}