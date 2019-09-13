export default (original) => {
  const { update, render, beforeCameraRender } = original;
  const { state = {
    speed: 30,
    target: {x: 0, y: 0},
  }} = original;

  let
    targetX = 0,
    targetY = 0,
    y = 0,
    x = 0,
    angle = 0,
    moving = false,
    camCenter = 256,
    shake = 0,
    shakeDuration = 500;

  function setShake(duration) {
    shake = 1;
    shakeDuration = duration;
  };

  function setTarget(x, y) {
    targetX = x;
    targetY = y;
    moving = true;
  };

  function getTarget() {
    return { x: x + 256, y: y + 240 };
  };

  return {
    ...original,
    update(props) {
      update && update({...props, setShake, setTarget, getTarget});

      const { speed } = state;

      if (shake > 0) {
        shake += 5;
        x = x + Math.random() * 10 - 5;
        y = y + Math.random() * 10 - 5;
      }

      if (shake > shakeDuration) {
        shake = 0;
      }

      const distanceX = targetX - x;
      const distanceY = targetY - y;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      angle = Math.atan2(distanceY,distanceX) * (180/Math.PI);

      if (moving) {
        if (distance > 20) {
          x += distanceX / speed;
          y += distanceY / speed;
        } else {
          moving = false;
        }
      }

      x = ~~x;
      y = ~~y;

      y > 260 && (y = 260);
      // y < 240 && (y = 240);
      x < 256 && (x = 256);
      x > 512 && (x = 512);
    },

    render(props) {
      const { context } = props;
      beforeCameraRender && beforeCameraRender(props);

      // context.t(`x: ${x} y: ${y}`, 0, 10, {stroke: 2, size: 2});

      context.sv();
      context.tr(-(x - camCenter), -(y - 240));

      render && render(props);
      context.ro();
    }
  };
}