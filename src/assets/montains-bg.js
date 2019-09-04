export default (context) => {
  context.clearRect(0, 0, 256, 240);
  context.fillStyle = 'black';
  context.save();
  context.translate(100, 250);
  context.rotate(45 * Math.PI / 180);
  context.fillRect(-50, -50, 100, 100);
  context.restore();

  context.save();
  context.translate(180, 270);
  context.rotate(45 * Math.PI / 180);
  context.fillRect(-50, -50, 100, 100);
  context.restore();

  context.save();
  context.font = '50px sans-serif'
  context.translate(50, 200);
  context.fillText(`${String.fromCodePoint(0x1F3EF)}`, -50, 50);
  context.restore();

  context.save();
  context.font = '50px sans-serif'
  context.translate(250, 200);
  context.fillText(`${String.fromCodePoint(0x1F3F0)}`, -50, 50);
  context.restore();

  context.save();
  context.globalCompositeOperation = 'source-in';
  context.fillStyle = 'black';
  context.fillRect(0, 0, 256, 240);
  context.globalCompositeOperation = 'source-over';
  context.restore();
  //0x1F3EF
  //0x1F3F0

  return {
    width: 256,
    height: 240,
    image_data:context.getImageData(0, 0, 256, 240),
  };
}