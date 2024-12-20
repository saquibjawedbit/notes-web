import { Route } from "react-router";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = localStorage.getItem('accessToken');  // or check cookie

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />  // Redirect to login if not authenticated
                )
            }
        />
    );
};

export default ProtectedRoute;
