import React, { useContext, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { AuthContext } from "../services/application.context";
import { useNavigate } from "react-router-dom";

function Login({ isAuthenticated, setAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [authState, setAuthState] = useContext(AuthContext);
  const navidgate = useNavigate();
  const handleLogin = (event) => {
    event.preventDefault();
    if (["admin", "user1"].includes(username) && password === "1234") {
      setAuthState({
        ...authState,
        isAuthenticated: true,
        username: username,
        roles: username === "admin" ? ["USER", "ADMIN"] : ["USER"],
      });
      navidgate("/catalog/products");
    }
  };
  return (
    <div className="m-3 p-3">
      <Card>
        <Card.Header>Authentication</Card.Header>
        <Card.Body>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="username"
              ></Form.Control>
              <Form.Text className="text-muted">Give your username</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="password"
              ></Form.Control>
              <Form.Text className="text-muted">Give your password</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCkecke">
              <Form.Check type="checkbox" placeholder="username"></Form.Check>
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
