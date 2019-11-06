import React, { useState } from 'react';
import { connect } from 'react-redux';
import Board from './Board';
import './Game.css';
import { calculateWinner } from '../../Reducers/gameReducer';
import { clickSquare, jumpTo, sort, restart, restartModeMulti } from '../../Actions/gameActions';
import ChatForm from './ChatForm/ChatForm';
import io from 'socket.io-client';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { Spinner, Button } from 'react-bootstrap';



let socket;
const ENDPOINT = 'localhost:4000';
socket = io(ENDPOINT);
const Game = class extends React.PureComponent {
    constructor(props) {
        super(props)

        if (this.props.mode === true)
            return
        socket.on('moveMade', (data) => {
            const { user, id } = data;
            console.log('user' + user);

            const { name } = queryString.parse(this.props.location.search);
            let turn;
            turn = name === user ? false : true;
            console.log('Turn: ' + turn)

            this.setState({ myTurn: turn, player: name });
            console.log('id' + id);
            this.props.clickSquare(id);

        })

        socket.on('surrendered', (data) => {
            alert(data);

            this.props.restartModeMulti()
        })

        socket.on('roomData', (data) => {
            const { room, users, messageGame } = data;

            console.log(users[0]);
            console.log(users[1]);
            if (users.length === 2) {
                alert(`${users[0].name} go first!`)
                this.setState({
                    waiting: false
                })
            }
            this.setState({ playerFirst: users[0].name })

            // this.props.isWaiting = users.length === 2 ? false : null
        })
        this.state = {
            myTurn: true,
            playerFirst: '',
            message: '',
            hasWinner: false,
            waiting: true,

        }
    }

    componentDidMount() {
        if (this.props.mode === true)
            return

        const { name, room } = queryString.parse(this.props.location.search);
        socket.emit('join', { name: name, room: room + '12' }, (error) => {
            console.log('Game is running socket joining')
            if (error) {
                alert(error);
            }
        });
    }
    clickAt(id) {
        if (!this.state.myTurn)
            return;

        const { name } = queryString.parse(this.props.location.search)
        socket.emit('makeMove', { name, id });


    }
    surrender() {
        alert('sur')
        const { name } = queryString.parse(this.props.location.search)

        socket.emit('surrender', name);
        console.log('Da gui surrender')


    }

    render() {


        const { history, stepNumber, xIsNext, isReverse, restart, mode, clickSquare } = this.props;
        const { name } = queryString.parse(this.props.location.search)

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
                    <button type="button" style={{ marginTop: 5 }}
                        className="btn btn-sm btn-outline-dark" id={move}
                        onClick={() => mode ? this.props.jumpTo(move) : null}>{desc}</button>
                </li>
            );
        })
        return (
            <div>
                <div className="game" hidden={this.state.waiting ? true : null}>

                    <div className="game-info">
                        <div className="row">
                            <div className="col-12 status">
                                {status}
                            </div>
                            <div className="col-12 btn-status">
                                {mode ? <button className="btn btn-sm btn-outline-success text-center"
                                    type="button"
                                    onClick={() => restart()}>Restart</button>
                                    : <button className="btn btn-sm btn-outline-danger text-center"
                                        type="button"
                                        onClick={() => this.surrender()}>Surrender</button>}
                            </div>
                            <div className="col-12 btn-status">
                                <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => this.props.sort()}>Sort step</button>
                            </div>
                        </div>
                        <ol reversed={isReverse ? 'reverse' : ''}>{isReverse ? moves.reverse() : moves}</ol>

                    </div>
                    <div className="game-board" >
                        <Board squares={squares} onClick={(i) => mode ? clickSquare(i) : this.clickAt(i)}
                            winner={winner && winner.winLocation} />
                    </div>

                    <div className="game-chat">
                        {mode ? null : <ChatForm />}
                    </div>
                </div>
                <div className="align-content-center waiting" hidden={!this.state.waiting ? true : null}>
                    <Button variant="primary" disabled className='text-center'>
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        Waiting for component...
                    </Button>
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
    mode: state.game.mode,
    isWaiting: false
})

const mapDispatchToProps = (dispatch) => ({
    clickSquare: (id) => dispatch(clickSquare(id)),
    jumpTo: (id) => dispatch(jumpTo(id)),
    sort: () => dispatch(sort()),
    restart: () => dispatch(restart()),
    restartModeMulti: () => dispatch(restartModeMulti()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Game));