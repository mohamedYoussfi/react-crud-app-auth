import React, { useContext } from "react";
import { ProductsContext } from "../services/application.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Stats() {
  const [appState, dispatch] = useContext(ProductsContext);
  return (
    <button type="button" className="btn btn-outline-primary position-relative">
      Caddy
      <span className="position-absolute top-0 start-90 translate-middle badge rounded-pill bg-danger">
        {appState.products.length}
      </span>
    </button>
  );
}

export default Stats;
