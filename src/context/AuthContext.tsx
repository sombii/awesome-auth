import React, {createContext, useEffect, useState} from "react";
import {signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase";
import {useHistory} from "react-router-dom";
import {FieldPath} from "react-hook-form";
import {LoginFormInput} from "../pages/Login";
import {SignupFormInput} from "../pages/Signup";
import firebase from "firebase/compat";


interface UserDetails {
    email: string;
    password: string;
}

type Loading = {
    initialLoading: boolean,
    buttonLoading: boolean
}

export interface AuthContextValue {
    currentUser: firebase.UserInfo | null;
    status: {
        initialLoading: boolean,
        buttonLoading: boolean
    };

    login: (arg: UserDetails, arg1: FieldPath<LoginFormInput>) => any;

    signup: (arg: UserDetails, arg1: FieldPath<LoginFormInput>) => any;

    logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({children}: { children: React.ReactNode }) {

    const [currentUser, setCurrentUser] = useState<firebase.UserInfo | null>(null);
    const [status, setStatus] = useState<Loading>({initialLoading: true, buttonLoading: false});

    const history = useHistory();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setStatus((prevState) => ({...prevState, initialLoading: false}))
        })
        return () => unsubscribe();

    }, []);

    const login = (data: UserDetails, setError: FieldPath<LoginFormInput>) => {
        setStatus((prevState) => ({...prevState, buttonLoading: true}))
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                // setCurrentUser(user);
                // setLoading(false)
                setStatus((prevState) => ({...prevState, buttonLoading: false}))
                history.push("/dashboard");
            })
            .catch((error) => {
                console.log(error.code)
                setStatus((prevState) => ({...prevState, buttonLoading: false}))
                //handle and set errors
                handleFirebaseErrors(error.code, setError)
            })
    }

    const signup = (data: UserDetails, setError: FieldPath<SignupFormInput>) => {
        setStatus((prevState) => ({...prevState, buttonLoading: true}))
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {

                const user = userCredential.user;
                setCurrentUser(user)
                setStatus((prevState) => ({...prevState, buttonLoading: false}))
                history.push("/dashboard");
            })
            .catch((error) => {
                console.log(error.code)
                setStatus((prevState) => ({...prevState, buttonLoading: false}))
                //handle and set errors
                handleFirebaseErrors(error.code, setError)
            });

    }

    const logout = (): void => {
        signOut(auth).then(() => {
            console.log("Sign-out successful.")
            history.push("/")
        }).catch((error) => {
            console.log("error signing out")
        });
    }

    const value: AuthContextValue = {
        currentUser,
        status,
        login,
        logout,
        signup,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

function handleFirebaseErrors<T>(errorCode: string, setError: FieldPath<T>) {

    switch (errorCode) {
        case "auth/user-not-found":
            setError("email", {type: "custom", message: "User dont exist"})
            break;
        case "auth/email-already-in-use":
            setError("email", {type: "custom", message: "Email already in use"})
            break;
        case "auth/network-request-failed":
            setError("password", {type: "custom", message: "No internet, try again"})
            break;
        case "auth/weak-password":
            setError("password", {type: "custom", message: "Weak password"})
            break;
        case "auth/too-many-requests":
            setError("email", {type: "custom", message: "Account temporarily disabled, contact admin"})
            break;
        default:
            setError("email", {type: "custom", message: "Email/Password wrong"})
    }

}