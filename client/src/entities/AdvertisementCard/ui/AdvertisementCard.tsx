import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Advertisement } from "../../../shared/types/advertesementTypes";

interface AdvertisementCardProps {
  advertisement: Advertisement;
}

export const AdvertisementCard = ({
  advertisement,
}: AdvertisementCardProps) => {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        height="140"
        image={advertisement.photo || "/placeholder.png"}
        alt={advertisement.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {advertisement.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {advertisement.location}
        </Typography>
        <Typography variant="body2" color="text.primary" mt={1}>
          Категория: {advertisement.type}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          component={Link}
          to={`/item/${advertisement.id}`}
          size="small"
          color="primary"
        >
          Открыть
        </Button>
      </CardActions>
    </Card>
  );
};
