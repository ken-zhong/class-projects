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
    // returns winning mark if there's a winner, otherwise return false
    let grid = this.grid
    let verticals = this.transposeGrid()
    let diags = [[grid[0][0], grid[1][1], grid[2][2]], [grid[0][2], grid[1][1], grid[2][0]]]
    let checkGrid = grid.concat(verticals, diags)

    for(let i = 0; i < checkGrid.length; i++){
      let row = checkGrid[i]
      if(row[1] === row[2] && row[2] == row[0]){
        if(row[1]){
          return row[1]
        }
      }
    }
    return false
  }


  transposeGrid(){
    let grid = this.grid
    let result = grid[0].map((col, i)=>{
      return grid.map((row)=>{
        return row[i]
      })
    })
    return result
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
    var move
    if(this.getWinningMove("O")){
      move = this.getWinningMove("O")
    } else if(this.getWinningMove("X")){
      move = this.getWinningMove("X")
    } else{
      move = this.getRandomMove()
    }
    this.board.updateBoard(move, this.mark)
  }

  getWinningMove(mark){
    let grid = this.board.grid
    let tGrid = this.board.transposeGrid()
    //check columns
    for(let i = 0; i<3; i++){
      let count = grid[i].reduce((sum, el)=>{
        if(el === mark){
          return sum += 1
        } else {
          return sum
        }
      }, 0)
      if(count === 2 && grid[i].indexOf("") >= 0 ){
        let x = grid[i].indexOf("")
        return [x, i]
      }
    }
    for(let i = 0; i<3; i++){
      let count = tGrid[i].reduce((sum, el)=>{
        if(el === mark){
          return sum += 1
        } else {
          return sum
        }
      }, 0)
      if(count === 2 && tGrid[i].indexOf("") >= 0 ){
        let y = tGrid[i].indexOf("")
        return [i, y]
      }
    }
    if(this.checkDiags(mark)){
      return this.checkDiags(mark)
    }
    return false
  }

  checkDiags(mark){
    let grid = this.board.grid
    let diag1 = [[0, 0],[1, 1],[2, 2]]
    let d1Marks = [grid[0][0], grid[1][1], grid[2][2]]
    let diag2 = [[2, 0],[1, 1],[0, 2]]
    let d2Marks = [grid[0][2], grid[1][1], grid[2][0]]

    let count = d1Marks.reduce((sum, el)=>{
      if(el === mark){
        return sum += 1
      } else {
        return sum
      }
    }, 0)
    if(count === 2 && d1Marks.indexOf("") >= 0){
      return diag1[d1Marks.indexOf("")]
    }
    count = d2Marks.reduce((sum, el)=>{
      if(el === mark){
        return sum += 1
      } else {
        return sum
      }
    }, 0)
    if(count === 2 && d2Marks.indexOf("") >= 0){
      return diag2[d2Marks.indexOf("")]
    }
    return false
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
