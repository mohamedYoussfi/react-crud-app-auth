import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../services/application.context";
import { Actions, saveProduct } from "../services/catalog.service";
import { MyVerticallyCenteredModal } from "./EditProduct";

function NewProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [checked, setChecked] = useState(false);
  const [state, dispatch] = useContext(ProductsContext);
  const [modalShow, setModalShow] = React.useState(false);
  const [message, setMessage] = React.useState("");

  useEffect(() => {
    if (state.status == "SUCCESS") {
      if (state.previousAction.type == Actions.PRODUCT_ADDED_SUCCESS_EVENT) {
        setMessage(JSON.stringify(state.product));
        setModalShow(true);
      }
    }
  }, [state.product]);
  const handleSaveProduct = (event) => {
    event.preventDefault();
    const product = { name, price, checked };
    dispatch({
      type: Actions.ADD_PRODUCT_ACTION,
      payload: { product, dispatch },
    });
  };
  return (
    <div className="p-3">
      <MyVerticallyCenteredModal
        message={message}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSaveProduct} method="post">
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
                value={checked}
                onChange={(e) => setChecked(e.target.value)}
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

export default NewProduct;
