export default (context) => {
  const gradient = context.createLinearGradient(0, 0, 0, 240);
  gradient.addColorStop(0, 'rgb(0, 0, 63, 0)');
  gradient.addColorStop(0.5, 'rgb(127, 0, 127, 1)');
  gradient.addColorStop(0.75, 'rgb(127, 0, 0, 1)');
  gradient.addColorStop(1, 'orange');

  context.clearRect(0, 0, 256, 240);
  context.fillStyle = gradient;
  context.fillRect(0, 0, 512, 480);

  return {
    width: 256,
    height: 240,
    image_data:context.getImageData(0, 0, 256, 240),
  };
}