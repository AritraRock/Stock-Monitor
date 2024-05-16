import { Route, Redirect } from "react-router-dom";
import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

interface PrivateRouteProps {
    children: React.ReactNode;
    path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, ...rest }) => {
    const { user } = useContext(AuthContext);
    return <Route {...rest}>{user ? children : <Redirect to="/login" />}</Route>;
}

export default PrivateRoute;
