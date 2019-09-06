import compose from '../lib/compose';
// import Song from './song';
import Image from './image';
import Spritesheet from './spritesheet';
// import Audio from './audio';

export default data => {
  const processors = {
    // song: (data) => {
    //   return compose(Song)(data);
    // },

    spritesheet: (data) => {
      return compose(Spritesheet)(data);
    },

    image: data => {
      return compose(Image)(data);
    },

    // audio: data => {
    //   return compose(Audio)(data);
    // },

    dithered: data => {
      const { width, height, image_data} = data;
      const cTemp = document.createElement('canvas');
      cTemp.width = width;
      cTemp.height = height;
      const context = cTemp.getContext('2d');
      const imgData = new ImageData(width, height); //context.createImageData(data);
      imgData.data.set(image_data);
      context.putImageData(imgData, 0, 0);
      return compose(Image)(cTemp.toDataURL());
    },
  }

  const assets = {};
  Object.entries(data).forEach(entry => {
    assets[entry[0]] = processors[entry[1].type](entry[1].data);
  });

  return {
    getAsset(id) {
      return assets[id];
    },
  };
}