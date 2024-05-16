import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useHistory } from "react-router-dom";
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

    const [alert, setAlert] = useState<{ message: string; severity: "success" | "error" } | null>(null);

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
                setAlert({ message: "Login Successful", severity: "success" });
                console.log("Logged In I am here");
                setAuthTokens(data);
                setUser(jwtDecode(data.access));
                localStorage.setItem("authTokens", JSON.stringify(data));
                history.push("/");
            } else {
                setAlert({ message: "Username or password does not exist", severity: "error" });
                console.log(response.status);
                console.log("there was a server issue");
            }
        } catch (error) {
            console.error("Login Error:", error);
            setAlert({ message: "An error occurred", severity: "error" });
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
                setAlert({ message: "Registration Successful, Login Now", severity: "success" });
                history.push("/login");
            } else {
                setAlert({ message: "An Error Occurred", severity: "error" });
                console.log(response.status);
                console.log("there was a server issue");
            }
        } catch (error) {
            setAlert({ message: "An Error Occurred", severity: "error" });
            console.error("Registration Error:", error);
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        history.push("/login");
        setAlert({ message: "You have been logged out", severity: "success" });
    };

    const showAlert = (message: string, severity: "success" | "error") => {
        setAlert({ message, severity });
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
                {alert && (
                    <Snackbar open={true} autoHideDuration={3000} onClose={() => setAlert(null)}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }} >
                        <Alert severity={alert.severity}>{alert.message}</Alert>
                    </Snackbar>
                )}
        </AuthContext.Provider>
    );
};
