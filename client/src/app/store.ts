import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../services/userApi.ts";
import { tourApi } from "../services/tourApi.ts";
import { reviewApi } from "../services/reviewApi.ts";

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [tourApi.reducerPath]: tourApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(tourApi.middleware)
      .concat(reviewApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
