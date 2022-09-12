import React from "react";
import pic1 from "../../../static/images/piclarge.png";
import Button from "@mui/material/Button";
import "./productsInCartDisplay.css";
import { CircularProgress } from "@mui/material";

function ProductsInCartDisplay({
  product,
  state,
  removeProductHandler,
  productRemovedButtonLoader,
}) {
  return (
    <div className="productsincart-wrapper">
      <div className="left">
        <img src={pic1} alt="product" />
      </div>
      <div className="right">
        <p id="productname">{product.id.name}</p>
        <p id="quantity">Quantity: {product.quantity}</p>
        <p id="price">
          {product.id.price} &#8377; * {product.quantity} ={" "}
          <strong>{product.id.price * product.quantity} &#8377;</strong>
        </p>
        {state === "cart" ? (
          <>
            {productRemovedButtonLoader ? (
              <CircularProgress />
            ) : (
              <Button
                onClick={() => removeProductHandler(product.id._id)}
                size="small"
                color="error"
                variant="contained"
              >
                Remove
              </Button>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}

export default ProductsInCartDisplay;
