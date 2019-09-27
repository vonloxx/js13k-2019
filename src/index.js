import compose from './lib/compose';
import renderer from './lib/renderer';
import Game from './components/game';

import loadingScene from './scenes/loading';
import gameScene from './scenes/game';
import gameOverScene from './scenes/game-over';
import nyanCatScene from './scenes/nyan-cat';

import spritesheetImage from './assets/spritesheet.png';
import zyxplayLogo from './assets/zyxplay.png';
import background from './assets/background';
import clouds from './assets/clouds';
import sun from './assets/sun';

const ctx = c.getContext('2d');

const game = compose(Game)({
  state: {
    scenes: {
      loading: loadingScene,
      game: gameScene,
      gameOver: gameOverScene,
      nyanCat: nyanCatScene
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
    background: { type: 'dithered', data: background(ctx) },
    clouds: { type: 'dithered', data: clouds(ctx) },
    sun: { type: 'dithered', data: sun(ctx) },
    spritesheet: { type: 'image', data: spritesheetImage },
    zyxplay: { type: 'image', data: zyxplayLogo },
  },
  onready: ({setState, state}) => {
    game.setScene('game');
  },
});

game.start();
