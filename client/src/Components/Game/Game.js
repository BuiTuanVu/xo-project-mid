import React, { useState } from 'react';
import { connect } from 'react-redux';
import Board from './Board';
import './Game.css';
import { calculateWinner } from '../../Reducers/gameReducer';
import { clickSquare, jumpTo, sort, restart } from '../../Actions/gameActions';
import ChatForm from './ChatForm/ChatForm';
import io from 'socket.io-client';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';


let socket;
const ENDPOINT = 'localhost:4000';
socket = io(ENDPOINT);
const Game = class extends React.PureComponent {
    constructor(props) {
        super(props)


        socket.on('moveMade', (id) => {
            console.dir(id)
            this.props.clickSquare(id);
        })
    }

    componentDidMount() {
        const { name, room } = queryString.parse(this.props.location.search);
        socket.emit('join', { name: name, room: room + '12' }, (error) => {
            console.log('Game is running socket joining')
            if (error) {
                alert(error);
            }
        });
    }
    clickAt(id) {
        socket.emit('makeMove', id)
    }

    render() {




        const { history, stepNumber, xIsNext, isReverse, restart } = this.props;
        const current = history[stepNumber];
        const squares = current.squares.slice();
        const winner = calculateWinner(squares);
        let status;

        if (winner) {

            status = `Winner is: ${winner.winPlayer}`;

        } else {

            status = `Next player is: ${xIsNext ? 'X' : 'O'}`;
        }


        const moves = history.map((step, move) => {
            const desc = move ? `Go to move #${move} (${step.location})` : 'Go to game start!';
            return (
                <li key={move.id} >
                    <button type="button" style={{ marginTop: 5 }} className="btn btn-sm btn-outline-dark" id={move} onClick={() => this.props.jumpTo(move)}>{desc}</button>
                </li>
            );
        })
        return (
            <div className="game">

                <div className="game-board">
                    <Board squares={squares} onClick={(i) => this.clickAt(i)} winner={winner && winner.winLocation} />
                </div>
                <div className="game-info">
                    <div className="row">
                        <div className="col-6 status">
                            {status}
                        </div>
                        <div className="col-3">
                            <button className="btn btn-sm btn-outline-success" type="button" onClick={() => restart()}>Restart</button>
                        </div>
                        <div className="col-3">
                            <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => this.props.sort()}>Sort step</button>
                        </div>
                    </div>
                    <ol reversed={isReverse ? 'reverse' : ''}>{isReverse ? moves.reverse() : moves}</ol>

                </div>
                <div>
                    <ChatForm />
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    history: state.game.history,
    xIsNext: state.game.xIsNext,
    stepNumber: state.game.stepNumber,
    isReverse: state.game.isReverse,
})

const mapDispatchToProps = (dispatch) => ({
    clickSquare: (id) => dispatch(clickSquare(id)),
    jumpTo: (id) => dispatch(jumpTo(id)),
    sort: () => dispatch(sort()),
    restart: () => dispatch(restart())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Game));