import compose from '../lib/compose';
import component from '../components/component';
import Scene from '../components/scene';
import Star from '../components/star';

export default ({ gameState }) => {
  const { assets } = gameState;
  let
    timer = 0;

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
    state: {
      x: 0,
      y: 0,
    },
    image: assets.getAsset('background'),
  });

  const sun = compose(component, (original) => {
    const { image } = original;
    return {
      render({ context }) {
        context.di(image, 0, 0, 256, 240, 0, 295, 512, 480);
      }
    }
  })({image: assets.getAsset('sun')});

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

  function setStar(y) {
    const star = Star({gameState});
    star.setState({ x: 100, y });
    star.setAnimation('twinkle');
    star.setScale(4);
    star.playAnimation();
    return star;
  }

  const stars = [
    setStar(130),
    setStar(30),
    setStar(-130),
    setStar(-260),
    setStar(-390),
    setStar(-420),
  ];

  return compose(Scene)({
    state: {
      entities: [ ...stars, background, sun, clouds],
    },
    update(props) {
      timer += 5;
    },

    render(props) {
    }
  });
}