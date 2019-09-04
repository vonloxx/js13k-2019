export default (context) => {
  context.clearRect(0, 0, 256, 240);

  context.save();
  context.font = '200px sans-serif'
  context.translate(128, 120);
  context.fillText(`${String.fromCodePoint(0x1F31E)}`, -100, 100);
  context.restore();


  return {
    width: 256,
    height: 240,
    image_data:context.getImageData(0, 0, 256, 240),
  };
}