const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("statusText");
const resetBtn = document.getElementById("resetBtn");
const scoreXElement = document.getElementById("scoreX");
const scoreOElement = document.getElementById("scoreO");
const scoreDrawElement = document.getElementById("scoreDraw");

let board; // array of 9
let currentPlayer;
let running;
let scoreX = 0;
let scoreO = 0;
let scoreDraw = 0;

const winningCombos = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // cols
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6],
];

function initGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    running = true;
    statusText.textContent = `Player ${currentPlayer}'s turn`;

    cells.forEach((cell) => {
        cell.textContent = "";
        cell.classList.remove("taken", "win");
        cell.addEventListener("click", cellClicked);
    });

    updateScores();
}

function cellClicked(e) {
    const cell = e.target;
    const index = cell.getAttribute("data-index");

    if (!running || board[index] !== "") {
        return;
    }

    updateCell(cell, index);
    checkWinner();
}

function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");
}

function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;
    let winningCells = [];

    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            winningCells = combo;
            break;
        }
    }

    if (roundWon) {
        running = false;
        highlightWin(winningCells);
        statusText.textContent = `Player ${currentPlayer} wins! 🎉`;
        if (currentPlayer === "X") {
            scoreX++;
        } else {
            scoreO++;
        }
        updateScores();
    } else if (!board.includes("")) {
        running = false;
        statusText.textContent = "It's a draw 🤝";
        scoreDraw++;
        updateScores();
    } else {
        switchPlayer();
    }
}

function highlightWin(cellsIndexes) {
    cellsIndexes.forEach((i) => {
        cells[i].classList.add("win");
    });
}

function updateScores() {
    scoreXElement.textContent = scoreX;
    scoreOElement.textContent = scoreO;
    scoreDrawElement.textContent = scoreDraw;
}

resetBtn.addEventListener("click", () => {
    initGame();
});

// Start game on load
initGame();
