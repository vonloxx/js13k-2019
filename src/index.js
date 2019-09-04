import compose from './lib/compose';
import renderer from './lib/renderer';
import Game from './components/game';

import loadingScene from './scenes/loading';
import menuScene from './scenes/menu';
import gameScene from './scenes/game';

import mainSong from './assets/mainsong';
import nyan from './assets/nyan';
import spritesheetImage from './assets/spritesheet.png';
import background from './assets/background';
import clouds from './assets/clouds';
import sun from './assets/sun';
import backgroundMontains from './assets/montains-bg';
import title from './assets/title';
import audio from './assets/audio-tracks';

const game = compose(Game)({
  state: {
    scenes: { loading: loadingScene, menu: menuScene, game: gameScene },
    // currentScene: loadingScene(),
    renderer: renderer({
      context: document.getElementById('c').getContext('2d'),
    }),
  },
  assets: {
    main: { type: 'song', data: mainSong },
    audio: { type: 'audio', data: audio },
    nyan: { type: 'song', data: nyan },
    title: { type: 'dithered', data: title(document.getElementById('c').getContext('2d')) },
    background: { type: 'dithered', data: background(document.getElementById('c').getContext('2d')) },
    clouds: { type: 'dithered', data: clouds(document.getElementById('c').getContext('2d')) },
    sun: { type: 'dithered', data: sun(document.getElementById('c').getContext('2d')) },
    backgroundMontains: { type: 'dithered', data: backgroundMontains(document.getElementById('c').getContext('2d')) },
    spritesheet: { type: 'image', data: spritesheetImage },
    // spritesheet: { type: 'spritesheet', data: {
    //   width: 16,
    //   height: 16,
    //   imageData: spritesheetImage,
    //   animations: {
    //     idle: {
    //       frames: [1],
    //     },
    //     walk: {
    //       frames: [1, 2, 3, 4, 5],
    //       speed: 5,
    //       direction: 'alternate',
    //     },
    //     falling: {
    //       frames: [6],
    //     },
    //     ground: {
    //       frames: [7],
    //     },
    //     wall: {
    //       frames: [8],
    //     },
    //     pipe: {
    //       frames: [9],
    //     },
    //     snake: {
    //       frames: [10, 11],
    //       speed: 20,
    //     },
    //     star: {
    //       frames: [12, 13, 14, 15, 16],
    //       speed: 15,
    //       direction: 'once',
    //     },
    //   }
    // } },
  },
  onready: ({setState, state}) => {
    game.setScene('menu');
  },
});

// console.log(game.state.assets.getAsset('background'));
game.start();
