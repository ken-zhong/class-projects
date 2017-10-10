class View{
  constructor(game, rootEl){
    this.game = game;
    this.rootEl = rootEl;
    this.setupTowers();
    this.bindHandlers();
    this.fromTower = null;

  }

  bindHandlers() {

    $( 'ul' ).on('click', (e)=> {
      let click = $(e.currentTarget).data("index");
      let tower = $(e.currentTarget);
      this.handleMove(click, tower);
    });

  }

  checkWinner() {
    if(this.game.isWon()){
      $('ul').off();
      $('li').addClass('winner');
      setTimeout(()=>{
        alert('Congrats! You won!');
      }, 10);
    }
  }

  handleMove(click, tower) {
    if (this.fromTower !== null ) {
      if (this.game.isValidMove(this.fromTower, click)) {
        this.game.move(this.fromTower, click);
        let disc = $(`.tower${this.fromTower} li:last-child`);
        $(`.tower${this.fromTower}`).remove(`.tower${this.fromTower} li:last-child`);
        tower.append(disc);
        this.checkWinner();
      } else {
        alert("invalid move!");
      }
      this.fromTower = null;
      $('ul').removeClass('selected');
    } else {
      this.fromTower = click;
      tower.addClass("selected");
    }
  }

  setupTowers() {
    for(let i = 0; i < 3; i++){
      let tower = $('<ul>');
      tower.addClass(`tower${i}`);
      tower.data('index', i);
      this.rootEl.append(tower);
    }

    for(let j = 3; j > 0; j--){
      let disc = $('<li>');
      disc.addClass(`disc${j}`);
      disc.data('size', j);
      $('.tower0').append(disc);
    }
  }
}


module.exports = View;
