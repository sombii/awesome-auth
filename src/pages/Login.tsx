import React from "react";
import Card from "@material-ui/core/Card";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import Box from "@material-ui/core/Box";
import {FieldError, FieldErrors, SubmitErrorHandler, SubmitHandler, useForm} from "react-hook-form";
import FormInput from "../components/FormInput";
import {emailValidationRegex} from "../utils";

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


interface LoginFormInput {
    email: string,
    password: string
}

export default function Login() {

    const classes = useStyles();
    const {control, handleSubmit} = useForm<LoginFormInput>({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const handleFormSubmit: SubmitHandler<LoginFormInput> = (data: LoginFormInput) => {
        console.log(data)
    }
    const handleFormSubmitError: SubmitErrorHandler<FieldErrors<LoginFormInput>> = (errors: FieldErrors<LoginFormInput>) => {
        console.log(errors)
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" className={classes.root}>
            <Card variant="outlined" className={classes.card}>
                <div className={classes.cardHeader}>
                    <Typography variant="h4" component="h1">Okhati Login</Typography>
                    <Typography variant="body1">Welcome back !</Typography>
                </div>

                {/*form start  */}
                <Box
                    component="form"
                    onSubmit={handleSubmit(handleFormSubmit, handleFormSubmitError) }
                    className={classes.form}
                >
                    <FormInput name="email" type="email" label="Email" control={control}
                               customRules={{pattern: emailValidationRegex}}/>
                    <FormInput name="password" type="password" label="Password" control={control}
                               customRules={{minLength: {message: "Minimum 8 required", value: 8}}}/>

                    <Button variant="contained" color="primary" type="submit" size="large">Login</Button>
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
    );
}