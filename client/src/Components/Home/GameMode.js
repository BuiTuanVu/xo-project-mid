import React, { useState } from 'react';
import { Link, BrowserRouter, Route, Switch } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
import logo2 from '../../logo2.png';
import './GameMode.css'
import { connect } from 'react-redux'
import { changeMode } from '../../Actions/gameActions';



const GameMode = ({ user, changeMode }) => {
    const [name, setName] = useState(user.user.username);
    const [room, setRoom] = useState('2201');

    console.log(user.user.username)
    return (

        < div >
            <Card className="back-ground__Mode" >
                <Card.Img variant="top" src={logo2} />
                <Card.Body className="body_Mode">

                    <Card.Title className="text-center">Choose mode you want</Card.Title>
                    <Button type='submit' as={Link} to={'/home/game'}
                        className="col-12 mt-3"
                        variant="primary"
                        id="btn-mode"

                    >Play with machine</Button>
                    <Button type='submit' as={Link} to={`/home/game?name=${name}&room=${room}`}
                        className="col-12 mt-3"
                        variant="primary"
                        id="btn-mode"
                        onClick={() => changeMode()}

                    >Play with other</Button>


                </Card.Body>
            </Card>
        </div >
    )
};

const mapStateToProps = (state) => ({
    user: state.auth.user,

})
const mapDispatchToProps = (dispatch) => ({
    changeMode: () => dispatch(changeMode())
});

export default connect(mapStateToProps, mapDispatchToProps)(GameMode);