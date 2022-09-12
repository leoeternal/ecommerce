import React, { useEffect } from "react";
import MyComponent from "react-fullpage-custom-loader";
import Skeleton from "@mui/material/Skeleton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { loggedInUserInfo } from "../../../store/userstore/UserAction";
import { useNavigate } from "react-router-dom";
import "./home.css";
import { getAllProduct } from "../../../store/ProductAction";
import { productActions } from "../../../store/ProductSlice";
import Carousel from "./Carousel";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loggedStatus, loggedInUserInfoStatus, sessionExpired } = useSelector(
    (state) => state.user
  );
  const { adminLoggedStatus } = useSelector((state) => state.admin);
  const { products, productAdded, productInfoSkeletonLoader } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (productAdded) {
      toast.success("Product Added Successfully");
      dispatch(productActions.updateProductAddedValue());
    }
  }, [productAdded, dispatch]);

  useEffect(() => {
    if (loggedStatus) {
      dispatch(loggedInUserInfo({ id: localStorage.getItem("loggedId") }));
      dispatch(getAllProduct());
    } else if (!loggedStatus && sessionExpired) {
      navigate("/auth");
    } else if (!loggedStatus && adminLoggedStatus) {
      navigate("/admin");
    } else {
      navigate("/");
    }
  }, [loggedStatus, dispatch, navigate, sessionExpired, adminLoggedStatus]);

  useEffect(() => {
    dispatch(productActions.updateProductInfoSkeletonLoaderValue());
    dispatch(getAllProduct());
  }, [dispatch]);

  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        autoClose={3000}
      />
      {!loggedInUserInfoStatus && loggedStatus ? (
        <MyComponent />
      ) : (
        <div className="home-wrapper">
          <h1>Top Deals</h1>
          {productInfoSkeletonLoader ? (
            <Skeleton
              variant="rectangular"
              sx={{ margin: "20px" }}
              width="95%"
              height={118}
            />
          ) : (
            <div className="topdeal-wrapper">
              <Carousel loggedStatus={loggedStatus} products={products} />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Home;
