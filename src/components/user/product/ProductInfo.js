import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { toast, ToastContainer } from "react-toastify";
import Button from "@mui/material/Button";
import pic1 from "../../../static/images/piclarge.png";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import MyComponent from "react-fullpage-custom-loader";
import { addProductToCart, getProductById } from "../../../store/ProductAction";
import "./productInfo.css";
import { productActions } from "../../../store/ProductSlice";
import { CircularProgress } from "@mui/material";
import { loggedInUserInfo } from "../../../store/userstore/UserAction";
import { orderActions } from "../../../store/userstore/OrderSlice";
import moment from "moment";

function ProductInfo() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { productPageLoader, product, productLoader, productAdded } =
    useSelector((state) => state.product);
  const { loggedStatus } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(orderActions.updateOnOrderScreenValueToFalse());
    dispatch(productActions.updateProductPageLoaderValue());
    if (loggedStatus) {
      dispatch(loggedInUserInfo({ id: localStorage.getItem("loggedId") }));
    }
    dispatch(getProductById(productId));
  }, [productId, dispatch, loggedStatus]);

  useEffect(() => {
    if (productAdded) {
      toast.success("Product Added Successfully");
      dispatch(productActions.updateProductAddedValue());
    }
  }, [productAdded, dispatch]);

  const addToCartHandler = () => {
    dispatch(productActions.updateProductLoaderValue());
    dispatch(addProductToCart({ productId }));
  };

  let m = moment().add(product.deliveryDays, "d");

  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        autoClose={3000}
      />
      {productPageLoader ? (
        <MyComponent />
      ) : (
        <div className="productinfo-wrapper">
          <div className="firstpage">
            <div className="image">
              <div className="left"></div>
              <div className="right">
                <img src={pic1} alt="product" />
              </div>
            </div>
            <div className="detail">
              <p id="name">{product.name}</p>
              <p id="price">&#8377; {product.price}.00</p>
              <p id="mrp">
                M.R.P: <strike>&#8377; {product.mrp}.00</strike>
              </p>
              <FavoriteBorderIcon
                style={{
                  fontSize: "30px",
                  margin: "0px 0px 0px 10%",
                  cursor: "pointer",
                }}
              />
              <p id="save">
                You Save:
                <span style={{ color: "green", fontWeight: "600" }}>
                  {" "}
                  &#8377; {product.mrp - product.price}.00
                </span>{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;Inclusive of all taxes
              </p>
              {product.quantity < 1 ? (
                <p id="nostock">Out Of Stock</p>
              ) : (
                <p id="stock">In Stock</p>
              )}
              {productLoader ? (
                <CircularProgress />
              ) : (
                <Button
                  onClick={addToCartHandler}
                  style={{ marginTop: "10px" }}
                  variant="contained"
                >
                  Add to Cart
                </Button>
              )}
              <p id="delivery-days1">
                Delivery in{" "}
                <span style={{ fontWeight: "700" }}>
                  {product.deliveryDays} days
                </span>
              </p>
              <p id="delivery-days2">
                <span style={{ color: "black" }}>Expected Delivery</span>{" "}
                {m.format("DD-MMMM-YYYY")}
              </p>
            </div>
          </div>
          <hr style={{ width: "90%", margin: "auto" }} />
          <div className="detail-wrapper">
            <p id="title">Description</p>
            <p id="info">{product.desc}</p>
          </div>
          <hr style={{ width: "90%", margin: "auto" }} />
          <div className="detail-wrapper">
            <p id="title">Features & Details</p>
            {product.features.map((prod) => {
              return <p id="info">- {prod.tempFeature}</p>;
            })}
          </div>
        </div>
      )}
    </>
  );
}
export default ProductInfo;
