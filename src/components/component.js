export default (wrapped) => {
  const { state, init, update, render } = wrapped;

  function setState(props) {
    Object.entries(props).forEach(entry => {
      state[entry[0]] = entry[1];
    });
  };

  return {
    ...wrapped,
    state,
    setState,

    init(props) {
      init && init(props);
    },

    update(props) {
      update && update({...props, setState});
    },

    render(props) {
      render && render({...props, state});
    }
  }
};
