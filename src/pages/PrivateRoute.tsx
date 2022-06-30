import React, {useContext} from "react";
import {AuthContext, AuthContextValue} from "../context/AuthContext";
import {Redirect, Route} from "react-router-dom";
import SimpleBackdrop from "../components/Backdrop";

export default function PrivateRoute({children, path}: { children: React.ReactNode, path: string }) {

    const {currentUser, status} = useContext(AuthContext) as AuthContextValue;

    if (status.initialLoading)
        return <SimpleBackdrop/>

    return (
        <Route exact path={path} >
            {currentUser ? children : <Redirect to={{pathname: "/", state: {message: "Please login first."}}}/>}
        </Route>
    );
}