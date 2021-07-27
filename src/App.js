import {useState} from "react";
import Grid from "./components/router/Grid";
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'
import './App.css';
import Home from "./components/router/Home";
import InfoPage1 from "./components/router/InfoPage1";


function App() {

    const [btn, setBtn] = useState(true);

    const row = 100;
    const col = 100;

    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path={'/'}>
                        <Home/>
                    </Route>
                    <Route exact path={'/info1'}>
                        <InfoPage1/>
                    </Route>
                    <Route exact path={'/grid'}>
                        <Grid row={row} col={col}/>
                    </Route>
                    <Route path={'/'}>
                        <h1>404 Error</h1>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
