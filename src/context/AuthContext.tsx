import React, {createContext, useEffect, useState} from "react";
import {signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase";
import {useHistory} from "react-router-dom";


interface UserDetails {
    email: string;
    password: string;
}

type Loading = {
    initialLoading: boolean,
    buttonLoading: boolean
}

export interface AuthContextValue {
    currentUser: {} | null;
    status: {
        initialLoading: boolean,
        buttonLoading: boolean
    };

    login: (arg: UserDetails) => any;

    signup: (arg: UserDetails) => any;

    logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({children}: { children: React.ReactNode }) {

    const [currentUser, setCurrentUser] = useState<{} | null>(null);
    const [status, setStatus] = useState<Loading>({initialLoading: true, buttonLoading: false});

    const history = useHistory();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setStatus((prevState) => ({...prevState, initialLoading: false}))
        })
        return () => unsubscribe();

    }, []);

    const login = (data: UserDetails) => {
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
                setStatus((prevState) => ({...prevState, buttonLoading: false}))
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
            })
    }

    const signup = (data: UserDetails) => {
        setStatus((prevState) => ({...prevState, buttonLoading: true}))
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {

                const user = userCredential.user;
                setCurrentUser(user)
                setStatus((prevState) => ({...prevState, buttonLoading: false}))
                history.push("/dashboard");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setStatus((prevState) => ({...prevState, buttonLoading: false}))
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
            {/*{loading.toString()}sad*/}
            {children}
        </AuthContext.Provider>
    )
}
