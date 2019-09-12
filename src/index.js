import compose from './lib/compose';
import renderer from './lib/renderer';
import Game from './components/game';
import Scene from './components/scene';
import Component from './components/component';

import loadingScene from './scenes/loading';
// import menuScene from './scenes/menu';
import gameScene from './scenes/game';

// import mainSong from './assets/mainsong';
// import nyan from './assets/nyan';
import spritesheetImage from './assets/spritesheet.png';
import background from './assets/background';
import clouds from './assets/clouds';
import sun from './assets/sun';
import backgroundMontains from './assets/montains-bg';
import title from './assets/title';
// import audio from './assets/audio-tracks';

const ctx = c.getContext('2d');

const part = {
  states: {
    idle: {
      x: 0,
      y: 0,
      angle: 0,
      speed: 0.5,
      animation: 'once',
    },
    walking: {
      
    },

  }
};

const test = compose(Component)({
  state: {
    x: 100,
    y: 100,
    angle: 45,
    dir: 1,
    speed: 0.5,
  },
  update(props) {
    const { state } = props;
    state.angle === 45 && (state.dir = -1);
    state.angle === -45 && (state.dir = 1);
    state.angle += state.dir * state.speed;
  },
  render(props) {
    const { context, state } = props;
    context.sv();
    context.tr(state.x, state.y);
    context.sc(1, 1);
    context.rt(state.angle * Math.PI / 180);
    context.r(-5, 0, 10, 20);
    context.r(-4, 19, 8, 3);
    context.ro();
    // context.t(`Test entity`, 10, 10, {stroke: 2});
  }
});

const testScene = ({gameState}) => {
  return compose(Scene)({
    state: {
      entities: [ test ],
    },
    render(props) {
      const { context } = props;
      context.t(`Test scene`, 10, 30, {stroke: 2});  
    },
  })
};

const game = compose(Game)({
  state: {
    scenes: {
      loading: loadingScene,
      // menu: menuScene,
      game: gameScene,
      // test: testScene,
    },
    // currentScene: loadingScene(),
    renderer: renderer({
      context: ctx,
    }),
  },
  assets: {
    // main: { type: 'song', data: mainSong },
    // audio: { type: 'audio', data: audio },
    // nyan: { type: 'song', data: nyan },
    title: { type: 'dithered', data: title(ctx) },
    background: { type: 'dithered', data: background(ctx) },
    clouds: { type: 'dithered', data: clouds(ctx) },
    sun: { type: 'dithered', data: sun(ctx) },
    backgroundMontains: { type: 'dithered', data: backgroundMontains(ctx) },
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
    game.setScene('game');
  },
});

game.start();
