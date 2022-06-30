import React, {useContext} from "react";
import {AuthContext, AuthContextValue} from "../context/AuthContext";
import Button from "@material-ui/core/Button";
import {useLocation} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import Drawer from "@material-ui/core/Drawer";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ToastNotification from "../components/ToastNotification";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(3),
        },
    }),
);

function InboxIcon() {
    return null;
}

function MailIcon() {
    return null;
}

export default function Dashboard() {

    const classes = useStyles();

    const {logout, currentUser} = useContext(AuthContext) as AuthContextValue;
    const {state} = useLocation<{ message: string }>();


    return (
        <div>
            <Helmet>
                <title>Dashboard - Awesome login form</title>
            </Helmet>

            <div className={classes.root}>
                <Drawer className={classes.drawer} variant="permanent" classes={{paper: classes.drawerPaper,}}
                        anchor="left">
                    <div className={classes.toolbar}/>
                    <Divider/>
                    <List>
                        {['Dashboard', 'Settings', 'Profile', 'About'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItem>
                        ))}
                    </List>
                    <Divider/>
                </Drawer>
                <main className={classes.content}>
                    <p>Hello <strong>{currentUser!.email}</strong></p>
                    <Button variant="contained" color="primary" onClick={() => logout()}>Logout</Button>
                </main>
            </div>

            {!!state &&
                <ToastNotification message={state.message} severity="success"/>
            }
        </div>
    );
}