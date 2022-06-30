import React, {useContext} from "react";
import {AuthContext, AuthContextValue} from "../context/AuthContext";
import Button from "@material-ui/core/Button";

export default function Dashboard() {

    const {logout, currentUser} = useContext(AuthContext) as AuthContextValue;

    return (
        <div>
            <p>Hello <strong>{currentUser!.email}</strong></p>
            <Button
                variant="contained"
                color="primary"
                onClick={() => logout()}>
                Logout
            </Button>
        </div>
    );
}