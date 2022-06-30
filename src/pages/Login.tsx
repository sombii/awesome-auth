import React, {useContext, useEffect} from "react";
import Card from "@material-ui/core/Card";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Link, Redirect, useLocation} from "react-router-dom";
import Box from "@material-ui/core/Box";
import {SubmitHandler, useForm} from "react-hook-form";
import FormInput from "../components/FormInput";
import {emailValidationRegex} from "../utils";
import {AuthContext, AuthContextValue} from "../context/AuthContext";
import SimpleBackdrop from "../components/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {Helmet} from "react-helmet-async";
import ToastNotification from "../components/ToastNotification";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "100vh",
        [theme.breakpoints.down("sm")]: {
            margin: "0 1rem"
        }
    },
    card: {
        // padding: "20px",
        maxWidth: 380,
        width: "100%"
    },
    cardHeader: {
        backgroundColor: theme.palette.primary.main,
        color: "#fff",
        padding: "2rem",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        padding: "2rem"
    },
}))


export interface LoginFormInput {
    email: string,
    password: string
}

export default function Login() {

    const classes = useStyles();
    const {control, handleSubmit, setError} = useForm<LoginFormInput>({
        defaultValues: {
            email: "",
            password: ""
        }
    });
    const [openToast, setOpenToast] = React.useState(true);

    const {state} = useLocation<{ message: string }>();

    const {login, currentUser, status} = useContext(AuthContext) as AuthContextValue;

    useEffect(() => {
        //to clear location state which even persist on refresh
        window.history.replaceState("", '', '');
    }, []);


    const handleFormSubmit: SubmitHandler<LoginFormInput> = async (data: LoginFormInput) => {
        login(data, setError);
    }

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenToast(false);
    };


    if (status.initialLoading) {
        return <SimpleBackdrop/>
    }

    if (!status.initialLoading && !currentUser) {
        return (
            <>
                <Helmet>
                    <title>Log into your account - Awesome login form</title>
                </Helmet>
                <Box display="flex" justifyContent="center" alignItems="center" className={classes.root}>
                    <Card variant="outlined" className={classes.card}>
                        <div className={classes.cardHeader}>
                            <Typography variant="h4" component="h1">Demo Login</Typography>
                            <Typography variant="body1">Welcome back !</Typography>
                        </div>
                        {/*form start  */}
                        <Box
                            component="form"
                            onSubmit={handleSubmit(handleFormSubmit)}
                            className={classes.form}
                        >
                            <FormInput name="email" type="text" label="Email" control={control}
                                       customRules={{pattern: emailValidationRegex}}
                            />
                            <FormInput name="password" type="password" label="Password" control={control}
                                // customRules={{minLength: {message: "Minimum 8 required", value: 8}}}
                            />

                            <Button variant="contained"
                                    color="primary"
                                    type="submit"
                                    size="large"
                                    disabled={status.buttonLoading}
                            >
                                {status.buttonLoading
                                    ? <CircularProgress size="1.7rem"/>
                                    : <span>Login</span>}
                            </Button>
                        </Box>


                        <Box padding="0 2rem 2rem">
                            <div style={{textAlign: "center", marginBottom: "1rem"}}>
                                <span>OR</span>
                            </div>

                            <Link to="/signup" style={{textDecoration: "none"}}>
                                <Button variant="outlined" color="secondary" size="large" fullWidth>Signup</Button>
                            </Link>
                        </Box>
                    </Card>
                </Box>
                {!!state &&

                    <ToastNotification message={state.message} severity="error"/>
                }
            </>
        );

    }

    return <Redirect to={"/dashboard"}/>

}