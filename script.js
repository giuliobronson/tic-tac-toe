const modal = document.getElementById("modal");
const tiles = Array.from(document.getElementsByClassName("tile"));
const gameState = Array(9).fill("");
let active = true;
let currentPlayer = "X";
let winningConditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

function handlePlayerChange() {
	currentPlayer = currentPlayer == "X" ? "O" : "X";
}

function handleModal(message) {
    document.querySelector(".modal-content > p").innerHTML = message;
    modal.style.display = "block";
}

function handleDisplay() {
    const display = document.getElementById("display-player");
    display.className = "";
    display.classList.add("player" + currentPlayer);
    display.innerHTML = currentPlayer;
}

function handleResultVerification() {
	let endGame = false;
    let fullBoard = true;

	for (let i = 0; i < 8; i++) {
		let a = gameState[winningConditions[i][0]];
		let b = gameState[winningConditions[i][1]];
		let c = gameState[winningConditions[i][2]];
		if (a == "" || b == "" || c == "") {
            fullBoard = false;
            continue;
        }
		if (a == b && a == c) {
			endGame = true;
			break;
		}
	}

	if (endGame) {
        active = false;
        const message = currentPlayer + " Wins";
        handleModal(message);
        return;
	} 
    if (fullBoard) {
        const message = "Draw";
        handleModal(message);
        return;
    }

    handlePlayerChange();
    handleDisplay();
}

function handlePlayedCell(clickedCell, cellID) {
    gameState[cellID] = currentPlayer;
    clickedCell.classList.add("player" + currentPlayer);
	clickedCell.innerHTML = currentPlayer;
	handleResultVerification();
}

function handleClick() {
	cellID = this.id;
	if (gameState[cellID] != "" || !active) return;
    handlePlayedCell(this, cellID);
}

function resetGame() {
    tiles.forEach(element => {
        element.className = "tile";
        element.innerHTML = "";
    });
    gameState.fill("");
    active = true;
    currentPlayer = "X";
    handleDisplay();
}

tiles.forEach(element => element.addEventListener("click", handleClick));
document.getElementById("reset").addEventListener("click", resetGame);
modal.addEventListener("click", () => modal.style.display = "none");