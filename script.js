let boxes = document.querySelectorAll(".box");
let resetbutton = document.querySelector("#Reset");
let newgame = document.querySelector("#newgame");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#message");
let rulesButton = document.querySelector("#rules");
let turnDisplay = document.querySelector("#turn");

let TurnO = true;  // true for Player O's turn, false for Player X's turn
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

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (gameOver || box.innerText !== "") return;

        // Update the box with the player's symbol
        box.innerText = TurnO ? "O" : "X";
        box.disabled = true;

        checkWinner();

        if (!gameOver) {
            TurnO = !TurnO;  // Toggle turn
            showTurn();  // Update turn message
        }
    });
});

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
    msgContainer.classList.remove("hide");
    disableBoxes();
    gameOver = true;
    showTurn();  // Hide turn message when the game is over
};

// Show draw message
const showDraw = () => {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
    gameOver = true;
    showTurn();  // Hide turn message when the game is over
};

// Show whose turn it is
const showTurn = () => {
    if (!gameOver) {
        turnDisplay.innerText = TurnO ? "Player O's turn" : "Player X's turn";
    } else {
        turnDisplay.innerText = '';  // Clear the turn message when the game ends
    }
};

// Check if there is a winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val && pos1val === pos2val && pos2val === pos3val) {
            showWinner(pos1val);
            return;
        }
    }

    // Check for a draw
    let isDraw = true;
    boxes.forEach((box) => {
        if (box.innerText === "") {
            isDraw = false;
        }
    });

    if (isDraw) {
        showDraw();
    }
};

// Rules button event
rulesButton.addEventListener("click", () => {
    window.location.href = "rules.html";  // Redirect to rules.html
});

// Add event listeners for other buttons (new game, reset)
newgame.addEventListener("click", resetGame);
resetbutton.addEventListener("click", resetGame);

// Show the initial turn when the page loads
showTurn();  // Show the initial player's turn when the page loads
