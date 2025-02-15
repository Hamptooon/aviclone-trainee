import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Chip,
  Stack,
  Divider,
  useTheme,
} from "@mui/material";
import { advertisementApi } from "../../shared/api/advertisementApi";
import { Advertisement } from "../../shared/types/advertesementTypes";
import {
  LocationOn,
  Home,
  DirectionsCar,
  Build,
  CalendarToday,
  SquareFoot,
  MeetingRoom,
  Speed,
} from "@mui/icons-material";

const DetailItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) => (
  <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1.5 }}>
    <Box sx={{ color: "text.secondary" }}>{icon}</Box>
    <Box>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1" color="text.primary">
        {value}
      </Typography>
    </Box>
  </Stack>
);

export const AdvertisementItemPage = () => {
  const theme = useTheme();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: advertisement,
    isLoading,
    isError,
  } = useQuery<Advertisement>({
    queryKey: ["advertisement", id],
    queryFn: () => advertisementApi.getAdvertisementById(Number(id)),
  });

  const handleEdit = () => {
    if (advertisement) {
      navigate("/form", {
        state: { id: advertisement.id }, // Передаем ID через состояние
      });
    }
  };

  if (isLoading) return <CircularProgress sx={{ mt: 3 }} />;
  if (isError)
    return <Alert severity="error">Ошибка загрузки объявления</Alert>;

  return (
    <Box
      sx={{
        p: 3,
        maxWidth: 1200,
        margin: "0 auto",
        [theme.breakpoints.down("sm")]: { px: 1 },
      }}
    >
      <Button
        startIcon={<span>←</span>}
        sx={{
          mb: 3,
          textTransform: "none",
          color: "text.secondary",
          "&:hover": { backgroundColor: "transparent" },
        }}
        component={Link}
        to="/list"
      >
        Вернуться к списку
      </Button>

      <Card
        sx={{
          borderRadius: 3,
          boxShadow: theme.shadows[3],
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          height="400"
          image={advertisement?.photo || "/placeholder.png"}
          alt="Фото объявления"
          sx={{
            objectFit: "cover",
            [theme.breakpoints.down("sm")]: { height: 200 },
          }}
        />

        <CardContent sx={{ px: 4, py: 3 }}>
          <Stack
            justifyContent="space-between"
            alignItems="flex-start"
            sx={{ mb: 3 }}
          >
            <Chip
              label={advertisement?.type}
              sx={{
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                fontSize: "0.875rem",
                borderRadius: 2,
                px: 1.5,
                py: 0.5,
                mb: 4,
              }}
            />
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                [theme.breakpoints.down("sm")]: { fontSize: "1.75rem" },
              }}
            >
              {advertisement?.name}
            </Typography>
          </Stack>

          <Typography
            variant="body1"
            paragraph
            sx={{
              fontSize: "1.1rem",
              lineHeight: 1.6,
              color: "text.secondary",
              mb: 4,
            }}
          >
            {advertisement?.description}
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Stack spacing={4}>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  color: "text.primary",
                }}
              >
                Основные характеристики
              </Typography>

              <DetailItem
                icon={<LocationOn fontSize="small" />}
                label="Локация"
                value={advertisement?.location || "Не указано"}
              />

              {advertisement?.type === "Недвижимость" && (
                <>
                  <DetailItem
                    icon={<MeetingRoom fontSize="small" />}
                    label="Комнат"
                    value={advertisement?.rooms || "Не указано"}
                  />
                  <DetailItem
                    icon={<SquareFoot fontSize="small" />}
                    label="Площадь"
                    value={`${advertisement?.area} м²`}
                  />
                  <DetailItem
                    icon={<Home fontSize="small" />}
                    label="Тип недвижимости"
                    value={advertisement?.propertyType || "Не указано"}
                  />
                </>
              )}

              {advertisement?.type === "Авто" && (
                <>
                  <DetailItem
                    icon={<DirectionsCar fontSize="small" />}
                    label="Марка"
                    value={advertisement?.brand || "Не указано"}
                  />
                  <DetailItem
                    icon={<Speed fontSize="small" />}
                    label="Пробег"
                    value={`${advertisement?.mileage} км`}
                  />
                  <DetailItem
                    icon={<CalendarToday fontSize="small" />}
                    label="Год выпуска"
                    value={advertisement?.year || "Не указано"}
                  />
                </>
              )}

              {advertisement?.type === "Услуги" && (
                <>
                  <DetailItem
                    icon={<Build fontSize="small" />}
                    label="Тип услуги"
                    value={advertisement?.serviceType || "Не указано"}
                  />
                  <DetailItem
                    icon={<CalendarToday fontSize="small" />}
                    label="Стаж"
                    value={`${advertisement?.experience} лет`}
                  />
                </>
              )}
            </Box>
            {(advertisement?.cost || advertisement?.price) && (
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 3,
                    color: "text.primary",
                  }}
                >
                  Стоимость
                </Typography>

                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {advertisement?.type === "Недвижимость" &&
                      `${advertisement?.price} ₽`}
                    {advertisement?.type === "Услуги" &&
                      `${advertisement?.cost} ₽`}
                  </Typography>
                </Stack>
              </Box>
            )}
          </Stack>
        </CardContent>

        <CardActions
          sx={{
            px: 4,
            py: 3,
            borderTop: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Button
            variant="contained"
            onClick={handleEdit}
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1rem",
            }}
          >
            Редактировать объявление
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
