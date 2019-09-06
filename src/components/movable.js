export default (original) => {
  const {
    state = {
      x: 0,
      y: 0,
      xVel: 0,
      yVel: 0,
      speed: 0.2,
      maxSpeed: 8,
      friction: 2,
      gravity: 10,
    },
    update,
  } = original;

  function incXVel(vel) {
    const velocity = vel * 2 || state.speed * state.friction * 2; // * 2 to compensate
    state.xVel < state.maxSpeed && (state.xVel += velocity);
  }

  function decXVel(vel) {
    const velocity = vel * 2 || state.speed * state.friction * 2;
    state.xVel > -state.maxSpeed && (state.xVel -= velocity);
  }

  return {
    ...original,
    update(props) {
      const velocity = state.speed * state.friction;

      ~~state.xVel > 0 && (state.xVel -= velocity),
      ~~state.xVel < 0 && (state.xVel += velocity)

      // Apply gravity.
      state.yVel += state.speed;
      state.yVel > state.gravity && (state.yVel = state.gravity);

      state.x += ~~state.xVel;
      state.y += ~~state.yVel;

      update && update({ ...props, incXVel, decXVel });
    },
  }
};
