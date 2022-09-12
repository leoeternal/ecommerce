import React, { useEffect, useState } from "react";
import "./productBox.css";
import Button from "@mui/material/Button";
import moment from "moment";
import pic1 from "../../../static/images/pic1.png";
import { useNavigate } from "react-router-dom";
import { productActions } from "../../../store/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Stack } from "@mui/material";
import { addProductToCart } from "../../../store/ProductAction";

function ProductBox({ product, loggedStatus }) {
  let m = moment().add(product.deliveryDays, "d");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [buttonLoader, setButtonLoader] = useState(false);

  const { productAdded } = useSelector((state) => state.product);

  useEffect(() => {
    if (productAdded) {
      setButtonLoader(false);
    }
  }, [productAdded]);

  const productClickedHandler = () => {
    navigate(`/product/${product._id}`);
  };

  const addToCartHandler = () => {
    setButtonLoader(true);
    dispatch(productActions.updateProductLoaderValue());
    dispatch(addProductToCart({ productId: product._id }));
  };

  return (
    <>
      <div className="productbox-wrapper">
        <div className="image">
          <img onClick={productClickedHandler} src={pic1} alt="Product" />
        </div>
        <hr />
        <div className="details">
          <p id="name">{product.name}</p>
          <p id="price">
            &#8377; {product.price}{" "}
            <span style={{ color: "grey", fontSize: "13px" }}>
              <strike>&#8377; {product.mrp}</strike>
            </span>
            <span
              style={{
                color: "rgb(30, 30, 30)",
                fontSize: "15px",
                margin: "0 0 0 10px",
              }}
            >
              ({Math.round(((product.mrp - product.price) / product.mrp) * 100)}
              % off)
            </span>
          </p>
          <p id="delivery">
            FREE delivery by{" "}
            <span style={{ fontWeight: "600" }}>
              {m.format("DD-MMMM-YYYY")}
            </span>
          </p>

          {buttonLoader ? (
            <Stack alignItems="center">
              <CircularProgress />
            </Stack>
          ) : (
            <Button
              style={{ marginTop: "15px" }}
              size="medium"
              variant="contained"
              fullWidth
              onClick={addToCartHandler}
            >
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductBox;
