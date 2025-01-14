let boxes = document.querySelectorAll(".box");
let resetbutton = document.querySelector("#Reset");
let newgame = document.querySelector("#newgame");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#message");
let rulesButton = document.querySelector("#rules");
let turnDisplay = document.querySelector("#turn");

let TurnO = true;  // true for Player O's turn, false for Player X's turn (Computer's turn)
let gameOver = false;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

let board = ["", "", "", "", "", "", "", "", ""];

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (gameOver || box.innerText !== "") return;

        // Player O's move
        box.innerText = "O";
        board[index] = "O";
        checkWinner();
        if (!gameOver) {
            TurnO = !TurnO;
            showTurn();
            if (!gameOver) computerMove();  // Computer plays after human move
        }
    });
});

// Minimax Algorithm to calculate the best move for the computer
const minimax = (board, depth, isMaximizing) => {
    const scores = { "O": -10, "X": 10, "draw": 0 };

    // Check for the winner
    const winner = checkWinnerForBoard(board);
    if (winner !== null) {
        return scores[winner];
    }

    if (isMaximizing) {
        let best = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = "X";  // Computer's move
                best = Math.max(best, minimax(board, depth + 1, false));
                board[i] = "";  // Undo the move
            }
        }
        return best;
    } else {
        let best = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = "O";  // Player's move
                best = Math.min(best, minimax(board, depth + 1, true));
                board[i] = "";  // Undo the move
            }
        }
        return best;
    }
};

// Function to check the winner for a given board state
const checkWinnerForBoard = (board) => {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];  // Return "X" or "O"
        }
    }
    if (board.every(cell => cell !== "")) return "draw";
    return null;
};

// Computer makes the best move
const computerMove = () => {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            board[i] = "X";  // Computer's move
            let score = minimax(board, 0, false);
            board[i] = "";  // Undo the move

            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }

    boxes[move].innerText = "X";  // Update the board with the computer's move
    board[move] = "X";  // Mark the board with the computer's move
    checkWinner();
};

// Disable all boxes after the game ends
const disableBoxes = () => {
    boxes.forEach((box) => box.disabled = true);
};

// Enable all boxes for a new game
const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
    board = ["", "", "", "", "", "", "", "", ""];
};

// Reset the game
const resetGame = () => {
    TurnO = true;
    gameOver = false;
    enableBoxes();
    msgContainer.classList.add("hide");
    showTurn();  // Show whose turn it is when resetting the game
};

// Show winner message
const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgContainer.classList.remove("hide");  // Show the popup
    disableBoxes();
    gameOver = true;
    showTurn();  // Hide turn message when the game is over
};

// Show draw message
const showDraw = () => {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");  // Show the popup
    disableBoxes();
    gameOver = true;
    showTurn();  // Hide turn message when the game is over
};

// Show Player O's turn (for the player)
const showTurn = () => {
    if (!gameOver) {
        turnDisplay.innerText = "Player O's turn";  // Always display Player O's turn
    } else {
        turnDisplay.innerText = '';  // Clear the turn message when the game is over
    }
};

// Check if there is a winner
const checkWinner = () => {
    const winner = checkWinnerForBoard(board);
    if (winner !== null) {
        if (winner === "X") {
            showWinner("Computer");
        } else if (winner === "O") {
            showWinner("Player");
        } else {
            showDraw();
        }
    }
};

// Rules button event
rulesButton.addEventListener("click", () => {
    window.location.href = "rules.html";  // Redirect to rules.html
});

// Add event listeners for other buttons (new game, reset)
newgame.addEventListener("click", resetGame);
resetbutton.addEventListener("click", resetGame);

document.getElementById('goHome').addEventListener('click', function() {
    window.location.href = 'index.html';  // Redirect to the homepage (index.html)
});


// Show the initial turn when the page loads
showTurn();  // Show the initial player's turn when the page loads
