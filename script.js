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

    const playGame = (row, col) => {
        let currentPlayer = activePlayer.token;

        console.log(`${activePlayer.name}'s move.`);
        console.log(board.playMove(row, col, currentPlayer));

        if (isInvalidMove === 0) {
            switchActivePlayer();
        }

        isInvalidMove = 0;
    };

    return {
        playGame,
    }
};