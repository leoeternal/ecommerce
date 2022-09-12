import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./adminstore/AdminSlice";
import productSlice from "./ProductSlice";
import orderSlice from "./userstore/OrderSlice";
import userSlice from "./userstore/UserSlice";

export default configureStore({
  reducer: {
    user: userSlice.reducer,
    admin: adminSlice.reducer,
    product: productSlice.reducer,
    order: orderSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
