import React, { createContext, useState, useEffect } from "react";
// import jwtDecode from "jwt-decode";
import { jwtDecode } from "jwt-decode";
import { useHistory } from "react-router-dom";
// import useHi
// import Alert from '@mui/material/Alert';
// import Snackbar from '@mui/material/Snackbar';
import { Alert, Snackbar } from "@mui/material";

const AuthContext = createContext<any>(null);

export default AuthContext;

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [authTokens, setAuthTokens] = useState<any>(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens")!)
            : null
    );

    const [user, setUser] = useState<any>(() =>
        localStorage.getItem("authTokens")
            ? jwtDecode(localStorage.getItem("authTokens")!)
            : null
    );

    const [loading, setLoading] = useState<boolean>(true);

    const history = useHistory();

    const loginUser = async (email: string, password: string) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/token/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            const data = await response.json();
            console.log(data);

            if (response.status === 200) {
                console.log("Logged In");
                setAuthTokens(data);
                setUser(jwtDecode(data.access));
                localStorage.setItem("authTokens", JSON.stringify(data));
                history.push("/");
            } else {
                console.log(response.status);
                console.log("there was a server issue");
                // Using Material UI Snackbar for alerts
                showAlert("Username or password does not exist", "error");
            }
        } catch (error) {
            console.error("Login Error:", error);
            showAlert("An error occurred", "error");
        }
    };

    const registerUser = async (
        email: string,
        username: string,
        password: string,
        password2: string
    ) => {
        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/register/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        username,
                        password,
                        password2
                    })
                }
            );
            if (response.status === 201) {
                history.push("/login");
                showAlert("Registration Successful, Login Now", "success");
            } else {
                console.log(response.status);
                console.log("there was a server issue");
                showAlert("An Error Occurred", "error");
            }
        } catch (error) {
            console.error("Registration Error:", error);
            showAlert("An error occurred", "error");
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        history.push("/login");
        showAlert("You have been logged out", "success");
    };

    const showAlert = (message: string, severity: "success" | "error") => {
        // Material UI Snackbar for displaying alerts
        // Snackbar automatically disappears after a duration
        <Snackbar open={true} autoHideDuration={6000}>
            <Alert severity={severity}>{message}</Alert>
        </Snackbar>;
    };

    const contextData = {
        user,
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser
    };

    useEffect(() => {
        if (authTokens) {
            setUser(jwtDecode(authTokens.access));
        }
        setLoading(false);
    }, [authTokens, loading]);

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
