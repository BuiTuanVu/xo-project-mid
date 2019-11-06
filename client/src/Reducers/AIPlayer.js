
var maxPlayer = 'X';
var minPlayer = 'O';

//Test for winner
function winner(board, player) {
    const size = Math.sqrt(board.length);

    for (let i = 0; i < size; i += 1) {
        for (let j = 0; j < size; j += 1) {
            const index = i * size + j;


            if ((board[index] === player
                && board[index] === board[index + 1]
                && board[index] === board[index + 2]
                && board[index] === board[index + 3]
                && board[index] === board[index + 4])) {
                return true
            }
            if (((board[index - size] === null || board[index + 5 * size] === null)
                && board[index] === player
                && board[index] === board[index + size * 1]
                && board[index] === board[index + size * 2]
                && board[index] === board[index + size * 3]
                && board[index] === board[index + size * 4])) {
                return {
                    winLocation: [index, index + size * 1, index + size * 2, index + size * 3, index + size * 4],
                    winPlayer: board[index]
                };
            }
            if (((board[index - size * 1 - 1] === null || board[index + size * 5 + 5] === null)
                && board[index] === player
                && board[index] === board[index + size * 1 + 1]
                && board[index] === board[index + size * 2 + 2]
                && board[index] === board[index + size * 3 + 3]
                && board[index] === board[index + size * 4 + 4])) {
                return {
                    winLocation: [index, index + size * 1 + 1, index + size * 2 + 2, index + size * 3 + 3, index + size * 4 + 4],
                    winPlayer: board[index]
                };
            }
            if (((board[index - size * 1 + 1] === null || board[index + size * 5 - 5] === null)
                && board[index] === player
                && player === board[index + size * 1 - 1]
                && player === board[index + size * 2 - 2]
                && player === board[index + size * 3 - 3]
                && player === board[index + size * 4 - 4])) {
                return {
                    winLocation: [index, index + size * 1 - 1, index + size * 2 - 2, index + size * 3 - 3, index + size * 4 - 4],
                    winPlayer: board[index]
                };
            }
        }

    }
    return null;
}

function copyBoard(board) {
    //This returns a new copy of the Board and ensures that you're only
    //manipulating the copies and not the primary board.
    return board.slice(0);
}

//Determine if a move is valid and return the new board state
function validMove(move, player, board) {
    var newBoard = copyBoard(board);
    if (newBoard[move] === null) {
        newBoard[move] = player;
        return newBoard;
    } else
        return null;
}

//This is the main AI function which selects the first position that
//provides a winning result (or tie if no win possible)


function minScore(board) {
    if (winner(board, 'X')) {
        return 10;
    } else if (winner(board, 'O')) {
        return -10;

    } else {
        var bestMoveValue = 100;
        let move = 0;
        for (var i = 0; i < board.length; i++) {
            var newBoard = validMove(i, minPlayer, board);
            if (newBoard) {
                var predictedMoveValue = maxScore(newBoard);
                if (predictedMoveValue < bestMoveValue) {
                    bestMoveValue = predictedMoveValue;
                    move = i;
                }
            }
        }
        //console.log("Best Move Value(minScore):", bestMoveValue);
        return bestMoveValue;
    }
}

function maxScore(board) {
    if (winner(board, 'X')) {
        return 10;
    } else if (winner(board, 'O')) {
        return -10;

    } else {
        var bestMoveValue = -100;
        let move = 0;
        for (var i = 0; i < board.length; i++) {
            var newBoard = validMove(i, maxPlayer, board);
            if (newBoard) {
                var predictedMoveValue = minScore(newBoard);
                if (predictedMoveValue > bestMoveValue) {
                    bestMoveValue = predictedMoveValue;
                    move = i;
                }
            }
        }
        return bestMoveValue;
    }
}


export const findAiMove = (board) => {
    var bestMoveScore = 100;
    let move = null;
    //Test Every Possible Move if the game is not already over.
    if (winner(board, 'X') || winner(board, 'O')) {
        return null;
    }
    for (var i = 0; i < board.length; i++) {
        let newBoard = validMove(i, minPlayer, board);
        //If validMove returned a valid game board
        if (newBoard) {
            var moveScore = maxScore(newBoard);
            if (moveScore < bestMoveScore) {
                bestMoveScore = moveScore;
                move = i;
            }
        }
    }
    return move;
}
