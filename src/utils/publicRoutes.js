import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const publicRoute = ({ children, ...rest }) => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    return (
        <Route
            {...rest}
            render={({ location }) =>
                !!isLoggedIn ? (
                    <Redirect
                        to={{
                            pathname: '/app',
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

export default publicRoute;
