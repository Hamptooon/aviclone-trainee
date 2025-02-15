import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../../features/advertisementForm/model/formSlice";
import filterReducer from "../../features/AdvertisementFilters/model/filterSlice";
import searchReducer from "../../features/SearchAdvertisements/model/searchSlice";
export const store = configureStore({
  reducer: {
    form: formReducer,
    filters: filterReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
