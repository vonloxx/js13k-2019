export default (original) => {
  const {
    state = {
      x: 0,
      y: 0,
      animation: 'idle',
      paused: false
    }, 
    width, height, image, animations, update, render, onEnd = () => {console.log('from ss');}
  } = original;
  let currentAnimation = state.animation, currentSpeed = 0, scale = 2, angle = 0, mirror = false;
  let currentFrame = 0;
  let timer = 0, stopped = false, visible = true;
  let dir = 1;

  function setDirection(newDir) {
    mirror = newDir === -1;
  };

  function setAnimation(animation) {
    currentAnimation = animation;
    currentSpeed = animations[currentAnimation].speed;
  };

  function playAnimation() {
    currentFrame = 0;
    timer = 0;
    transformed.setVisible(true);
    stopped = false;
    dir = 1;
  };

  const transformed = {
    ...original,
    setVisible(newValue) {
      visible = newValue;
    },
    setPosition(newX, newY) {
      state.x = newX;
      state.y = newY;
    },
    setScale(newScale) {
      scale = newScale;
    },
    setAnimation,
    setSpeed(speed) {
      currentSpeed = speed;
    },
    setRotation(newAngle) {
      angle = newAngle;
    },
    setDirection,
    playAnimation,
    stop() {
      stopped = true;
    },
  }

  return {
    ...transformed,
    update(props) {
      update && update({...props, setDirection, setAnimation, playAnimation});

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

      currentFrame === 0 &&
      animations[currentAnimation].direction &&
      animations[currentAnimation].direction === 'alternate' && (
        dir = 1
      );

      !stopped && currentSpeed && timer % currentSpeed === 0 && (currentFrame += dir);
    },

    render(props) {
      render && render(props);
      const { context } = props;

      if (!visible) {
        return;
      }

      const frame = animations[currentAnimation].frames[currentFrame] - 1;
      context.sv();
      context.tr(state.x + width, state.y + height);
      if (mirror) {
        context.sc(-scale, scale);
      } else {
        context.sc(scale, scale);
      }
      context.rt((mirror?-angle:angle) * Math.PI / 180);
  
      // context.tr(width / 2, -height / 2);
      context.di(image, frame * width, 0, width, height, -width / 2, -height / 2, width, height);
      context.ro();

      // context.r(state.x, state.y, 32, 32, {fill: '#fff'});
    },
  };
}