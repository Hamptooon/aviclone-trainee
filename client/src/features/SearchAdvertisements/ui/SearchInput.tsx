import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store/store";
import { setSearchValue } from "../model/searchSlice";
export const SearchInput = () => {
  const dispatch = useDispatch();
  const { searchValue } = useSelector((state: RootState) => state.search);
  const handleSearchChange = (searchVal: string) => {
    dispatch(setSearchValue(searchVal));
  };
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Поиск по названию"
      value={searchValue}
      onChange={(e) => handleSearchChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{ mb: 3 }}
    />
  );
};
