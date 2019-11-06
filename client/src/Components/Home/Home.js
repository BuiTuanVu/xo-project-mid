import React from 'react';
import { Link, BrowserRouter, Route, Switch } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
import logoxo from '../../logoxo.png';

import Menu from '../Menu/Menu';
import Game from '../Game/Game'
import GameMode from './GameMode';

export default function Home() {

    return (
        <div>

            <Menu></Menu>
            <main>
                <Switch>
                    <Route exact path="/home">
                        <GameMode />
                    </Route>
                    <Route path="/home/game">
                        <Game />
                    </Route>

                </Switch>
            </main>
        </div>
    )
}



