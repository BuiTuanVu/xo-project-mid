import React from 'react';
import { Link, BrowserRouter } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
import logoxo from '../../logoxo.png';
import './Home.css'
import Menu from '../Menu/Menu';

export default function Home() {
    return (
        <div>

            <Menu></Menu>
            <main>
                <Card className="back-ground" >
                    <Card.Img variant="top" src={logoxo} />
                    <Card.Body>
                        <Card.Title className="text-center">Choose mode you want</Card.Title>

                        <Button as={Link} to="/game" className="col-12" variant="primary" id="btn-mode">Play with machine</Button>
                        <Button as={Link} to="/game" className="col-12 mt-3" variant="primary" id="btn-mode">Play with others</Button>

                    </Card.Body>
                </Card>

            </main>

        </div>
    )
}

