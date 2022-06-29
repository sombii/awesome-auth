import React, {useContext} from "react";
import {AuthContext, AuthContextValue} from "../context/AuthContext";
import Button from "@material-ui/core/Button";

export default function Dashboard() {

    const {logout} = useContext(AuthContext) as AuthContextValue;

    return (
        <div>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At debitis deleniti, doloremque doloribus eos
                facere iusto labore laborum, magnam nisi quasi quo tempora. Ad dicta illum libero sit. Quia, quis?
            </p>

            <Button
                variant="contained"
                color="primary"
                onClick={() => logout()}>
                Logout
            </Button>
        </div>
    );
}