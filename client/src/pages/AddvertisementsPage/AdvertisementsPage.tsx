import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import {
  Pagination,
  Box,
  Typography,
  Alert,
  AlertTitle,
  Button,
  CircularProgress,
} from "@mui/material";
import { AdvertisementList } from "../../widgets/AdvertisementList/ui/AdvertisementList";
import { advertisementApi } from "../../shared/api/advertisementApi";
import { useDebounce } from "../../shared/lib/hooks/useDebounce";
import { AdvertisementFilters } from "../../features/AdvertisementFilters/AdvertisementFilters";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store/store";
import { resetFilters } from "../../features/AdvertisementFilters/model/filterSlice";
import { resetSearch } from "../../features/SearchAdvertisements/model/searchSlice";
import { SearchInput } from "../../features/SearchAdvertisements/ui/SearchInput";
export const AdvertisementPage = () => {
  const DEBOUNCE_DELAY = 100;
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { filters } = useSelector((state: RootState) => state.filters);
  const { searchValue } = useSelector((state: RootState) => state.search);
  const page = parseInt(searchParams.get("page") || "1");
  // const searchQuery = searchParams.get("search") || "";
  const [isDebouncing] = useState(false);
  const debouncedSearch = useDebounce(searchValue, DEBOUNCE_DELAY);
  const debouncedFilters = useDebounce(filters, DEBOUNCE_DELAY);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["advertisements", page, debouncedSearch, debouncedFilters],
    queryFn: () =>
      advertisementApi.getAdvertisements({
        page,
        limit: 5,
        search: debouncedSearch,
        ...debouncedFilters,
      }),
    retry: 3,
    retryDelay: 5000,
  });
  useEffect(() => {
    const params: Record<string, string> = { page: "1" };
    if (debouncedSearch) params.search = debouncedSearch;
    if (debouncedFilters.type) params.type = debouncedFilters.type;

    Object.entries(debouncedFilters).forEach(([key, value]) => {
      if (value && key !== "type") params[key] = value.toString();
    });

    setSearchParams(params, { replace: true });
  }, [debouncedSearch, debouncedFilters, setSearchParams]);
  const showLoader = isLoading || isDebouncing;
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setSearchParams(
      new URLSearchParams({
        page: value.toString(),
        ...(debouncedSearch && { search: debouncedSearch }),
        ...Object.entries(debouncedFilters).reduce(
          (acc, [key, val]) => {
            if (val) acc[key] = val.toString();
            return acc;
          },
          {} as Record<string, string>
        ),
      }),
      { replace: true }
    );
  };

  const handleRetry = () => {
    refetch();
  };
  const handleResetFilters = () => {
    dispatch(resetSearch());
    dispatch(resetFilters());
    setSearchParams({ page: "1" }, { replace: true });
  };
  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">Объявления</Typography>

        <Button
          variant="outlined"
          onClick={handleResetFilters}
          disabled={
            !debouncedSearch && Object.keys(debouncedFilters).length === 0
          }
        >
          Сбросить фильтры
        </Button>
      </Box>

      {isError && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          action={
            <Button color="inherit" size="small" onClick={handleRetry}>
              Повторить
            </Button>
          }
        >
          <AlertTitle>Ошибка загрузки</AlertTitle>
          {error instanceof Error ? error.message : "Неизвестная ошибка"}
        </Alert>
      )}

      {!isLoading && !isError && data?.data.length === 0 && (
        <Alert severity="info" sx={{ mb: 3 }}>
          <AlertTitle>Нет объявлений</AlertTitle>
          Попробуйте изменить параметры поиска или фильтры
        </Alert>
      )}
      <SearchInput />

      <AdvertisementFilters />
      {showLoader && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress sx={{ mb: 2, textAlign: "center" }} />
        </Box>
      )}
      <AdvertisementList advertisements={data?.data || []} />

      {data?.totalPages > 1 && (
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <Pagination
            count={data?.totalPages || 1}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};
