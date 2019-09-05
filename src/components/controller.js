export default (original) => {
  const {
    keys = {
      up: 38,
      down: 40,
      left: 37,
      right: 39,
    },
    update
  } = original;

  const pressedKeys = {};

  function isPressed(key) {
    return !!pressedKeys[keys[key]];
  }

  return {
    ...original,
    update(props) {
      update && update({...props, isPressed});
      const { isKeyPressed } = props;
      Object.keys(keys).map(key => {
        pressedKeys[keys[key]] = isKeyPressed(keys[key]);
      });
    },
  }
};
