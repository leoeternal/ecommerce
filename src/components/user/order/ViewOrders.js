import React, { useEffect } from "react";
import MyComponent from "react-fullpage-custom-loader";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  loggedInUserInfo,
  viewOrders,
} from "../../../store/userstore/UserAction";
import { userActions } from "../../../store/userstore/UserSlice";
import Order from "./Order";
import "./viewOrders.css";

function ViewOrders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId, orderStatus } = useParams();
  const { userInfoPageLoader, loggedStatus, orders, loggedInUserDetails } =
    useSelector((state) => state.user);

  useEffect(() => {
    dispatch(userActions.updateUserInfoPageLoaderValue());
    if (loggedStatus) {
      dispatch(loggedInUserInfo({ id: userId }));
      dispatch(viewOrders({ userId, orderStatus }));
    } else {
      navigate("/");
    }
  }, [dispatch, loggedStatus, userId, orderStatus, navigate]);

  const tabHandler = (status) => {
    if (status === "cancel") {
      navigate(`/your-account/orders/${userId}/cancelled-orders`);
    } else if (status === "success") {
      navigate(`/your-account/orders/${userId}/success-orders`);
    } else if (status === "inprocess") {
      navigate(`/your-account/orders/${userId}/inprocess-orders`);
    }
  };

  return (
    <>
      {userInfoPageLoader ? (
        <MyComponent />
      ) : (
        <>
          <ToastContainer
            position="top-center"
            hideProgressBar={true}
            autoClose={3000}
          />
          <div className="vieworders-wrapper">
            <h1>Your Orders</h1>
            <div className="tab">
              {orderStatus === "success-orders" ? (
                <p
                  style={{
                    fontWeight: "700",
                    borderBottom: "1px solid red",
                    color: "black",
                  }}
                >
                  Orders
                </p>
              ) : (
                <p
                  onClick={() => tabHandler("success")}
                  style={{ cursor: "pointer" }}
                >
                  Orders
                </p>
              )}
              {orderStatus === "inprocess-orders" ? (
                <p
                  style={{
                    fontWeight: "700",
                    borderBottom: "1px solid red",
                    color: "black",
                  }}
                >
                  Not Yet Shipped
                </p>
              ) : (
                <p
                  onClick={() => tabHandler("inprocess")}
                  style={{ cursor: "pointer" }}
                >
                  Not Yet Shipped
                </p>
              )}
              {orderStatus === "cancelled-orders" ? (
                <p
                  style={{
                    fontWeight: "700",
                    borderBottom: "1px solid red",
                    color: "black",
                  }}
                >
                  Cancelled Orders
                </p>
              ) : (
                <p
                  onClick={() => tabHandler("cancel")}
                  style={{ cursor: "pointer" }}
                >
                  Cancelled Orders
                </p>
              )}
            </div>

            {orders.length > 0 ? (
              <>
                {orders.map((order) => {
                  return (
                    <>
                      <Order
                        order={order}
                        loggedInUserDetails={loggedInUserDetails}
                        orderStatus={orderStatus}
                      />
                    </>
                  );
                })}
              </>
            ) : (
              <>
                {orderStatus === "success-orders" ? (
                  <p className="zero-order-note">
                    Looking for an order? You have not ordered anything yet.{" "}
                  </p>
                ) : (
                  <>
                    {orderStatus === "inprocess-orders" ? (
                      <p className="zero-order-note">
                        Looking for an order? All of your orders have been
                        dispatched.
                      </p>
                    ) : (
                      <>
                        {orderStatus === "cancelled-orders" ? (
                          <p className="zero-order-note">
                            Looking for an order? There are no cancelled orders.
                          </p>
                        ) : null}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default ViewOrders;
