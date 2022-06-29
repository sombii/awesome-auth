import React, {useContext} from "react";
import Card from "@material-ui/core/Card";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {Link, Redirect} from "react-router-dom";
import FormInput from "../components/FormInput";
import {SubmitHandler, useForm} from "react-hook-form";
import {emailValidationRegex, passwordValidationRegex} from "../utils";
import SimpleBackdrop from "../components/Backdrop";
import {AuthContext, AuthContextValue} from "../context/AuthContext";
import CircularProgress from "@material-ui/core/CircularProgress";

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
    })
)

interface SignupFormInput {
    email: string;
    password: string;
    confirmPassword: string;
}

export default function Signup() {

    const classes = useStyles();

    const {control, handleSubmit, watch} = useForm<SignupFormInput>({
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    const {signup, currentUser, status} = useContext(AuthContext) as AuthContextValue;

    const handleFormSubmit: SubmitHandler<SignupFormInput> = (data: SignupFormInput) => {
        console.log(data)
        signup(data)
    }

    if (status.initialLoading)
        return <SimpleBackdrop/>

    if (!status.initialLoading && currentUser)
        return <Redirect to="/dashboard"/>


    return (
        <Box display="flex" justifyContent="center" alignItems="center" className={classes.root}>
            <Card variant="outlined" className={classes.card}>
                <div className={classes.cardHeader}>
                    <Typography variant="h4" component="h1">Demo Signup</Typography>
                    <Typography variant="body1">Register your account</Typography>
                </div>

                {/*signup form */}
                <Box
                    component="form"
                    onSubmit={handleSubmit(handleFormSubmit)}
                    className={classes.form}
                >
                    <FormInput name="email"
                               type="email"
                               label="Email"
                               control={control}
                               customRules={{pattern: emailValidationRegex}}/>
                    <FormInput name="password"
                               type="password"
                               label="Password"
                               control={control}
                               customRules={{pattern: passwordValidationRegex}}/>
                    <FormInput name="confirmPassword"
                               type="password"
                               label="Confirm Password"
                               control={control}
                               watch={watch}
                               watchSibling="password"/>

                    <Button variant="contained"
                            color="primary"
                            type="submit"
                            size="large"
                            disabled={status.buttonLoading}
                    >
                        {status.buttonLoading
                            ? <CircularProgress size="1.7rem"/>
                            : <span>Signup</span>}
                    </Button>

                </Box>
                <Box padding="0 2rem 2rem">
                    <Link to="/" style={{textDecoration: "none"}}>
                        <Button variant="text" color="secondary" size="large" fullWidth>
                            Back to Login
                        </Button>
                    </Link>
                </Box>
            </Card>
        </Box>
    );
}