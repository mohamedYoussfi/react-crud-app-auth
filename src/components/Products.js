import {
  faCheck,
  faCircle,
  faEdit,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../services/application.context";
import {
  Actions,
  checkProduct,
  deleteProduct,
  fetchProducts,
  getProducts,
  getProductsAction,
} from "../services/catalog.service";
import { useNavigate, useNavigation } from "react-router-dom";
import { useAuthState } from "../services/auth.service";
import { AuthContext } from "../services/application.context";

function Products() {
  const [appState, dispatch] = useContext(ProductsContext);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const [authState, authDispatch] = useContext(AuthContext);
  useEffect(() => {
    setKeyword(appState.keyword);
    dispatch({
      type: Actions.GET_PRODUCTS_ACTION,
      payload: {
        keyword: "",
        page: 1,
        dispatch: dispatch,
      },
    });
  }, []);

  const handleDeleteProducts = (product) => {
    dispatch({
      type: Actions.DELETE_PRODUCT_ACTION,
      payload: { product, dispatch, state: appState },
    });
  };
  const handleCheckProduct = (product) => {
    dispatch({
      type: Actions.CHECK_PRODUCT_ACTION,
      payload: { product, dispatch, state: appState },
    });
  };
  const handleGotoPage = (page) => {
    dispatch({
      type: Actions.GET_PRODUCTS_ACTION,
      payload: {
        keyword: keyword,
        page: page,
        dispatch: dispatch,
      },
    });
  };
  const handleSearch = (event) => {
    event.preventDefault();

    dispatch({
      type: Actions.GET_PRODUCTS_ACTION,
      payload: {
        keyword: keyword,
        page: 1,
        dispatch: dispatch,
      },
    });
  };
  return (
    <div className="p-3">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={handleSearch} className="row">
                    <div className="col-auto">
                      <input
                        onChange={(e) => setKeyword(e.target.value)}
                        className="form-control"
                        type="text"
                        value={keyword}
                      ></input>
                    </div>
                    <div className="col-auto">
                      <button className="btn btn-outline-info">
                        <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Checked</th>
                  </tr>
                </thead>
                <tbody>
                  {appState.products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>

                      {authState.roles?.includes("ADMIN") ? (
                        <td>
                          <button
                            onClick={() => handleCheckProduct(product)}
                            className="btn btn-outline-success"
                          >
                            <FontAwesomeIcon
                              icon={product.checked ? faCheck : faCircle}
                            ></FontAwesomeIcon>
                          </button>
                        </td>
                      ) : (
                        <td>
                          <FontAwesomeIcon
                            icon={product.checked ? faCheck : faCircle}
                          ></FontAwesomeIcon>
                        </td>
                      )}

                      {authState.roles?.includes("ADMIN") && (
                        <td>
                          <button
                            onClick={() => handleDeleteProducts(product)}
                            className="btn btn-outline-danger"
                          >
                            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                          </button>
                        </td>
                      )}

                      {authState.roles?.includes("ADMIN") && (
                        <td>
                          <button
                            onClick={() =>
                              navigate(`/catalog/editProduct/${product.id}`)
                            }
                            className="btn btn-outline-success"
                          >
                            <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>

              <ul className="nav nav-pills">
                {new Array(appState.totalPages).fill(0).map((page, index) => (
                  <li key={index + 1}>
                    <button
                      onClick={(e) => {
                        handleGotoPage(index + 1);
                      }}
                      className={
                        appState.currentPage == index + 1
                          ? "btn btn-info ms-1"
                          : "btn btn-outline-info ms-1"
                      }
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
