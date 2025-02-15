// features/AdvertisementFilters/model/filterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdvertisementFiltersType } from "../../../shared/api/advertisementApi";

interface FiltersState {
  type: string;
  filters: AdvertisementFiltersType;
}

const initialState: FiltersState = {
  type: "",
  filters: {},
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
      state.filters = { type: action.payload };
    },
    setFilters: (state, action: PayloadAction<AdvertisementFiltersType>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.type = "";
      state.filters = {};
    },
  },
});

export const { setType, setFilters, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
