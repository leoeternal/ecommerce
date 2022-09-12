import React, { useEffect } from "react";
import MyComponent from "react-fullpage-custom-loader";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate, useParams } from "react-router-dom";
import { getProductInCart } from "../../../store/ProductAction";
import { getOrderById } from "../../../store/userstore/OrderAction";
import { orderActions } from "../../../store/userstore/OrderSlice";
import { loggedInUserInfo } from "../../../store/userstore/UserAction";
import "./orderPlaced.css";

function OrderPlaced() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { orderPageLoader, currentOrderData } = useSelector(
    (state) => state.order
  );
  const { loggedStatus, loggedInUserDetails } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(orderActions.updateOnOrderScreenValueToFalse());
    dispatch(orderActions.updateOrderPageLoaderValue());
    if (loggedStatus) {
      dispatch(loggedInUserInfo({ id: localStorage.getItem("loggedId") }));
      dispatch(getProductInCart(localStorage.getItem("loggedId")));
      dispatch(getOrderById(orderId));
    } else {
      navigate("/");
    }
  }, [dispatch, loggedStatus, navigate, orderId]);

  return (
    <>
      {orderPageLoader ? (
        <MyComponent />
      ) : (
        <div className="orderplaced-wrapper">
          <div className="success">
            <p id="text-1">
              <CheckCircleIcon sx={{ position: "relative", top: "5px" }} />{" "}
              Order Placed, deal snagged
            </p>
            <p id="confirmation">Confirmation will be sent to your email</p>
            <p id="shipping">
              Shipping to {loggedInUserDetails.name},{" "}
              <span style={{ fontWeight: "300" }}>
                {currentOrderData.address.locality},{" "}
                {currentOrderData.address.road}, {currentOrderData.address.city}
                , {currentOrderData.address.state},{" "}
                {currentOrderData.address.pincode}
              </span>
            </p>
            <hr />
            <div className="deliverydate">
              <p id="delivery">{currentOrderData.deliveryDate}</p>
              <p id="date">Delivery date</p>
            </div>
            <p id="link">View your orders</p>
          </div>
        </div>
      )}
    </>
  );
}

export default OrderPlaced;
