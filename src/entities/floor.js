import compose from "../lib/compose";
import Component from "../components/component";

export default (original) => {
  const { image, render } = original;
  // const { assets } = gameState;

  return compose(Component)({
    // image: assets.getAsset('spritesheet'),
    ...original,
    render(props) {
      render && render(props);
      const { context } = props;

      for (let i = 0; i < 24; i++) {
        context.di(image, 6 * 16, 0, 16, 16, i * 32, 478, 32, 32);
      }
    },
  });
}
