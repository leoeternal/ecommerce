import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductInCart,
  removeProductFromCart,
} from "../../../store/ProductAction";
import { productActions } from "../../../store/ProductSlice";
import "./cartPopup.css";
import { useNavigate } from "react-router-dom";
import { orderActions } from "../../../store/userstore/OrderSlice";
import ProductsInCartDisplay from "./ProductsInCartDisplay";

function CartPopup({
  loggedStatus,
  loggedInUserDetails,
  cartState,
  setCartState,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    productCartPopupLoader,
    productsInCart,
    sameProductAddedInCart,
    productRemovedButtonLoader,
    productRemoved,
  } = useSelector((state) => state.product);

  useEffect(() => {
    if (
      (loggedStatus &&
        cartState &&
        productsInCart.length !== loggedInUserDetails.cartProducts.length) ||
      sameProductAddedInCart ||
      productRemoved
    ) {
      dispatch(productActions.updateProductCartPopupLoaderValue());
      dispatch(getProductInCart(loggedInUserDetails._id));
      dispatch(productActions.updateProductRemovedValue());
    }
  }, [
    loggedStatus,
    dispatch,
    loggedInUserDetails,
    cartState,
    productsInCart,
    sameProductAddedInCart,
    productRemoved,
  ]);

  const checkoutHandler = () => {
    setCartState(false);
    dispatch(orderActions.updateOnOrderScreenValueToTrue());
    navigate(`/checkout/order/${loggedInUserDetails._id}/address`);
  };

  const removeProductHandler = (productId) => {
    dispatch(productActions.updateProductRemovedButtonLoaderValue());
    dispatch(removeProductFromCart(productId));
  };

  return (
    <div className="cartpopup-wrapper">
      {productCartPopupLoader ? (
        <div className="circular-progress">
          <CircularProgress />
        </div>
      ) : (
        <>
          <h1>Cart ({loggedInUserDetails.cartQuantity})</h1>
          <hr />
          <div className="products">
            {loggedInUserDetails.cartQuantity !== 0 ? (
              <Button
                sx={{
                  backgroundColor: "orange",
                  color: "black",
                  margin: "5px 0px",
                  position: "relative",
                  right: "0px",
                }}
                size="medium"
                variant="contained"
                onClick={checkoutHandler}
              >
                Checkout
              </Button>
            ) : null}

            {productsInCart.length === 0 ? (
              <p
                style={{
                  textAlign: "center",
                  fontSize: "30px",
                  color: "red",
                  marginTop: "20px",
                }}
              >
                Your cart is empty
              </p>
            ) : null}

            {productsInCart.map((product, index) => {
              return (
                <div key={index}>
                  <ProductsInCartDisplay
                    state="cart"
                    product={product}
                    removeProductHandler={removeProductHandler}
                    productRemovedButtonLoader={productRemovedButtonLoader}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default CartPopup;
