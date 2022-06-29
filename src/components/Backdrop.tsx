import React, {useContext} from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import {AuthContext, AuthContextValue} from "../context/AuthContext";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }),
);

export default function SimpleBackdrop() {
    const classes = useStyles();

    const {status} = useContext(AuthContext) as AuthContextValue;

    return (
        <div>
            <Backdrop className={classes.backdrop} open={status.initialLoading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </div>
    );
}
