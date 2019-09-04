export default (context) => {
  context.clearRect(0, 0, 256, 240);

  context.font = '30px sans-serif'
  context.fillStyle = '#fff';

  context.save();
  context.translate(20, 100);
  context.fillText(`${String.fromCodePoint(0x2601)}`, -15, 15);
  context.restore();

  context.save();
  context.font = '60px sans-serif'
  context.translate(200, 200);
  context.fillText(`${String.fromCodePoint(0x2601)}`, -15, 15);
  context.restore();

  context.save();
  context.font = '40px sans-serif'
  context.translate(140, 20);
  context.fillText(`${String.fromCodePoint(0x2601)}`, -15, 15);
  context.restore();

  context.save();
  context.globalCompositeOperation = 'source-in';

  const gradient = context.createLinearGradient(0, 0, 0, 240);
  gradient.addColorStop(0, 'rgb(0, 0, 0, 0.75)');
  gradient.addColorStop(1, 'rgb(255, 255, 255, 1)');

  context.fillStyle = gradient;
  context.fillRect(0, 0, 256, 240);

  context.globalCompositeOperation = 'source-over';
  context.restore();

  return {
    width: 256,
    height: 240,
    image_data:context.getImageData(0, 0, 256, 240),
  };
}