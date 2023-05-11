import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../services/application.context";
import {
  Actions,
  api,
  getProductById,
  saveProduct,
  updateProduct,
} from "../services/catalog.service";
import { useParams } from "react-router-dom";
import { Button, Modal, Stack } from "react-bootstrap";

function EditProduct() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [checked, setChecked] = useState(false);
  const [state, dispatch] = useContext(ProductsContext);
  const [modalShow, setModalShow] = React.useState(false);
  const [message, setMessage] = React.useState("");

  useEffect(() => {
    if (state.status == "SUCCESS") {
      if (
        state.previousAction.type == Actions.PRODUCT_BY_ID_LOADED_SUCCESS_EVENT
      ) {
        setName(state.product.name);
        setPrice(state.product.price);
        setChecked(state.product.checked);
      } else if (
        state.previousAction.type == Actions.PRODUCT_UPDATED_SUCCESS_EVENT
      ) {
        setMessage(JSON.stringify(state.product));
        setModalShow(true);
      }
    }
  }, [state.product]);

  const handleUpdateProduct = (event) => {
    event.preventDefault();
    dispatch({
      type: Actions.UPDATE_PRODUCT_ACTION,
      payload: { product: { id, name, price, checked }, dispatch },
    });
  };
  useEffect(() => {
    dispatch({
      type: Actions.LOAD_PRODUCT_BY_ID_ACTION,
      payload: { dispatch, id },
    });
  }, []);

  return (
    <div className="p-3">
      <MyVerticallyCenteredModal
        message={message}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleUpdateProduct} method="post">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                id="price"
                type="text"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></input>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={checked}
                onChange={(e) => setChecked(!checked)}
                id="checked"
              />
              <label className="form-check-label" htmlFor="checked">
                Checked
              </label>
            </div>
            <button className="btn btn-primary">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Header</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Message</h4>
        <p>{props.message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditProduct;
