import React from "react";
import { Route, Redirect } from "react-router-dom";
import useAuthStore from "../store/authStore";


const ProtectedRoute = ({component:
    Component, ...rest }) =>{
const {isAuthenticated} = useAuthStore();

return(
    <Route
    {...rest}
    render={(props) =>
        isAuthenticated ? (
            <Component {...props} />
        ) : (
            <Redirect to ="/Login" />
        )
    }
    />
);
};
export default ProtectedRoute;