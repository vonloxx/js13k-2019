export default (original) => {
  const {
    state = {
      x: 0,
      y: 0,
      xVel: 0,
      yVel: 0,
      speed: 0.5,
      gravity: 10,
      isJumping: false,
    },
    update,
  } = original;

  function jump(vel) {
    if (state.isJumping) return;
    const velocity = vel * 2 || 18; // * 2 to compensate
    state.yVel = -7;
    state.isJumping = true;
  }

  return {
    ...original,
    update(props) {
      update && update({ ...props, jump });
      // const velocity = state.speed;
      // state.yVel < 0 && (state.vVel += velocity),
      // ~~state.xVel < 0 && (state.xVel += velocity)
      // state.x += ~~state.xVel;
      // state.y += ~~state.yVel;
    },
  }
};
