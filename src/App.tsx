import React from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Link, Route, Switch} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Container from "@material-ui/core/Container";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./pages/PrivateRoute";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { HelmetProvider } from 'react-helmet-async';

function App() {
    return (
        <HelmetProvider>
        <Container maxWidth={false}>
            <CssBaseline/>
            <Switch>
                <PrivateRoute path="/dashboard">
                    <Dashboard/>
                </PrivateRoute>
                <Route path="/signup">
                    <Signup/>
                </Route>
                <Route path="/" exact>
                    <Login/>
                </Route>
                <Route path="*" component={PageNotFound}/>
            </Switch>
        </Container>
        </HelmetProvider>
    );
}


function PageNotFound() {
    return <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" flexDirection="column"
                gridGap="3rem">
        <Typography variant="h2" component="h1">
            404 Page not found
        </Typography>
        <Link to="/" style={{textDecoration: "none"}}>
            <Button variant="contained" color="secondary">
                Back to HOME
            </Button>
        </Link>
    </Box>
}

export default App;
