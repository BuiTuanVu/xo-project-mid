import React from 'react';
import Square from './Square';

class Board extends React.Component {
    renderSquare(i) {
        const { winner, squares, onClick } = this.props;

        return <Square value={squares[i]} onClick={() => onClick(i)} winner={winner && winner.includes(i) ? 'winner' : ''} />
    }

    renderBoard() {
        const { squares } = this.props;
        const sizeOfBoard = Math.sqrt(squares.length);
        const board = Array(sizeOfBoard).fill(null);
        for (let i = 0; i < sizeOfBoard; i += 1) {
            const squaresTemp = Array(sizeOfBoard).fill(null);
            for (let j = 0; j < sizeOfBoard; j += 1) {
                const squareKey = i * sizeOfBoard + j;
                squaresTemp.push(<span key={squareKey}>{this.renderSquare(squareKey)}</span>);
            }
            board.push(<div key={i}>{squaresTemp}</div>);
        }
        return board;
    }

    render() {
        return (
            <div>

                <div>{this.renderBoard()}</div>
            </div>
        );
    }
}

export default Board;