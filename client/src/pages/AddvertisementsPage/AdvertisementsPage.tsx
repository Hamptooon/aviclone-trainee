import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import {
  TextField,
  Pagination,
  Box,
  Typography,
  InputAdornment,
  LinearProgress,
  Alert,
  AlertTitle,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { AdvertisementList } from "../../widgets/AdvertisementList/ui/AdvertisementList";
import { advertisementApi } from "../../shared/api/advertisementApi";
import { useDebounce } from "../../shared/lib/hooks/useDebounce";
import { AdvertisementFilters } from "../../features/AdvertisementFilters/ui/AdvertisementFilters";

export const AdvertisementPage = () => {
  const DEBOUNCE_DELAY = 500;
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const searchQuery = searchParams.get("search") || "";
  const [isDebouncing, setIsDebouncing] = useState(false);
  const [searchValue, setSearchValue] = useState(searchQuery);
  const [filters, setFilters] = useState<any>({});
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
    retry: 3, // Количество повторных попыток
    retryDelay: 5000, // Задержка между попытками (5 сек)
  });
  useEffect(() => {
    if (searchValue !== debouncedSearch) {
      setIsDebouncing(true);
      const timer = setTimeout(() => setIsDebouncing(false), 500);
      return () => clearTimeout(timer);
    }
  }, [searchValue, debouncedSearch]);
  useEffect(() => {
    const params: Record<string, string> = { page: "1" };
    if (debouncedSearch) params.search = debouncedSearch;
    if (debouncedFilters.type) params.type = debouncedFilters.type;

    Object.entries(debouncedFilters).forEach(([key, value]) => {
      if (value && key !== "type") params[key] = value.toString();
    });

    setSearchParams(params, { replace: true });
  }, [debouncedSearch, debouncedFilters]);
  const showLoader = isLoading || isDebouncing;
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setSearchParams(
      {
        page: value.toString(),
        ...(debouncedSearch && { search: debouncedSearch }),
        ...debouncedFilters,
      },
      { replace: true }
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleRetry = () => {
    refetch();
  };
  const handleResetFilters = () => {
    setSearchValue("");
    setFilters({});
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

      {showLoader && <LinearProgress sx={{ mb: 2 }} />}

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

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Поиск по названию"
        value={searchValue}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />

      <AdvertisementFilters
        onFilterChange={setFilters}
        resetTrigger={
          !debouncedSearch && Object.keys(debouncedFilters).length === 0
        }
      />

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
