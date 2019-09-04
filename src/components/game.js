/* start-test-code */
import Stats from '../lib/stats';
/* end-test-code */

import Assets from './assets';

export default (wrapped) => {
  /* start-test-code */
  const stats = new Stats();
  /* end-test-code */

  const {
    state = {
      scenes: {},
      assets: {},
      renderer: null,
      currentScene: null,
    },
    assets = {},
    onload = () => {},
    onready = () => {},
  } = wrapped;

  const
    fps = 60,
    delta = 1000 / fps,
    keyMap = setKeyMap();

  let
    rafId,
    accumulator = 0,
    lastTimestamp = 0,
    pressedKeys = {};
  
  function setState(props) {
    Object.entries(props).forEach(entry => {
      state[entry[0]] = entry[1];
    });
  };
  
  function loop(timestamp) {
    const dt = timestamp - lastTimestamp;
    const context = state.renderer; 
    lastTimestamp = timestamp;

    if (dt > 1000) {
      return;
    }
  
    accumulator += dt;

    while (accumulator >= delta) {
      accumulator -= delta;
    }
    /* start-test-code */
    stats.begin();
    /* end-test-code */

    // state.currentScene && state.scenes[state.currentScene].update({dt});
    state.currentScene && state.currentScene.update({dt, isKeyPressed});

    context.clear();
    context.save();
    context.rect(0, 0, 512, 480, {fill: '#036'});

    // state.currentScene && state.scenes[state.currentScene].render({context: state.renderer});
    state.currentScene && state.currentScene.render({context: state.renderer, gameState: state});

    context.restore();

    /* start-test-code */
    stats.end();
    /* end-test-code */

    rafId = requestAnimationFrame(loop);
  }

  function setKeyMap() {
    const keyMap = {
      13: 'enter',
      27: 'esc',
      32: 'space',
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down',
    };
  
    // alpha keys
    for (let i = 0; i < 26; i++) {
      keyMap[65+i] = (10 + i).toString(36);
    }

    // numeric keys
    for (let i = 0; i < 10; i++) {
      keyMap[48+i] = ''+i;
    }

    return keyMap;
  }

  function isKeyPressed(key) {
    if (key) {
      return !!pressedKeys[key];      
    }

    if (Object.entries(pressedKeys).length > 0) {
      return true;
    }
  }

  /* start-test-code */
  stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild( stats.dom );
  /* start-test-code */

  const assetsLoader = new Worker('./assets-loader.js');
  assetsLoader.onmessage = function(e) {
    state.assets = Assets(e.data);
    onready({state, setState});
  }
  assetsLoader.postMessage(assets);

  // state.currentScene && state.scenes[state.currentScene].init();
  state.currentScene = state.scenes.loading({gameState: state});

  addEventListener('keydown', ev => { pressedKeys[keyMap[ev.which]] = true; } );
  addEventListener('keyup', ev => { pressedKeys[keyMap[ev.which]] = false; delete pressedKeys[keyMap[ev.which]];  } );
  addEventListener('blur', () => pressedKeys = {});

  return {
    ...wrapped,

    setScene(scene) {
      state.currentScene = state.scenes[scene]({gameState: state});
      // state.scenes[scene].init({state});
    },

    start(){
      rafId = requestAnimationFrame(loop);
    },

    stop() {
      cancelAnimationFrame(rafId);
    },
  };
};