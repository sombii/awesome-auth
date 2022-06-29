import React from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Route, Switch} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Container from "@material-ui/core/Container";

function App() {
    return (
        <div className="app">
            <CssBaseline/>
            <Container disableGutters>
                <Switch>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/signup">
                        <Signup/>
                    </Route>
                    <Route path="/">
                        <Login/>
                    </Route>
                </Switch>
            </Container>
        </div>
    );
}

export default App;
