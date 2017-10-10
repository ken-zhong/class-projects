const HanoiView = require('./hanoi-view.js');
const HanoiGame = require('./game.js');

$( () => {
  const rootEl = $('.hanoi');
  const game = new HanoiGame();
  const view = new HanoiView(game, rootEl);
  
});
