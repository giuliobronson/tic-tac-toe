const tiles = Array.from(document.getElementsByClassName("tile"));
const gameState = Array(9).fill('');
var currentPlayer = "X";

function handlePlayerChange() {
    currentPlayer = currentPlayer == "X" ? "O" : "X"; 
}

function handleClick() {
    elementID = this.id;
    if(gameState[elementID] != '') return;
    gameState[elementID] = currentPlayer;
    this.classList.add("player" + currentPlayer);
    this.innerHTML = currentPlayer;
    handlePlayerChange();
}


tiles.forEach(element => element.addEventListener('click', handleClick));
