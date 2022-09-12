import { createSlice } from "@reduxjs/toolkit";

import {
  addProduct,
  getAllProduct,
  getProductById,
  addProductToCart,
  getProductInCart,
  getProductsNameByQuery,
  getProductsBySearchStatus,
  removeProductFromCart,
} from "./ProductAction";

const initialState = {
  productAdded: false,
  products: [],
  product: {},
  productsInCart: [],
  productLoader: false,
  productInfoSkeletonLoader: false,
  productPageLoader: true,
  productCartPopupLoader: false,
  sameProductAddedInCart: false,
  productsInSearchbar: [],
  productsFetched: false,
  productSearchPageLoader: false,
  productRemoved: false,
  productRemovedButtonLoader: false,
  totalSearchedProducts: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    updateProductAddedValue: (state, action) => {
      state.productAdded = false;
    },
    updateProductLoaderValue: (state, action) => {
      state.productLoader = true;
    },
    updateProductInfoSkeletonLoaderValue: (state, action) => {
      state.productInfoSkeletonLoader = true;
    },
    updateProductPageLoaderValue: (state, action) => {
      state.productPageLoader = true;
    },
    updateProductCartPopupLoaderValue: (state, action) => {
      state.productCartPopupLoader = true;
    },
    updateProductsInCartValue: (state, action) => {
      state.productsInCart = [];
    },
    updateProductsFetchedvalue: (state, action) => {
      state.productsFetched = false;
    },
    updateProductSearchPageLoaderValue: (state, action) => {
      state.productSearchPageLoader = false;
    },
    updateProductRemovedValue: (state, action) => {
      state.productRemoved = false;
    },
    updateProductRemovedButtonLoaderValue: (state, action) => {
      state.productRemovedButtonLoader = true;
    },
  },
  extraReducers: {
    [addProduct.pending]: () => {
      console.log("pending");
    },
    [addProduct.fulfilled]: (state, action) => {
      if (action.payload.status === 201) {
        state.productAdded = true;
      }
      state.productLoader = false;
    },
    [addProduct.rejected]: () => {
      console.log("rejected");
    },

    [getAllProduct.pending]: () => {
      console.log("pending");
    },
    [getAllProduct.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.products = action.payload.data.data;
      }
      state.productInfoSkeletonLoader = false;
    },
    [getAllProduct.rejected]: () => {
      console.log("rejected");
    },
    [getProductById.pending]: () => {
      console.log("pending");
    },
    [getProductById.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.product = action.payload.data.data;
      }
      state.productPageLoader = false;
    },
    [getProductById.rejected]: () => {
      console.log("rejected");
    },
    [addProductToCart.pending]: () => {
      console.log("pending");
    },
    [addProductToCart.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.productAdded = true;
        state.sameProductAddedInCart = true;
      }
      state.productLoader = false;
    },
    [addProductToCart.rejected]: () => {
      console.log("rejected");
    },
    [getProductInCart.pending]: () => {
      console.log("pending");
    },
    [getProductInCart.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.productsInCart = action.payload.data.data.cartProducts;
      }
      state.productCartPopupLoader = false;
      state.sameProductAddedInCart = false;
    },
    [getProductInCart.rejected]: () => {
      console.log("rejected");
    },
    [getProductsNameByQuery.pending]: () => {
      console.log("pending");
    },
    [getProductsNameByQuery.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.productsInSearchbar = action.payload.data.data;
      }
      state.productsFetched = true;
    },
    [getProductsNameByQuery.rejected]: () => {
      console.log("rejected");
    },
    [getProductsBySearchStatus.pending]: () => {
      console.log("pending");
    },
    [getProductsBySearchStatus.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.products = action.payload.data.data;
        state.totalSearchedProducts = action.payload.data.totalProducts;
      }
      state.productSearchPageLoader = true;
    },
    [getProductsBySearchStatus.rejected]: () => {
      console.log("rejected");
    },
    [removeProductFromCart.pending]: () => {
      console.log("pending");
    },
    [removeProductFromCart.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.productRemoved = true;
      }
      state.productRemovedButtonLoader = false;
    },
    [removeProductFromCart.rejected]: () => {
      console.log("rejected");
    },
  },
});

export const productActions = productSlice.actions;
export default productSlice;
