import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PublicRoutes = ({ children, ...rest }) => {
    const isLoggedIn = useSelector(state => state.entities.auth.isLoggedIn)

    return (
        <Route
            {...rest}
            render={({ location }) =>
                !!isLoggedIn ? (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: location }
                        }}
                    />
                ) : (
                    children
                )
            }
        />
    );
};

export default PublicRoutes;
