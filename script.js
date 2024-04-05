let isInvalidMove = 0;

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

    const isGameOver = (count, currentPlayer) => {
        /* NOTE: checkWinner() must run before second */
        /* if statement because it is possible to win the */
        /* game on the last try */

        /* checking for a winner */
        if (checkWinner()) {
            return console.log(`${currentPlayer.name} wins!`);
        }

        /* checking to see if maximum number of turns have been played */
        if (count === 9) {
            return console.log("It is a draw!");
        }

        return;
    };

    const playGame = (row, col) => {
        let currentPlayer = activePlayer;
        count++;

        console.log(`${currentPlayer.name}'s move.`);
        console.log(board.playMove(row, col, currentPlayer.token));

        isGameOver(count, currentPlayer);

        if (isInvalidMove === 0) {
            switchActivePlayer();
        }

        isInvalidMove = 0;
    };

    return {
        playGame,
        getActivePlayer,
    }
};

const playTicTacToe = () => {
    const grid_item = document.querySelectorAll(".grid-item");

    const game = gameController();

    grid_item.forEach((cell) => {
        cell.addEventListener("click", () => {
            let column = cell.dataset.column;
            let row = cell.dataset.row;

            game.playGame(row, column);

            if (game.getActivePlayer().token === 1) {
                cell.textContent = "O";
            } else {
                cell.textContent = "X";
            }
        });
    });
}

const resetBoard = () => {
    const grid_item = document.querySelectorAll(".grid-item");

    grid_item.forEach((cell) => {
        cell.textContent = " ";
    });
};