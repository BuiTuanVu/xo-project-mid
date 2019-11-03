import React, { useState } from 'react';
import { Link, BrowserRouter, Route, Switch } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
import logoxo from '../../logoxo.png';
import './Home.css'
import { connect } from 'react-redux'



const GameMode = ({ user }) => {
    const [name, setName] = useState(user.user.username);
    const [room, setRoom] = useState(user.user.username);

    console.log(user.user.username)
    return (

        < div >
            <Card className="back-ground" >
                <Card.Img variant="top" src={logoxo} />
                <Card.Body>
                    <Card.Title className="text-center">Choose mode you want</Card.Title>


                    <Button type='submit' as={Link} to={`/home/game?name=${name}&room=${room}`}
                        className="col-12 mt-3"
                        variant="primary"
                        id="btn-mode"

                    >Play with others</Button>

                </Card.Body>
            </Card>
        </div >
    )
};

const mapStateToProps = (state) => ({
    user: state.auth.user,

})


export default connect(mapStateToProps)(GameMode);