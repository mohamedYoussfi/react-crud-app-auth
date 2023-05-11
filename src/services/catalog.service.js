import { wait } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import { createContext, useReducer, useState } from "react";

export const api = axios.create({ baseURL: "http://localhost:9000" });

export function getProductsAction({ dispatch, keyword = "", page = 1 }) {
  return {
    type: "GET_PRODUCTS_ACTION",
    payload: {
      keyword: keyword,
      page: page,
      dispatch: dispatch,
    },
  };
}

export const Actions = {
  GET_PRODUCTS_ACTION: "Get Products action",
  PRODUCTS_LOADED_EVENT: "Product loaded event",

  LOAD_PRODUCT_BY_ID_ACTION: "Get Product By id action",
  PRODUCT_BY_ID_LOADED_SUCCESS_EVENT: "Product By id loaded event",

  CHECK_PRODUCT_ACTION: "Check Product action",
  PRODUCT_CHECKED_EVENT: "Product checked event",

  DELETE_PRODUCT_ACTION: "Delete Product action",
  PRODUCT_DELETED_SUCCESS_EVENT: "Product deleted event",

  UPDATE_PRODUCT_ACTION: "Update Product action",
  PRODUCT_UPDATED_SUCCESS_EVENT: "Product updated event",

  ADD_PRODUCT_ACTION: "Add Product Action",
  PRODUCT_ADDED_SUCCESS_EVENT: "Product Added Event",
};
export const fetchProducts = ({
  keyword = "",
  page = 1,
  size = 4,
  dispatch,
}) => {
  wait(1000).then(() => {
    api
      .get(`/products?name_like=${keyword}&_page=${page}&_limit=${size}`)
      .then((resp) => {
        const totalElements = resp.headers["x-total-count"];
        let totalPages = Math.floor(totalElements / size);
        if (totalElements % size != 0) ++totalPages;
        dispatch({
          type: Actions.PRODUCTS_LOADED_EVENT,
          payload: {
            products: resp.data,
            totalPages: totalPages,
            currentPage: page,
            keyword: keyword,
          },
        });
      });
  });
};

export const loadProductById = (id, dispatch) => {
  wait(1000).then(() => {
    api.get(`/products/${id}`).then((resp) => {
      dispatch({
        type: Actions.PRODUCT_BY_ID_LOADED_SUCCESS_EVENT,
        payload: resp.data,
      });
    });
  });
};

export const checkProduct = (product, dispatch) => {
  console.log(product);
  api
    .patch(`/products/${product.id}`, { checked: !product.checked })
    .then((resp) => {
      dispatch({
        type: Actions.PRODUCT_CHECKED_EVENT,
        payload: resp.data,
      });
    });
};
export const deleteProduct = (product, dispatch) => {
  api.delete(`/products/${product.id}`).then((resp) => {
    dispatch({
      type: Actions.PRODUCT_DELETED_SUCCESS_EVENT,
      payload: product,
    });
  });
};

export const updateProduct = (product, dispatch) => {
  api.put(`/products/${product.id}`, product).then((resp) => {
    dispatch({
      type: Actions.PRODUCT_UPDATED_SUCCESS_EVENT,
      payload: resp.data,
    });
  });
};

export const saveProduct = (product, dispatch) => {
  api.post(`/products`, product).then((resp) => {
    dispatch({
      type: Actions.PRODUCT_ADDED_SUCCESS_EVENT,
      payload: resp.data,
    });
  });
};

export const useAppReducer = () => {
  const initialStat = {
    keyword: "",
    currentPage: 1,
    pageSize: 4,
    totalPages: 0,
    products: [],
    status: "",
  };

  const reducerHandler = (state, action) => {
    let newData;
    state.previousAction = action;
    switch (action.type) {
      case Actions.GET_PRODUCTS_ACTION:
        fetchProducts({
          keyword: action.payload.keyword,
          page: action.payload.page,
          dispatch: action.payload.dispatch,
        });
        return { ...state, status: "LOADING" };

      case Actions.PRODUCTS_LOADED_EVENT:
        let newState = {
          ...state,
          products: action.payload.products,
          totalPages: action.payload.totalPages,
          currentPage: action.payload.currentPage,
          keyword: action.payload.keyword,
          status: "SUCCESS",
        };
        return newState;

      case Actions.CHECK_PRODUCT_ACTION:
        checkProduct(action.payload.product, action.payload.dispatch);
        return { ...state, status: "LOADING" };

      case Actions.PRODUCT_CHECKED_EVENT:
        newData = state.products.map((p) =>
          p.id == action.payload.id ? action.payload : p
        );
        return { ...state, products: newData, status: "SUCCESS" };

      case Actions.DELETE_PRODUCT_ACTION:
        deleteProduct(action.payload.product, action.payload.dispatch);
        return { ...state, status: "LOADING" };

      case Actions.PRODUCT_DELETED_SUCCESS_EVENT:
        newData = state.products.filter((p) => p.id != action.payload.id);
        return { ...state, products: newData, status: "SUCCESS" };

      case Actions.LOAD_PRODUCT_BY_ID_ACTION:
        loadProductById(action.payload.id, action.payload.dispatch);
        return { ...state, status: "LOADING", product: undefined };

      case Actions.PRODUCT_BY_ID_LOADED_SUCCESS_EVENT:
        return { ...state, product: action.payload, status: "SUCCESS" };

      case Actions.UPDATE_PRODUCT_ACTION:
        updateProduct(action.payload.product, action.payload.dispatch);
        return { ...state, status: "LOADING" };

      case Actions.PRODUCT_UPDATED_SUCCESS_EVENT:
        return { ...state, product: action.payload, status: "SUCCESS" };

      case Actions.ADD_PRODUCT_ACTION:
        saveProduct(action.payload.product, action.payload.dispatch);
        return { ...state, status: "LOADING" };

      case Actions.PRODUCT_ADDED_SUCCESS_EVENT:
        return { ...state, product: action.payload, status: "SUCCESS" };

      default:
        return { ...state };
    }
  };

  const appReducer = useReducer(reducerHandler, initialStat);

  return appReducer;
};
