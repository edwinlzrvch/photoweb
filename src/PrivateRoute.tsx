import React, { useContext, FunctionComponent } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import { RouteProps } from "react-router";

const PrivateRoute: FunctionComponent<RouteProps> = ({
  component: RouteComponent,
  ...rest
}) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={routeProps =>
        !!currentUser ? (
          // @ts-ignore
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
};

export default PrivateRoute;
