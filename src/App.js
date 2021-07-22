import {useState} from "react";
import Grid from "./components/router/Grid";
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './App.css';


function App() {

    const row = 100;
    const col = 100;

    return (
        <>
            <BrowserRouter>
                <div>
                    <button className={'playBtn'}>Play</button>
                </div>
                <Switch>
                    <Route exact path={'/grid'} component={Grid}/>
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default App;
