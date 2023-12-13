const gameBoard = document.getElementById("gameBoard");
const easterEgg = document.getElementById("easterEgg");
const easterEggImage = document.getElementById("easterEggImage");
const easterEggMusic = document.getElementById("easterEggMusic");
let board = Array(9).fill(null);
const players = ["X", "O"];
let currentPlayer = players[0];
let easterEggCounter = 0;

function initGame() {
    board.forEach((_, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", () => makeMove(index));
        gameBoard.appendChild(cell);
    });

    gameBoard.addEventListener("click", () => {
        easterEggCounter++;
        if (easterEggCounter === 10) {
            showEasterEgg();
        }
    });
}

function makeMove(index) {
    if (!board[index]) {
        board[index] = currentPlayer;
        updateBoard();
        if (checkWinner(currentPlayer)) {
            alert(`${currentPlayer} победил!`);
            resetGame();
        } else if (!board.includes(null)) {
            alert("Ничья!");
            resetGame();
        } else {
            currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
        }
    }
}

function updateBoard() {
    board.forEach((cell, index) => {
        gameBoard.children[index].textContent = cell;
    });
}

function checkWinner(player) {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winConditions.some(condition => condition.every(index => board[index] === player));
}

function resetGame() {
    board = Array(9).fill(null);
    currentPlayer = players[0];
    updateBoard();
    resetEasterEggCounter();
}

function resetEasterEggCounter() {
    easterEggCounter = 0;
    easterEgg.style.display = "none";
    easterEggImage.style.display = "none";
    easterEggMusic.pause();
    easterEggMusic.currentTime = 0;
}

function showEasterEgg() {
    easterEgg.style.display = "block";
    easterEggImage.style.display = "block";
    easterEggMusic.play();
}

initGame();
