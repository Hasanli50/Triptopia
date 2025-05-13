import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./slice/userApi.ts";
import { tourApi } from "./slice/tourApi.ts";
import { reviewApi } from "./slice/reviewApi.ts";

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
