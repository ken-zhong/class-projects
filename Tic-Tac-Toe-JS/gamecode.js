class Game {
  constructor(board, p1, p2){
    this.board = board,
    this.p1 = p1
    this.p2 = p2
    board.game = this
  }

  newGame(){
    $("#new-game-btn").removeClass("hide")
  }

  playTurn(mark){
    if(mark === "X"){
      let player = this.p2
      setTimeout(()=>{ player.getMove() }, 600)
    } else {
      this.p1.getMove()
    }
  }
}

class Board {
  constructor(){
    this.grid = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ]
  }

  placeMark(move, mark){
    let grid = this.grid
    let x = move[0]
    let y = move[1]
    grid[y][x] = mark
  }

  updateBoard(move, mark){
    this.placeMark(move, mark)
    let y = move[0].toString()
    let x = move[1].toString()
    let id = "#"+x+y
    $(id).text(mark)
    if(this.checkWinner()){
      let winner = this.checkWinner()
      if(winner === "X"){
        $("#text-box").text("Congrats, you won! Play again?")
      } else {
        $("#text-box").text("Oops, you lost! Play again?")
      }
      this.game.newGame()
    } else if(this.over()){
      $("#text-box").text("Tie game! That's common for Tic Tac Toe. Play again?")
      this.game.newGame()
    } else {
      this.game.playTurn(mark)
    }
  }

  over(){
    let full = true
    let grid = this.grid
    grid.forEach((row)=>{
      row.forEach((el)=>{
        if(el === ""){
          full = false
        }
      })
    })
    if(full){
      return true
    } else {
      return false
    }
  }

  checkWinner(){
    //check the three horizontals first
    let grid = this.grid
    for(let x = 0; x < 3; x++){
        if(grid[x][0] === grid[x][1] && grid[x][1] === grid[x][2]){
          if(grid[x][0] !== ""){
            return grid[x][0] //returns the mark of the winner
          }
        }
    }
    //now check the 3 verticals
    for(let y = 0; y < 3; y++){
        if(grid[0][y] === grid[1][y] && grid[1][y] === grid[2][y]){
          if(grid[0][y] !== ""){
            return grid[0][y] //returns the mark of the winner
          }
        }
    }
    //now check the diagonals
    if(grid[0][0]===grid[1][1] && grid[1][1]===grid[2][2]){
        if(grid[1][1] !== ""){
          return grid[1][1]
        }
    }else if(grid[0][2] === grid[1][1] && grid[1][1]===grid[2][0]){
      if(grid[1][1] !== ""){
        return grid[1][1]
      }
    }
    // returns false otherwise
    return false
  }

}

class HumanPlayer {
  constructor(board){
    this.mark = "X"
    this.board = board
  }
  getMove(){
    let move = []
    let board = this.board
    let mark = this.mark
    $(".grid").each(function(){
      $(this).on("click", ()=>{
        let id = $(this).attr("id")
        let y = parseInt(id[0])
        let x = parseInt(id[1])
        if($("#"+id).text() === ""){
          move = [x, y]
          console.log(id)
          board.updateBoard(move, mark)
          $(".grid").off()
        }
      })
    })
  }
}

class AIPlayer{
  constructor(board){
    this.board = board
    this.mark = "O"
  }

  getMove(){
    let move = this.getRandomMove()
    this.board.updateBoard(move, this.mark)
  }

  getRandomMove(){
    let grid = this.board.grid
    let possibleMoves = []
    grid.forEach((row, y)=>{
      row.forEach((el, x)=>{
        if(el === "" ){
          possibleMoves.push([x, y])
        }
      })
    })
    return possibleMoves[Math.floor(Math.random()*possibleMoves.length)]
  }
}

var board = new Board()
var bob = new AIPlayer(board)
var hum = new HumanPlayer(board)
var game = new Game(board, hum, bob)
game.playTurn()
