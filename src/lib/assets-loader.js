import CPlayer from './audio-player';
import dither from './dither';

function generateSong(data) {
  const player = new CPlayer();
  player.init(data);

  while(player.generate() < 1) {
  }

  return player.createWave();
}

function generateImage(data) {
  const { width, height, image_data } = data;
  return dither.dither(image_data, width, height);
}

onmessage = function(e) {
  const assets = e.data;
  const result = {};

  Object.entries(assets).forEach(entry => {
    if (entry[1].type === 'song') {
      result[entry[0]] = {
        type: entry[1].type,
        data: generateSong(entry[1].data),
      };
    } else if (entry[1].type === 'dithered') {
      result[entry[0]] = {
        type: entry[1].type,
        data: {
          ...entry[1].data,
          image_data: generateImage(entry[1].data),
        },
      };
    } else {
      result[entry[0]] = entry[1];
    }
  });

  postMessage(result);
}
