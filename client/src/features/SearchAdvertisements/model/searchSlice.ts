import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  searchValue: string;
}

const initialState: SearchState = {
  searchValue: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    resetSearch: () => initialState,
  },
});

export const { setSearchValue, resetSearch } = searchSlice.actions;
export default searchSlice.reducer;
