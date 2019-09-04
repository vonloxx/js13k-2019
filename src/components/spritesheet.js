import compose from '../lib/compose';
import Component from './component';

export default (original) => {
  const { state = {x: 0, y: 0, paused: false}, width, height, image, animations, update, render, onEnd = () => {console.log('from ss');}} = original;
  let currentAnimation = 'twinkle', currentSpeed = 0, scale = 2, angle = 0, mirror = false;
  let currentFrame = 0;
  let timer = 0, delta = 0, stopped = false, visible = true;
  let dir = 1;

  const transformed = {
    ...original,
    setVisible(newValue) {
      visible = newValue;
    },
    setPosition(newX, newY) {
      // setPosition && setPosition(newX, newY);
      state.x = newX;
      state.y = newY;
    },
    setScale(newScale) {
      scale = newScale;
    },
    setAnimation(animation) {
      currentAnimation = animation;
      currentSpeed = animations[currentAnimation].speed;
    },
    setSpeed(speed) {
      currentSpeed = speed;
    },
    setRotation(newAngle) {
      angle = newAngle;
    },
    setDirection(newDir) {
      mirror = newDir === -1;
    },
    play() {
      currentFrame = 0;
      timer = 0;
      transformed.setVisible(true);
      stopped = false;
      dir = 1;
    },
    stop() {
      stopped = true;
    },
  }

  return compose(Component)({
    ...transformed,
    update(props) {
      update && update(props);
      const { dt, setState } = props;

      timer += 1;

      if (currentFrame >= animations[currentAnimation].frames.length - 1) {
        if (animations[currentAnimation].direction && animations[currentAnimation].direction === 'alternate') {
          dir = -1;
        } else if(animations[currentAnimation].direction === 'once' && !stopped) {
          dir = 0;
          stopped = true;
          onEnd({...transformed});
        } else {
          currentFrame = 0;
        }
      }

      if (currentFrame === 0) {
        if (animations[currentAnimation].direction && animations[currentAnimation].direction === 'alternate') {
          dir = 1;
        }
      }

      !stopped && currentSpeed && timer % currentSpeed === 0 && (currentFrame += dir);
    },

    render(props) {
      render && render(props);
      const { context } = props;

      if (!visible) {
        return;
      }

      const frame = animations[currentAnimation].frames[currentFrame] - 1;
      context.save();
      context.translate(state.x, state.y);
      if (mirror) {
        context.scale(-scale, scale);
      } else {
        context.scale(scale, scale);
      }
      context.rotate((mirror?-angle:angle) * Math.PI / 180);
  
      context.drawImage(image, frame * width, 0, width, height, -width / 2, -height / 2, width, height);
      context.restore();
      // context.text(`${currentFrame} ${animations[currentAnimation].frames.length}`, 100, 100, {fill: '#fff'});
    },
  });
}