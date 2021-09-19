import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRouteHome({ isAuth: isAuth, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth === "false" || isAuth == false) {
          return <Component />;
        } else {
          return (
            <Redirect to={{ pathname: "/products", state: { from: props.location } }} />
          );
        }
      }}
    />
  )
}

export default ProtectedRouteHome;