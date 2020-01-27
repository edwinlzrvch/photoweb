import React, { useCallback, useContext, FunctionComponent } from "react";
import Form from "react-bootstrap/Form";
import { withRouter, Redirect, RouteComponentProps } from "react-router";
import Button from "react-bootstrap/Button";

import app from "./base";
import { AuthContext } from "./Auth";

const Login: FunctionComponent<RouteComponentProps> = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/admin");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/admin" />;
  }

  return (
    <div className="content">
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Control name="email" type="text" placeholder="E-mail" />
        </Form.Group>
        <Form.Group>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button
          type="submit"
          style={{ background: "black", borderColor: "black" }}
        >
          Login
        </Button>
      </Form>
    </div>
  );
};

export default withRouter(Login);
