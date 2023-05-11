import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Stats from "./Stats";
import { AuthContext, ProductsContext } from "../services/application.context";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn, faSignOut } from "@fortawesome/free-solid-svg-icons";

function AppNavBar() {
  const [currentAction, setCurrentAction] = useState();
  const [appState, dispatch] = useContext(ProductsContext);
  const [authState, setAuthState] = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    let currentAction = window.location.pathname;
    currentAction = currentAction.slice(1, currentAction.length);
    setCurrentAction(currentAction);
  });
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <ul className="nav nav-pills">
          <li>
            <Link
              onClick={() => setCurrentAction("home")}
              className={
                currentAction === "home"
                  ? "btn btn-info ms-1"
                  : "btn btn-outline-info ms-1"
              }
              to={"/home"}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setCurrentAction("products")}
              className={
                currentAction === "products"
                  ? "btn btn-info ms-1"
                  : "btn btn-outline-info ms-1"
              }
              to={"/catalog/products"}
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setCurrentAction("newProduct")}
              className={
                currentAction === "newProduct"
                  ? "btn btn-info ms-1"
                  : "btn btn-outline-info ms-1"
              }
              to={"/catalog/newProduct"}
            >
              New Product
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav">
          <li>
            {appState.status == "LOADING" && (
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </li>
        </ul>
        <ul className="navbar-nav">
          <li>
            <Stats></Stats>
          </li>
        </ul>
        {authState.isAuthenticated && (
          <ul className="nav nav-pills">
            <li className="p-2">{authState.username}</li>
            <li>
              <Button
                onClick={() =>
                  setAuthState({
                    ...authState,
                    isAuthenticated: false,
                    username: undefined,
                    roles: undefined,
                  })
                }
              >
                <FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon>
              </Button>
            </li>
          </ul>
        )}
        {!authState.isAuthenticated && (
          <ul className="navbar navbar-nav">
            <li>
              <Button onClick={() => navigate("/login")}>
                <FontAwesomeIcon icon={faSignIn}></FontAwesomeIcon>
              </Button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default AppNavBar;
