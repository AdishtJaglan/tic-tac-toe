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

    const checkWinner = () => {
        const gameBoard = board.getBoard();

        /* diagnol win conditiion */
        if (
            (gameBoard[0][0] !== 0 && gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2]) ||
            (gameBoard[0][2] !== 0 && gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0])
        ) {
            return 1;
        }

        return 0;
    };

    const playGame = (row, col) => {
        let currentPlayer = activePlayer;

        console.log(`${currentPlayer.name}'s move.`);
        console.log(board.playMove(row, col, currentPlayer.token));


        if (checkWinner()) {
            console.log(`${currentPlayer.name} wins!`);
        }

        if (isInvalidMove === 0) {
            switchActivePlayer();
        }

        isInvalidMove = 0;
    };

    return {
        playGame,
    }
};