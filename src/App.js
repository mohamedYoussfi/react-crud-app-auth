import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products";
import { useEffect, useState } from "react";
import NewProduct from "./components/NewProduct";
import Stats from "./components/Stats";
import axios from "axios";
import EditProduct from "./components/EditProduct";
import { AuthContext, ProductsContext } from "./services/application.context";
import { useAppReducer, useAppState } from "./services/catalog.service";
import Login from "./components/Login";
import { useAuthState } from "./services/auth.service";
import Catalog from "./components/Catalog";
import ProtectedRoute from "./components/ProtectedRoute";
import AppNavBar from "./components/AppNavBar";
import NotAuthorized from "./components/NotAuthorized";
import ProtectedRouteByRole from "./components/ProtectedRouteByRole";
function App() {
  const appReducer = useAppReducer();
  const authState = useAuthState();
  const [isAuthenticated, setAuthenticated] = useState(false);
  return (
    <AuthContext.Provider value={authState}>
      <ProductsContext.Provider value={appReducer}>
        <BrowserRouter>
          <AppNavBar></AppNavBar>
          <Routes>
            <Route path="login" element={<Login />}></Route>
            <Route path="notAuthorized" element={<NotAuthorized />}></Route>
            <Route
              path="catalog"
              element={
                <ProtectedRoute>
                  <Catalog></Catalog>
                </ProtectedRoute>
              }
            >
              <Route path="products" element={<Products />}></Route>

              <Route
                path="newProduct"
                element={
                  <ProtectedRouteByRole role="ADMIN">
                    <NewProduct></NewProduct>
                  </ProtectedRouteByRole>
                }
              ></Route>
              <Route
                path="editProduct/:id"
                element={
                  <ProtectedRouteByRole role="ADMIN">
                    <EditProduct></EditProduct>
                  </ProtectedRouteByRole>
                }
              ></Route>
            </Route>
            <Route path="Home" element={<Home />}></Route>
            <Route index element={<Home />}></Route>
          </Routes>
        </BrowserRouter>
      </ProductsContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
