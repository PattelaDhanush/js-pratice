const row_1 = document.getElementById("row-1"),
  row_2 = document.getElementById("row-2"),
  row_3 = document.getElementById("row-3"),
  game_layout = document.getElementById("game-layout");
winner_banner = document.getElementById("winner-banner");
winner_text_container = document.getElementById("winner-player-symbol");
player_container = document.getElementById("player");

const startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", startGame);
const playAgain = document.getElementById("play-again");
playAgain.addEventListener("click", playAgainHandler);
playAgain.style.display = "none";
player_container.style.display = "none";
game_layout.style.display = "none";

function getImageBySymbol(symbol, id){
  const img = document.createElement('img');
  img.src = `images/${symbol.toUpperCase()}_icon.png`;
  img.alt = symbol.toUpperCase();
  img.height = 30;
  img.width = 30;
  if(id)
    img.id=symbol.toUpperCase();
  return img;
}

function isWin(symbol) {  
  return getBoardValues().some((value) => value.every((val) => val == symbol));
}

function getBoardValues(){
  let col_1 = row_1.getElementsByTagName("td")[0]?.querySelector("img")?.alt,
    col_2 = row_1.getElementsByTagName("td")[1]?.querySelector("img")?.alt,
    col_3 = row_1.getElementsByTagName("td")[2]?.querySelector("img")?.alt;
  let col_4 = row_2.getElementsByTagName("td")[0]?.querySelector("img")?.alt,
    col_5 = row_2.getElementsByTagName("td")[1]?.querySelector("img")?.alt,
    col_6 = row_2.getElementsByTagName("td")[2]?.querySelector("img")?.alt;
  let col_7 = row_3.getElementsByTagName("td")[0]?.querySelector("img")?.alt,
    col_8 = row_3.getElementsByTagName("td")[1]?.querySelector("img")?.alt,
    col_9 = row_3.getElementsByTagName("td")[2]?.querySelector("img")?.alt;
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

function removeChildImgTag(parent) {
  const child = parent.querySelector('img');
  if (child) {
      parent.removeChild(child);
  }
}

function resetGame() {
  for (let i = 0; i < 3; i++) {
    removeChildImgTag(row_1.getElementsByTagName("td")[i]);
    removeChildImgTag(row_2.getElementsByTagName("td")[i]);
    removeChildImgTag(row_3.getElementsByTagName("td")[i]);
  }
}

function insert() {
  let symbol = document.getElementById("player-symbol").querySelector("img").alt;
  if (this.getElementsByTagName('img').length) {
    return;
  }
  this.appendChild(getImageBySymbol(symbol));
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

function displayPlayerContainer(){
  player_container.style.display = "flex";
  player_container.style.justifyContent = "center";
  player_container.style.gap = "8px";
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
  displayPlayerContainer();
  game_layout.style.display = "block";
  changePlayerChance("O");
}

function changePlayerChance(symbol) {
  let complimentSymbol = symbol == "X" ? "O" : "X";
  const chanceContainer = document.getElementById("player-symbol");
  removeChildImgTag(chanceContainer);
  chanceContainer.appendChild(getImageBySymbol(complimentSymbol));
  document.getElementById(`score-card-label-${symbol}`).style.borderBottom =
    "2px solid darkslategrey";
  document.getElementById(
    `score-card-label-${complimentSymbol}`,
  ).style.borderBottom = "4px solid cyan";
}

function playAgainHandler() {
  this.style.display = "none";
  winner_text_container.replaceChildren();
  winner_banner.style.display = "none";
  game_layout.style.display = "block";
  displayPlayerContainer();
  resetGame();
  changePlayerChance("O");
}

function winnerBanner(symbol, isDraw) {
  game_layout.style.display = "none";
  winner_banner.style.display = "block";
  player_container.style.display = "none";
  if(isDraw){
    winner_text_container.innerText="Draw Match!"
  } else {
    const winnerContainer = document.createElement('div');
    const playerLabel = document.createElement('div');
    playerLabel.innerText = "Player";
    winnerContainer.appendChild(playerLabel);

    winnerContainer.appendChild(getImageBySymbol(symbol, "winner-player-img"))
    winnerContainer.style.display='flex';
    winnerContainer.style.justifyContent = "center";
    winnerContainer.style.gap = "8px";

    const winnerLabel = document.createElement('div');
    winnerLabel.innerText = "is Winner";
    winnerContainer.appendChild(winnerLabel);

    winner_text_container.appendChild(winnerContainer);
  }
}
