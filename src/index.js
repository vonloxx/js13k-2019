import compose from './lib/compose';
import renderer from './lib/renderer';
import Game from './components/game';
import Scene from './components/scene';
import Component from './components/component';

import loadingScene from './scenes/loading';
// import menuScene from './scenes/menu';
import gameScene from './scenes/game';
import gameOverScene from './scenes/game-over';

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

const game = compose(Game)({
  state: {
    scenes: {
      loading: loadingScene,
      game: gameScene,
      gameOver: gameOverScene,
    },
    renderer: renderer({
      context: ctx,
    }),
    gameOver(){
      game.state.maxHeight < game.state.height && (game.state.maxHeight = game.state.height);
      game.state.highScore < game.state.score && (game.state.highScore = game.state.score);
      game.setScene('gameOver');
    },
    startGame(){
      game.state.score = 0;
      game.setScene('game');
    },
    score: 0,
    highScore: 0,
    height: 0,
    maxHeight: 0,
    currentHeight: 0,
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
  },
  onready: ({setState, state}) => {
    game.setScene('game');
  },
});

game.start();
