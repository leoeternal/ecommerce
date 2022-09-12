import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { useDispatch, useSelector } from "react-redux";
import MyComponent from "react-fullpage-custom-loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { loggedInUserInfo } from "../../../store/userstore/UserAction";
import { productActions } from "../../../store/ProductSlice";
import { getProductsBySearchStatus } from "../../../store/ProductAction";
import "./searchPage.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ProductBox from "./ProductBox";
import Filter from "./Filter";

function SearchPage() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { query, productStatus, searchQuery, sortQuery, page } = useParams();
  const { loggedStatus } = useSelector((state) => state.user);
  const {
    products,
    productAdded,
    productSearchPageLoader,
    totalSearchedProducts,
  } = useSelector((state) => state.product);
  const [sort, setSort] = useState(sortQuery);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  useEffect(() => {
    setSort(sortQuery);
    dispatch(productActions.updateProductSearchPageLoaderValue());
    if (loggedStatus) {
      dispatch(loggedInUserInfo({ id: localStorage.getItem("loggedId") }));
    }
    dispatch(
      getProductsBySearchStatus({
        status: productStatus,
        query,
        sort,
        page,
        filters: localStorage.getItem("filters"),
      })
    );
  }, [loggedStatus, dispatch, productStatus, query, sort, page, sortQuery]);

  useEffect(() => {
    if (productAdded) {
      toast.success("Product Added Successfully");
      dispatch(productActions.updateProductAddedValue());
    }
  }, [productAdded, dispatch]);

  const handleSortChange = (event) => {
    setSort(event.target.value);
    navigate(
      `/product/${query}/search/${productStatus}/${searchQuery}/${event.target.value}/1`
    );
  };

  const paginationHandler = (event, page) => {
    navigate(
      `/product/${query}/search/${productStatus}/${searchQuery}/${sort}/${page}`
    );
  };

  const filterHandler = () => {
    navigate(
      `/product/${query}/search/${productStatus}/${searchQuery}/${sort}/1`
    );
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        autoClose={3000}
      />
      {!productSearchPageLoader ? (
        <MyComponent />
      ) : (
        <div className="searchpage-wrapper">
          <div className="filter">
            <Filter
              minPrice={minPrice}
              maxPrice={maxPrice}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
            />
          </div>
          <div className="products">
            <p id="search-query">
              Showing results for{" "}
              <span style={{ fontWeight: "700" }}>{searchQuery}</span>
            </p>
            {products.length === 0 ? (
              <p>No results for {searchQuery}</p>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <h1 style={{ margin: "20px 0" }}>RESULTS</h1>
                  <FormControl sx={{ width: "150px" }} fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Sort By
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={sort}
                      label="Sort By"
                      onChange={handleSortChange}
                    >
                      <MenuItem value="featured">Featured</MenuItem>
                      <MenuItem value="hightolow">High to Low</MenuItem>
                      <MenuItem value="lowtohigh">Low to High</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="product-mapping">
                  {products.map((product) => {
                    return (
                      <>
                        <ProductBox
                          product={product}
                          loggedStatus={loggedStatus}
                        />
                      </>
                    );
                  })}
                </div>
                <div style={{ margin: "20px 0" }} className="pagination">
                  <Pagination
                    onChange={paginationHandler}
                    defaultPage={Number(page)}
                    count={Math.ceil(totalSearchedProducts / 2)}
                    color="primary"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default SearchPage;
