import React, {useContext, useEffect} from "react";
import {AuthContext, AuthContextValue} from "../context/AuthContext";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {useLocation} from "react-router-dom";

type LocationState = {
    message: "",
    show: boolean
}

export default function Dashboard() {

    const {logout, currentUser} = useContext(AuthContext) as AuthContextValue;
    const {state} = useLocation<{ message: string }>();

    const [open, setOpen] = React.useState(true);

    useEffect(() => {
    }, []);


    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div>
            <p>Hello <strong>{currentUser!.email}</strong></p>
            <Button
                variant="contained"
                color="primary"
                onClick={() => logout()}>
                Logout
            </Button>
            {!!state &&
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
                          anchorOrigin={{vertical: "top", horizontal: "right"}}>
                    <Alert onClose={handleClose} severity="success">
                        {state?.message || "ss"}
                    </Alert>
                </Snackbar>
            }
        </div>
    );
}