let isInvalidMove = 0;
let p1Name = "";
let p2Name = "";

const boardGame = () => {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Square());
        }
    }

    const getBoard = () => board;

    const playMove = (row, col, player) => {
        if (board[row][col] === 1 || board[row][col] === 2) {
            console.log("Cell already taken!");
            isInvalidMove++;
            return;
        }

        if (row < 0 || col < 0 || row >= 3 || col >= 3) {
            console.log("Invalid move!");
            isInvalidMove++;
        } else {
            board[row][col] = player;
        }

        return getBoard();
    };

    return {
        getBoard,
        playMove,
    };
};

const Square = () => {
    let value = 0;

    return value;
};

const gameController = (playerOneName = "Player One", playerTwoName = "Player Two") => {
    const board = boardGame();
    let count = 0;
    const player = [
        {
            name: playerOneName,
            token: 1,
        },
        {
            name: playerTwoName,
            token: 2,
        },
    ];

    let activePlayer = player[0];

    const switchActivePlayer = () => {
        activePlayer = activePlayer === player[0] ? player[1] : player[0];
    };

    const getActivePlayer = () => activePlayer;

    const checkDiagnolWin = (gameBoard) => {
        return (gameBoard[0][0] !== 0 && gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2]) ||
            (gameBoard[0][2] !== 0 && gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0]);
    };

    const checkRowWin = (gameBoard, i) => {
        return gameBoard[i][0] !== 0 && gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][1] === gameBoard[i][2];
    };

    const checkColumnWin = (gameBoard, i) => {
        return gameBoard[0][i] !== 0 && gameBoard[0][i] === gameBoard[1][i] && gameBoard[1][i] === gameBoard[2][i];
    };

    const checkWinner = () => {
        const gameBoard = board.getBoard();

        /* diagnol win conditiion */
        if (checkDiagnolWin(gameBoard)) {
            return 1;
        }

        /* checking row and column win condition */
        for (let i = 0; i < 3; i++) {
            if (checkColumnWin(gameBoard, i) || checkRowWin(gameBoard, i)) {
                return 1;
            }
        }

        return 0;
    };

    const getCount = () => count;

    const playGame = (row, col) => {
        let currentPlayer = activePlayer;
        count++;

        board.playMove(row, col, currentPlayer.token);

        if (isInvalidMove === 0) {
            switchActivePlayer();
        }

        isInvalidMove = 0;
    };

    return {
        playGame,
        getActivePlayer,
        checkWinner,
        getCount,
    }
}

const getNameAndPlayGame = () => {
    const form = document.querySelector("form");
    const dialog = document.querySelector("dialog");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const playerOneName = document.querySelector("#player-one-name");
        const playeTwoName = document.querySelector("#player-two-name");

        p1Name = playerOneName.value;
        p2Name = playeTwoName.value;

        console.log("P1 name: ", p1Name);
        console.log("P2 name: ", p2Name);

        dialog.close();

        playTicTacToe(p1Name, p2Name);
    });
};

const playTicTacToe = (p1Name, p2Name) => {
    const gridItem = document.querySelectorAll(".grid-item");
    const winnerDisplay = document.querySelector(".winner-display");

    const game = gameController(p1Name, p2Name);

    gridItem.forEach((cell) => {
        cell.addEventListener("click", () => {
            if (!game.checkWinner() && cell.textContent === "") {
                let column = cell.dataset.column;
                let row = cell.dataset.row;

                game.playGame(row, column);

                if (game.getActivePlayer().token === 1) {
                    cell.textContent = "O";
                } else {
                    cell.textContent = "X";
                }

                /* checking winning condition */
                if (game.checkWinner()) {
                    return winnerDisplay.value = `${game.getActivePlayer().name} wins the game!`;
                } else if (game.getCount() === 9) {
                    return winnerDisplay.value = "It is a draw!";
                }
            }
        });
    });
}

const resetBoard = () => {
    const gridItem = document.querySelectorAll(".grid-item");
    gridItem.forEach(cell => {
        cell.textContent = "";
    });

    const winnerDisplay = document.querySelector(".winner-display");
    winnerDisplay.value = "";

    playTicTacToe(p1Name, p2Name);
};

const showDialog = () => {
    const dialog = document.querySelector("dialog");
    const clickedButton = document.querySelector(".button-row button:nth-child(1)");

    clickedButton.setAttribute("disabled", true);
    clickedButton.textContent = "-->";

    dialog.showModal();
};