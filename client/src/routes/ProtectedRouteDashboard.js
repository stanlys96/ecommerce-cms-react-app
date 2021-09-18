import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRouteDashboard({ isAuth: isAuth, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth === "true" || isAuth == true) {
          return <Component />;
        } else {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
      }}
    />
  )
}

export default ProtectedRouteDashboard;