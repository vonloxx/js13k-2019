import compose from '../lib/compose';
import Scene from '../components/scene';
import Spritesheet from '../components/spritesheet';
import component from '../components/component';
// import Star from '../components/star';

export default ({ gameState }) => {
  const { assets } = gameState;
  let musicPlaying, canPlay = false;
  let timer = 0, angle = 0, dir = 1;

  const song = assets.getAsset('nyan');
  song.setAttribute('loop', true);
  song.addEventListener('loadeddata', e => {
    canPlay = true;
  });

  // const spritesheet = assets.getAsset('spritesheet');
  // const hero = compose()({...assets.getAsset('spritesheet')});
  // hero.setScale(5);
  // hero.setState('walk');
  // hero.setPosition(300, 300);
  // hero.setDirection(-1);

  const bgImage = assets.getAsset('background');

  const bg1 = compose(component, () => {
    return {
      render({ context }) {
        context.rect(0, 0, 512, 480, {fill: '#000'});
      }
    }
  })();

  const bg2 = compose(component, (original) => {
    const { image } = original;
    let x = 0, y = 0, timer = 0;
    return {
      update(props) {
        timer++;
        x += 1 / 8;
        // musicPlaying && (y += 1 / 10);
        if (x > 512) {
          x = 0;
        }
      },
      render({ context }) {
        context.drawImage(image, 0, 0, 256, 240, -x, ~~y, 512, 480);
        context.drawImage(image, 0, 0, 256, 240, -(-512 + x), ~~y, 512, 480);

      }
    }
  })({image: bgImage});

  const bg3 = compose(component, (original) => {
    const { image } = original;
    let x = 0, timer = 0;
    return {
      update(props) {
        timer++;
        x = timer;
        if (x > 512) {
          timer = 0;
        }
      },
      render({ context }) {
        context.drawImage(image, 0, 0, 256, 240, -x, 0, 512, 480);
        context.drawImage(image, 0, 0, 256, 240, -(-512 + x), 0, 512, 480);

      }
    }
  })({image: assets.getAsset('backgroundMontains')});

  const clouds = compose(component, (original) => {
    const { image } = original;
    let x = 0, timer = 0;
    return {
      update(props) {
        timer++;
        x = timer / 1.5;
        if (x > 512) {
          timer = 0;
        }
      },
      render({ context }) {
        context.drawImage(image, 0, 0, 256, 240, -(~~x), 0, 512, 480);
        context.drawImage(image, 0, 0, 256, 240, -(-512 + (~~x)), 0, 512, 480);

      }
    }
  })({image: assets.getAsset('clouds')});

  const sun = compose(component, (original) => {
    const { image } = original;
    return {
      render({ context }) {
        context.drawImage(image, 0, 0, 256, 240, 0, 300, 512, 480);
      }
    }
  })({image: assets.getAsset('sun')});

  const title = compose(component, (original) => {
    const { image } = original;
    let timer2 = 0;

    return {
      update(props) {
        timer2++;
        !musicPlaying && (timer2 = 0);
      },
      render({ context }) {
        musicPlaying && (
          context.text('Bring it', 14, 0, {fill:'#fff', size: 10, stroke: 5}),
          context.text('Back', 4, 50, {fill:'#fff', size: 20, stroke: 10}),
          context.drawImage(image, 0, 0, 256, 120, 14, 0, 512, 240)
        );

        musicPlaying && timer2 > 100 && (
          context.text('A game by Marco Fernandes', 14, 240, {fill:'#fff', size: 2, stroke: 2})
        )

        musicPlaying && timer2 > 150 && (
          context.text('"Nyan cat" character by ????', 14, 260, {fill:'#fff', size: 2, stroke: 2}),
          context.text('"Nyan cat" music by ????', 14, 280, {fill:'#fff', size: 2, stroke: 2})
        )

        musicPlaying && timer2 > 200 &&
        (timer2 % 100 > 0 && timer2 % 100 < 50) &&
         (
          context.text('Press any key to start', 14, 320, {fill:'#fff', size: 3, stroke: 3})
        )

        context.save();
        context.rotate(15 * Math.PI / 180);
        musicPlaying && timer2 > 50 && (
          context.drawImage(image, 0, 120, 256, 120, 14, 140, 512, 240)
        )
        context.restore();
      }
    }
  })({image: assets.getAsset('title')});

  // assets.getAsset('audio').play('boogie');

  // const star = Star({state: {x: 100, y: 40}});
  function generateStar() {
    return compose(Spritesheet)({
      state: {
        currentAnimation: 'twinkle',
      },
      width: 16,
      height: 16,
      image: assets.getAsset('spritesheet'),
      animations: {
        twinkle: {
          frames: [12, 13, 14, 15, 16],
          speed: 5,
          direction: 'once',
        },
      },
      onEnd(props) {
        const { setVisible, setState, setPosition, setScale, play } = props;
        setVisible(false);
        setPosition(~~(Math.random() * 512), ~~(Math.random() * 512));
        setScale(~~(Math.random() * 4) + 3);
        setTimeout(play, ~~(Math.random() * 3000));
      },
    });
  };

  const stars = [];

  for (let i = 0; i < 20; i++) {
    const star = generateStar();
    star.setAnimation('twinkle');
    star.setScale(~~(Math.random() * 4) + 3);
    star.setPosition(~~(Math.random() * 512), ~~(Math.random() * 512));
    star.stop();
    star.setVisible(false);
    
    stars.push(star);

    setTimeout(star.play, ~~(Math.random() * 3000));
  }

  return compose(Scene)({
    state: {
      entities: [
        // hero,
        bg1,
        ...stars,
        bg2,
        sun,
        clouds,
        bg3,
        title,
      ],
    },

    update({dt, isKeyPressed}) {
      if (isKeyPressed() && !musicPlaying && canPlay) {
        song.play();
        musicPlaying = true;
      }

      timer += 1;

      if (timer % 50 === 0) {
        dir = 1;
        // hero.setState('walk');
      }
      if(timer % 100 === 0) {
        dir = -1;
        // hero.setState('falling');
      }
      // hero.setDirection(dir);
      // hero.setRotation(~~(timer));

      angle = ~~(Math.sin((timer/100)) * 100);
    },

    render({context, gameState}) {
      const bg = gameState.assets.getAsset('background');
      !musicPlaying && 
      (timer % 100 > 0 && timer % 100 < 50) &&
      context.text(`Press any key`, 60, 260, {size: 5, stroke: 5});
      // musicPlaying && (
      //   context.text(`Bring it`, 60, 136, {size: 6, stroke: 6}),
      //   context.text(`back`, 54, 166, {size: 12, stroke: 6})
      // );
      // context.text(`${dir}`, 0, 300, {size: 2});
      // hero.render(context);
    },
  });
};
