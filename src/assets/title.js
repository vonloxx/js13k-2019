import renderer from '../lib/renderer';

export default (context) => {
  const ctx = renderer({context});
  const gradient = context.createLinearGradient(0, 0, 0, 100);
  // gradient.addColorStop(0, 'red');
  // gradient.addColorStop(1 / 4, 'orange');
  // gradient.addColorStop(1 / 2, 'yellow');
  // gradient.addColorStop(3 / 4, 'white');
  // gradient.addColorStop(1, 'black');
  gradient.addColorStop(0, 'red');
  gradient.addColorStop(1 / 6, 'orange');
  gradient.addColorStop(2 / 6, 'yellow');
  gradient.addColorStop(3 / 6, 'green');
  gradient.addColorStop(4 / 6, 'blue');
  gradient.addColorStop(5 / 6, 'indigo');
  gradient.addColorStop(1, 'violet');

  ctx.clear();

  ctx.text(`Bring it`, 0, 0, {size: 5, fill: '#000'}),
  ctx.text(`back`, -5, 25, {size: 10, fill: '#000'})
  // const imgData = context.getImageData(0, 0, 256, 240);

  context.globalCompositeOperation = 'source-in';
  context.fillStyle = gradient;
  context.fillRect(0, 0, 256, 100);

  // context.putImageData(imgData, 0, 0);

  context.globalCompositeOperation = 'source-over';

  context.fillStyle = 'rgba(255, 0, 0, 0.5)';
  context.fillRect(-20, 200, 256, 40);
  context.fillStyle = '#fff';
  context.font = '30px sans-serif'
  context.fillText(`${String.fromCodePoint(0x1F3AE)}`, 20, 232);
  ctx.text(`JS13K Edition`, 62, 214, {size: 2, fill: '#fff', stroke: 2})

  return {
    width: 256,
    height: 240,
    image_data:context.getImageData(0, 0, 256, 240),
  };
}