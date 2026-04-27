const row_1 = document.getElementById("row-1"),
  row_2 = document.getElementById("row-2"),
  row_3 = document.getElementById("row-3"),
  game_layout = document.getElementById("game-layout");
winner_banner = document.getElementById("winner-banner");
winner_text_container = document.getElementById("winner-player-symbol");
player_container = document.getElementById("player");

function isWin(symbol) {  
  return getBoardValues().some((value) => value.every((val) => val == symbol));
}

function getBoardValues(){
  let col_1 = row_1.getElementsByTagName("td")[0].innerText,
    col_2 = row_1.getElementsByTagName("td")[1].innerText,
    col_3 = row_1.getElementsByTagName("td")[2].innerText;
  let col_4 = row_2.getElementsByTagName("td")[0].innerText,
    col_5 = row_2.getElementsByTagName("td")[1].innerText,
    col_6 = row_2.getElementsByTagName("td")[2].innerText;
  let col_7 = row_3.getElementsByTagName("td")[0].innerText,
    col_8 = row_3.getElementsByTagName("td")[1].innerText,
    col_9 = row_3.getElementsByTagName("td")[2].innerText;
  return winningPattern = [
    [col_1, col_2, col_3], // 1st row
    [col_1, col_4, col_7], // 1st col
    [col_4, col_5, col_6], // 2nd row
    [col_2, col_5, col_8], // 2nd col
    [col_7, col_8, col_9], // 3rd row
    [col_3, col_6, col_9], // 3rd col
    [col_1, col_5, col_9], // left top diagonal
    [col_3, col_5, col_7], // right top diagonal
  ];
}

function isBoardFull(){
  return getBoardValues().every((value) => value.every((val) => val));
}

function resetGame() {
  for (let i = 0; i < 3; i++) {
    row_1.getElementsByTagName("td")[i].innerText = "";
    row_2.getElementsByTagName("td")[i].innerText = "";
    row_3.getElementsByTagName("td")[i].innerText = "";
  }
}

function insert() {
  let symbol = document.getElementById("player-symbol").innerText;
  if (this.innerText) {
    return;
  }
  this.innerText = symbol;
  if (isWin(symbol)) {
    document.getElementById(`score-${symbol}`).innerText =
      parseInt(document.getElementById(`score-${symbol}`).innerText) + 1;
    playAgain.style.display = "inline-block";
    winnerBanner(symbol);
  }
  else if(isBoardFull()){
    playAgain.style.display = "inline-block";
    winnerBanner(symbol, true);
  }
  else {
    changePlayerChance(symbol);
  }
}

function startGame() {
  this.style.display = "none";
  for (let i = 1; i < 4; i++) {
    for (let j = 1; j < 4; j++) {
      let tab = document.getElementById(`row-${i}`).getElementsByTagName(`td`)[
        j - 1
      ];
      tab.addEventListener("click", insert);
    }
  }
  player_container.style.display = "block";
  game_layout.style.display = "block";
  changePlayerChance("O");
}

function changePlayerChance(symbol) {
  let complimentSymbol = symbol == "X" ? "O" : "X";
  document.getElementById("player-symbol").innerText = complimentSymbol;
  document.getElementById(`score-card-label-${symbol}`).style.borderBottom =
    "2px solid darkslategrey";
  document.getElementById(
    `score-card-label-${complimentSymbol}`,
  ).style.borderBottom = "4px solid cyan";
}

function playAgainHandler() {
  this.style.display = "none";
  winner_banner.style.display = "none";
  game_layout.style.display = "block";
  player_container.style.display = "block";
  resetGame();
  changePlayerChance(symbol);
}

function winnerBanner(symbol, isDraw) {
  game_layout.style.display = "none";
  winner_banner.style.display = "block";
  player_container.style.display = "none";
  winner_text_container.innerText = isDraw? `Draw Match!` :`Player ${symbol} is Winner`;
}

const startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", startGame);

const playAgain = document.getElementById("play-again");
playAgain.addEventListener("click", playAgainHandler);
playAgain.style.display = "none";
player_container.style.display = "none";
game_layout.style.display = "none";